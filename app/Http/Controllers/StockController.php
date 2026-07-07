<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\Celular;
use App\Models\HistorialStock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    public function index()
    {
        // Usamos el modelo DB o una consulta directa para traer la unión
        // Esto es mucho más rápido y fácil de paginar
        $items = \DB::table('celular_stock')
            ->join('stocks', 'celular_stock.stock_id', '=', 'stocks.id')
            ->join('celulares', 'celular_stock.celular_id', '=', 'celulares.id')
            ->select(
                'celular_stock.*',
                'stocks.nombre as nombre_componente',
                'celulares.nombre as marca',
                'celulares.modelo'
            )
            ->paginate(10);

        $todosLosCelulares = Celular::orderBy('nombre')->get();
        $stocks = Stock::orderBy('nombre', 'asc')->get();
        $historialCambios = HistorialStock::with(['stock', 'usuario.persona'])->latest()->get();

        return view('productos.index', [
            'items' => $items, // Cambiamos el nombre para diferenciarlo
            'todosLosCelulares' => $todosLosCelulares,
            'stocks' => $stocks,
            'historialCambios' => $historialCambios
        ]);
    }

    // MÉTODO 1: Solo registra el nombre del componente en el catálogo (Pestaña: Registrar Componentes)
    public function store(Request $request)
    {
        $request->validate([
            // Usamos unique para que no creen dos veces "Pantalla OLED" por error
            'nombre' => 'required|string|max:255|unique:stocks,nombre',
        ]);

        Stock::create([
            'nombre' => $request->nombre
        ]);

        return back()->with('success', 'Componente base registrado en el catálogo con éxito.');
    }

    // MÉTODO 2: Vincula un componente existente con un celular, cantidad y precios (Pestaña: Agregar Componente / Stock)
    public function vincular(Request $request)
    {
        $request->validate([
            'stock_id'        => 'required|exists:stocks,id',
            'celular_id'      => 'required|exists:celulares,id',
            'cantidad'        => 'required|integer|min:0',
            'precio_comprado' => 'required|numeric|min:0',
            'precio_venta'    => 'required|numeric|min:0',
            'descripcion'     => 'nullable|string'
        ]);

        $componente = Stock::findOrFail($request->stock_id);

        // syncWithoutDetaching agrega la relación a la tabla pivote sin borrar las que ya existan
        $componente->celularesCompatibles()->syncWithoutDetaching([
            $request->celular_id => [
                'cantidad'        => $request->cantidad,
                'precio_comprado' => $request->precio_comprado,
                'precio_venta'    => $request->precio_venta,
                'descripcion'     => $request->descripcion,
                'created_at'      => now(),
                'updated_at'      => now(),
            ]
        ]);

        // Registro de Auditoría
        HistorialStock::create([
            'stock_id'   => $componente->id,
            'usuario_id' => auth()->id(),
            'accion'     => 'Ingreso de Stock',
            'detalles'   => "Se vincularon {$request->cantidad} unidades al modelo seleccionado."
        ]);

        return back()->with('success', '¡Stock y precios vinculados al celular correctamente!');
    }

    // MÉTODO 3: Actualiza los precios desde el botón de editar en la tabla principal
    public function update(Request $request, $id)
    {
        $request->validate([
            'celular_id'      => 'required|exists:celulares,id',
            'precio_comprado' => 'required|numeric|min:0',
            'precio_venta'    => 'required|numeric|min:0',
        ]);

        $componente = Stock::findOrFail($id);

        // Actualizamos exclusivamente la fila correspondiente en la tabla pivote
        $componente->celularesCompatibles()->updateExistingPivot($request->celular_id, [
            'precio_comprado' => $request->precio_comprado,
            'precio_venta'    => $request->precio_venta,
            'updated_at'      => now(),
        ]);

        // Opcional: Registrar la edición en el historial
        HistorialStock::create([
            'stock_id'   => $componente->id,
            'usuario_id' => auth()->id(),
            'accion'     => 'Actualización de Precios',
            'detalles'   => "Se actualizaron los precios para un modelo compatible."
        ]);

        return back()->with('success', 'Precios actualizados correctamente para este modelo.');
    }
}
