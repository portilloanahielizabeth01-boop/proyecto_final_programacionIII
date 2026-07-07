<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use App\Models\Persona;
use App\Models\Empleado; // Agregado
use App\Models\Contacto; // Agregado
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class RegistroController extends Controller
{
    public function mostrarFormulario()
    {
        return view('registro');
    }

    public function registrar(Request $request)
    {
        // 📅 fecha límite (120 años)
        $fechaMinima = now()->subYears(120)->toDateString();

        $request->validate([
            'nombre' => 'required|string|max:50',
            'apellido' => 'required|string|max:50',

            // 📅 edad lógica (0 - 120 años)
            'fecha_nacimiento' => "required|date|before:today|after:$fechaMinima",

            // 📧 usuario como email real (Verifica que no exista en usuarios ni en contactos)
            'usuario' => 'required|email|max:100|unique:usuarios,usuario|unique:contactos,valor',

            // 🔐 Contraseña con confirmación (Requiere un campo password_confirmation en la vista)
            'password' => 'required|string|min:6|max:100|confirmed',

            // 🧑‍🔧 Código de empleado (Verifica que no exista en la tabla empleados)
            'codigo' => 'required|string|unique:empleados,codigo',
        ], [
            'nombre.required' => 'El nombre es obligatorio',
            'apellido.required' => 'El apellido es obligatorio',

            'fecha_nacimiento.required' => 'La fecha de nacimiento es obligatoria',
            'fecha_nacimiento.before' => 'La fecha no puede ser futura',
            'fecha_nacimiento.after' => 'La edad máxima permitida es 120 años',

            'usuario.required' => 'El correo es obligatorio',
            'usuario.email' => 'Debes ingresar un correo válido',
            'usuario.unique' => 'Este correo ya está registrado',

            'password.required' => 'La contraseña es obligatoria',
            'password.min' => 'La contraseña debe tener al menos 6 caracteres',
            'password.confirmed' => 'Las contraseñas no coinciden', // Mensaje nuevo

            'codigo.required' => 'El código de técnico es obligatorio',
            'codigo.unique' => 'Este código ya está en uso', // Mensaje nuevo
        ]);

        try {
            DB::transaction(function () use ($request) {

                // 1. Crear Persona (Sin DNI ni Sexo)
                $persona = Persona::create([
                    'nombre' => $request->nombre,
                    'apellido' => $request->apellido,
                    'fecha_nacimiento' => $request->fecha_nacimiento,
                ]);

                // 2. Crear Empleado usando el ID de la persona
                Empleado::create([
                    'persona_id' => $persona->id,
                    'codigo' => $request->codigo,
                ]);

                // 3. Crear Contacto (Correo) usando el ID de la persona
                Contacto::create([
                    'persona_id' => $persona->id,
                    'tipo_contacto_id' => 1, // Asegúrate de que 1 sea el ID para "Email" en tu BD
                    'valor' => $request->usuario,
                ]);

                // 4. Crear Usuario
                Usuario::create([
                    'persona_id' => $persona->id,
                    'usuario' => $request->usuario, // email
                    'password' => Hash::make($request->password),
                    'rol' => 'empleado', // Por si lo necesitas definir por defecto
                ]);
            });

            return redirect('/login')
                ->with('success', 'Registro exitoso. Ya puedes iniciar sesión');

        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->with('error', 'Error al registrar el usuario. Intente nuevamente.');
                
            // 🔥 DESARROLLO (opcional para ver el error exacto si algo falla):
            // ->with('error', $e->getMessage());
        }
    }
}