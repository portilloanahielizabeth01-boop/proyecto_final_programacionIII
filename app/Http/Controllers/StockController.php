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
        $historialCambios = HistorialStock::with(['stock', 'usuario.empleado.persona'])
            ->latest()
            ->paginate(10);

        return view('productos.index', [
            'items' => $items, // Cambiamos el nombre para diferenciarlo
            'todosLosCelulares' => $todosLosCelulares,
            'stocks' => $stocks,
            'historialCambios' => $historialCambios,
            'stockJson' => \DB::table('celular_stock')->get()->toJson()
        ]);
    }

    // MÉTODO 1: Solo registra el nombre del componente en el catálogo (Pestaña: Registrar Componentes)
    public function store(Request $request)
    {
        $request->validate([
            // Usamos unique para que no creen dos veces "Pantalla OLED" por error
            'nombre' => 'required|string|max:255|unique:stocks,nombre',
        ]);

        $componente = Stock::create([
            'nombre' => $request->nombre
        ]);
        HistorialStock::create([
            'stock_id'   => $componente->id,
            'usuario_id' => auth()->id(),
            'accion'     => 'Alta de Componente',
            'detalles'   => "Se registró un nuevo componente en el catálogo: '{$request->nombre}'."
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
        ]);

        $componente = Stock::findOrFail($request->stock_id);
        $relacion = $componente->celularesCompatibles()->where('celular_id', $request->celular_id)->first();

        if ($relacion) {
            // SI EXISTE: Actualizamos sumando
            $nuevaCantidad = $relacion->pivot->cantidad + $request->cantidad;

            $componente->celularesCompatibles()->updateExistingPivot($request->celular_id, [
                'cantidad'        => $nuevaCantidad,
                'precio_comprado' => $request->precio_comprado,
                'precio_venta'    => $request->precio_venta,
            ]);

            HistorialStock::create([
                'stock_id'   => $componente->id,
                'usuario_id' => auth()->id(),
                'accion'     => 'Actualización de Stock',
                'detalles'   => "Se sumaron {$request->cantidad} unidades (Total: {$nuevaCantidad}). Precios ajustados a Compra: \${$request->precio_comprado}, Venta: \${$request->precio_venta}."
            ]);

            $mensaje = "Stock actualizado. Nueva cantidad: " . $nuevaCantidad;
        } else {
            // SI NO EXISTE: Primera vinculación
            $componente->celularesCompatibles()->attach($request->celular_id, [
                'cantidad'        => $request->cantidad,
                'precio_comprado' => $request->precio_comprado,
                'precio_venta'    => $request->precio_venta,
                'descripcion'     => $request->descripcion
            ]);

            HistorialStock::create([
                'stock_id'   => $componente->id,
                'usuario_id' => auth()->id(),
                'accion'     => 'Creación de Stock',
                'detalles'   => "Vinculación inicial con {$request->cantidad} unidades."
            ]);

            $mensaje = "Componente vinculado correctamente.";
        }

        return back()->with('success', $mensaje);
    }

    // MÉTODO 3: Actualiza los precios desde el botón de editar en la tabla principal
    public function update(Request $request, $id)
    {
        $request->validate([
            'celular_id'      => 'required|exists:celulares,id',
            'precio_comprado' => 'required|numeric|min:0',
            'precio_venta'    => 'required|numeric|min:0',
            'cantidad_sumar'  => 'required|integer|min:0',
        ]);

        $componente = Stock::findOrFail($id);

        // Obtenemos la relación actual para comparar
        $relacionActual = $componente->celularesCompatibles()->where('celular_id', $request->celular_id)->first();
        $cantidadAnterior = $relacionActual->pivot->cantidad;
        $nuevaCantidad = $cantidadAnterior + $request->cantidad_sumar;

        // Actualizamos la tabla pivote
        $componente->celularesCompatibles()->updateExistingPivot($request->celular_id, [
            'cantidad'        => $nuevaCantidad,
            'precio_comprado' => $request->precio_comprado,
            'precio_venta'    => $request->precio_venta,
            'updated_at'      => now(),
        ]);

        // Historial dinámico
        HistorialStock::create([
            'stock_id'   => $componente->id,
            'usuario_id' => auth()->id(),
            'accion'     => 'Actualización',
            'detalles'   => "Se sumaron {$request->cantidad_sumar} unidades (Total: {$nuevaCantidad}). Precios ajustados a Compra: \${$request->precio_comprado}, Venta: \${$request->precio_venta}."
        ]);

        return back()->with('success', 'Stock y precios actualizados correctamente.');
    }
}
