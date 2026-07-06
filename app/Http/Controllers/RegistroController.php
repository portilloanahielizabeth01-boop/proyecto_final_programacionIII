<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use App\Models\Persona;
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

            'sexo' => 'required|in:Masculino,Femenino,Otro',

            'dni' => 'required|digits_between:6,9',

            // 📧 usuario como email real
            'usuario' => 'required|email|max:100|unique:usuarios,usuario',

            'password' => 'required|string|min:6|max:100',

            'codigo' => 'required|string',
        ], [
            'nombre.required' => 'El nombre es obligatorio',
            'apellido.required' => 'El apellido es obligatorio',

            'fecha_nacimiento.required' => 'La fecha de nacimiento es obligatoria',
            'fecha_nacimiento.before' => 'La fecha no puede ser futura',
            'fecha_nacimiento.after' => 'La edad máxima permitida es 120 años',

            'sexo.required' => 'Debes seleccionar un sexo',
            'sexo.in' => 'El sexo seleccionado no es válido',

            'dni.required' => 'El DNI es obligatorio',
            'dni.digits_between' => 'El DNI debe tener entre 6 y 9 números',

            'usuario.required' => 'El correo es obligatorio',
            'usuario.email' => 'Debes ingresar un correo válido',
            'usuario.unique' => 'Este correo ya está registrado',

            'password.required' => 'La contraseña es obligatoria',
            'password.min' => 'La contraseña debe tener al menos 6 caracteres',

            'codigo.required' => 'El código de técnico es obligatorio',
        ]);

        // 🔐 código técnico fijo
        if ($request->codigo !== "TEC-2026") {
            return back()
                ->withInput()
                ->with('error', 'El código de técnico ingresado no es válido');
        }

        try {

            DB::transaction(function () use ($request) {

                $persona = Persona::create([
                    'nombre' => $request->nombre,
                    'apellido' => $request->apellido,
                    'fecha_nacimiento' => $request->fecha_nacimiento,
                    'dni' => $request->dni,
                    'sexo' => $request->sexo,
                ]);

                Usuario::create([
                    'persona_id' => $persona->id,
                    'usuario' => $request->usuario, // email
                    'password' => Hash::make($request->password),
                ]);
            });

            return redirect('/login')
                ->with('success', 'Registro exitoso. Ya puedes iniciar sesión');

        } catch (\Exception $e) {

            return back()
                ->withInput()
                ->with('error', 'Error al registrar el usuario. Intente nuevamente');

            // 🔥 DESARROLLO (opcional):
            // ->with('error', $e->getMessage());
        }
    }
}