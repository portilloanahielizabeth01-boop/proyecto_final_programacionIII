<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use App\Models\Persona;
use App\Models\Empleado;
use App\Models\Contacto;
use App\Models\Personal;
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
        $fechaMinima = now()->subYears(120)->toDateString();

        $request->validate([
            'nombre' => 'required|string|max:50',
            'apellido' => 'required|string|max:50',
            'fecha_nacimiento' => "required|date|before:today|after:$fechaMinima",
            'usuario' => 'required|email|max:100|unique:usuarios,usuario|unique:contactos,valor',
            'password' => 'required|string|min:6|max:100|confirmed',
            'codigo' => 'required|string',
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
            'password.confirmed' => 'Las contraseñas no coinciden',

            'codigo.required' => 'El código de técnico es obligatorio',
        ]);

        // Buscar el empleado autorizado por el administrador
        $personal = Personal::where('codigo_unico', $request->codigo)->first();

        if (!$personal) {
            return back()
                ->withInput()
                ->withErrors([
                    'codigo' => 'El código ingresado no fue autorizado por el administrador.'
                ]);
        }

        // Verificar que el nombre y apellido coincidan
        if (
            strtolower(trim($personal->nombre)) !== strtolower(trim($request->nombre)) ||
            strtolower(trim($personal->apellido)) !== strtolower(trim($request->apellido))
        ) {
            return back()
                ->withInput()
                ->withErrors([
                    'nombre' => 'El nombre, apellido y código no coinciden con los datos registrados por el administrador.'
                ]);
        }

        // Verificar que el empleado no se haya registrado antes
        if (Empleado::where('codigo', $request->codigo)->exists()) {
            return back()
                ->withInput()
                ->withErrors([
                    'codigo' => 'Este empleado ya completó su registro.'
                ]);
        }

        try {

            DB::transaction(function () use ($request) {

                // 1. Crear Persona
                $persona = Persona::create([
                    'nombre' => $request->nombre,
                    'apellido' => $request->apellido,
                    'fecha_nacimiento' => $request->fecha_nacimiento,
                ]);

                // 2. Crear Empleado
                $empleado = Empleado::create([
                    'persona_id' => $persona->id,
                    'codigo' => $request->codigo,
                ]);

                /* // 3. Crear Contacto
                Contacto::create([
                    'persona_id' => $persona->id,
                    'tipo_contacto_id' => 1,
                    'valor' => $request->usuario, // Asegúrate de que $request->usuario sea el email
                ]); */

                // 4. Crear Usuario
                $usuario = Usuario::create([
                    'persona_id' => $empleado->id,
                    'usuario' => $request->usuario,
                    'password' => Hash::make($request->password),
                    'rol' => 'empleado',
                ]);
            });

            return redirect('/login')
                ->with('success', 'Registro exitoso. Ya puedes iniciar sesión.');
        } catch (\Exception $e) {

            return back()
                ->withInput()
                ->with('error', $e->getMessage());

            // Para depuración:
            // ->with('error', $e->getMessage());
        }
    }
}
