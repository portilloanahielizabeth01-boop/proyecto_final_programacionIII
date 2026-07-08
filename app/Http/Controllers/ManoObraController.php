<?php

namespace App\Http\Controllers;

use App\Models\ManoObra;
use Illuminate\Http\Request;

class ManoObraController extends Controller
{
    /**
     * Muestra el listado de tarifas de mano de obra.
     */
   public function index(Request $request)
{
    // Iniciamos la consulta base
    $query = ManoObra::query();

    // Filtramos si hay búsqueda (por nombre)
    if ($request->filled('buscar')) {
        $query->where('nombre', 'like', '%' . $request->buscar . '%');
    }

    // Paginar y mantener el filtro en los links de la paginación
    $manoObras = $query->latest()->paginate(10)->withQueryString();

    return view('mano_obra.index', compact('manoObras'));
}

    /**
     * Guarda un nuevo servicio/tarifa en el catálogo.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric|min:0',
        ]);

        ManoObra::create($request->only('nombre', 'precio'));

        return back()->with('success', 'Servicio de mano de obra registrado con éxito.');
    }

    /**
     * Actualiza el precio o nombre de una tarifa existente.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric|min:0',
        ]);

        $manoObra = ManoObra::findOrFail($id);
        $manoObra->update($request->only('nombre', 'precio'));

        return back()->with('success', 'Tarifa actualizada correctamente.');
    }
}
