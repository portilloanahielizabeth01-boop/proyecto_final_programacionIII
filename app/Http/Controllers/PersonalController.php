<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Personal;

class PersonalController extends Controller
{
    // Muestra el formulario y la lista de personal, ahora con soporte para búsqueda
    public function index(Request $request)
    {
        // 1. Capturamos lo que el usuario escribió en el input "buscar"
        $buscar = $request->input('buscar');

        // 2. Iniciamos la consulta base
        $query = Personal::query();

        // 3. Si hay algo en la variable $buscar, agregamos las condiciones
        if ($buscar) {
            $query->where('nombre', 'LIKE', '%' . $buscar . '%')
                  ->orWhere('apellido', 'LIKE', '%' . $buscar . '%')
                  ->orWhere('codigo_unico', 'LIKE', '%' . $buscar . '%');
        }

        // 4. Ejecutamos la consulta para traer los datos (filtrados o todos)
        $personalMuestra = $query->get(); 

        return view('personal.index', compact('personalMuestra'));
    }

    // Guarda el nuevo personal en la base de datos (Sin cambios)
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:50',
            'apellido' => 'required|string|max:50',
            'codigo_unico' => 'required|string|max:20|unique:personals,codigo_unico',
        ]);

        $nuevo = new Personal();
        $nuevo->nombre = $request->nombre;
        $nuevo->apellido = $request->apellido;
        $nuevo->codigo_unico = $request->codigo_unico;
        $nuevo->save();

        return redirect()->back()->with('success', '¡Personal registrado con éxito!');
    }
}