<?php

namespace App\Http\Controllers;

use App\Models\Celular;
use Illuminate\Http\Request;

class CelularController extends Controller
{
    /**
     * Procesa el formulario y guarda el celular manualmente en la base de datos local
     */
    public function store(Request $request)
    {
        // 1. Validamos los datos localmente
        $request->validate([
            'nombre' => 'required|string|max:100', // Marca: Samsung, Apple, Xiaomi, etc.
            'modelo' => 'required|string|max:150|unique:celulares,modelo', // Evita registrar el mismo modelo dos veces
            'anio'   => 'nullable|integer|min:1990|max:' . (date('Y') + 1),
        ], [
            'nombre.required' => 'La marca o nombre es obligatoria.',
            'modelo.required' => 'El modelo exacto es obligatorio.',
            'modelo.unique'   => 'Este modelo de celular ya existe en la base de datos.',
        ]);

        // 2. Guardamos directamente en la tabla 'celulares'
        Celular::create([
            'nombre' => $request->nombre,
            'modelo' => $request->modelo,
            'anio'   => $request->anio,
        ]);

        // 3. Volvemos a la vista con el mensaje de éxito
        return back()->with('success', '¡El modelo de celular fue registrado localmente con éxito!');
    }
}