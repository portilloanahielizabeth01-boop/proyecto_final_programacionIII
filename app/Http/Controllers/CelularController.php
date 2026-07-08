<?php

namespace App\Http\Controllers;


use App\Models\Celular;
use Illuminate\Http\Request;
use App\Models\HistorialStock;

class CelularController extends Controller
{
    /**
     * Procesa el formulario y guarda el celular manualmente en la base de datos local
     */

    public function storeCelular(Request $request)
    {
        // 1. Validamos los datos
        $request->validate([
            'nombre' => 'required|string|max:100',
            'modelo' => 'required|string|max:150|unique:celulares,modelo',
            // Max limitado al año actual (date('Y'))
           'anio' => 'required|integer|min:1990|max:' . date('Y'),
        ], [
            'nombre.required' => 'La marca o nombre es obligatoria.',
            'modelo.unique' => 'El modelo exacto es obligatorio.',
            // Aquí agregamos el mensaje específico para el año
            'anio.max'        => 'El año no puede ser mayor al año actual (' . date('Y') . ').',
            'anio.min'        => 'El año debe ser igual o superior a 1990.',
        ]);

        // 2. Guardamos
        $celular = Celular::create([
            'nombre' => $request->nombre,
            'modelo' => $request->modelo,
            'anio'   => $request->anio,
        ]);

        // 3. Historial (Recuerda que si no cambiaste la DB a nullable, usar 0 es el "parche" temporal)
        HistorialStock::create([
            'stock_id'   => null,
            'usuario_id' => auth()->id(),
            'accion'     => 'Alta de Celular',
            'detalles'   => "Se agregó un nuevo modelo al catálogo: {$celular->nombre} {$celular->modelo}."
        ]);

        return back()->with('success', '¡El modelo de celular fue registrado correctamente!');
    }
}
