<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario; 
use App\Models\Persona; 
use Illuminate\Support\Facades\Hash;

class RegistroController extends Controller
{
    /**
     * Muestra el formulario de registro para técnicos.
     */
    public function mostrarFormulario()
    {
        return view('registro');
    }

    /**
     * Procesa el almacenamiento del nuevo técnico en la base de datos.
     */
    public function registrar(Request $request)
    {
        // 1. VALIDACIÓN DE LOS DATOS REQUERIDOS
        $request->validate([
            'nombre' => 'required|string|max:50',
            'apellido' => 'required|string|max:50',
            'fecha_nacimiento' => 'required|date',
            'sexo' => 'required|string',
            'dni' => 'required|string|max:20', 
            'usuario' => 'required|string|unique:usuarios,usuario', 
            'contraseña' => 'required|string|min:6', 
            'codigo' => 'required|string', 
        ]);

        // 2. FILTRO DE SEGURIDAD: CÓDIGO TÉCNICO AUTORIZADO
        $codigoTecnicoValido = "TEC-2026"; 
        if ($request->codigo !== $codigoTecnicoValido) {
            return redirect()->back()->withInput()->with('error', 'El código de técnico ingresado no es válido.');
        }

        // 3. PASO 1 EN BASE DE DATOS: Crear el registro en la tabla 'personas'
        $nuevaPersona = new Persona();
        $nuevaPersona->nombre = $request->nombre;
        $nuevaPersona->apellido = $request->apellido;
        $nuevaPersona->fecha_nacimiento = $request->fecha_nacimiento;
        $nuevaPersona->dni = $request->dni; 
        $nuevaPersona->save(); // Al guardar, MySQL genera automáticamente el ID de la persona

        // 4. PASO 2 EN BASE DE DATOS: Crear las credenciales en la tabla 'usuarios' amarradas a la persona
        $nuevoUsuario = new Usuario();
        $nuevoUsuario->persona_id = $nuevaPersona->id; // Inyección de la clave foránea (FK)
        $nuevoUsuario->usuario = $request->usuario;
        $nuevoUsuario->password = Hash::make($request->contraseña); // Encriptación segura de la contraseña
        $nuevoUsuario->save(); 

        // 5. REDIRECCIÓN EXITOSA
        return redirect()->to('/login')->with('success', '¡Técnico registrado con éxito!');
    }
}