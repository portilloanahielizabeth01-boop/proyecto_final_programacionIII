<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Personal;

class PersonalController extends Controller
{
    // Muestra el formulario y la lista de personal todo junto
    public function index()
    {
        $personalMuestra = Personal::all(); // Trae a todos los empleados de la BD
        return view('personal.index', compact('personalMuestra'));
    }

    // Guarda el nuevo personal en la base de datos
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