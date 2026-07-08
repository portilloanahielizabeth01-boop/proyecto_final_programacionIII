<?php

namespace App\Http\Controllers;

use App\Models\Arreglo;
use App\Models\Cliente;
use App\Models\ManoObra;
use App\Models\CelularStock;
use App\Models\AuditoriaArreglo; // Importante
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ArregloController extends Controller
{
    public function index(Request $request)
    {
        // 1. Iniciar la consulta base
        $query = Arreglo::with(['cliente.persona', 'manoObra', 'stock']);

        // 2. Aplicar el buscador si existe
        if ($request->filled('buscar')) {
            $busqueda = $request->buscar;
            $query->whereHas('cliente.persona', function ($q) use ($busqueda) {
                $q->where('nombre', 'like', "%{$busqueda}%")
                    ->orWhere('apellido', 'like', "%{$busqueda}%")
                    ->orWhere('dni', 'like', "%{$busqueda}%");
            });
        }

        // 3. Paginar y mantener los filtros en los links
        $arreglos = $query->latest()->paginate(10)->withQueryString();

        // 4. Cargar datos auxiliares
        $clientes = Cliente::with('persona')->get();
        $manoObras = ManoObra::all();
        $stocks = CelularStock::where('cantidad', '>', 0)->get();

        // 5. Cargar auditoría (Nota: si la auditoría es muy grande, considera paginarla también)
        $auditorias = \App\Models\AuditoriaArreglo::with(['user', 'arreglo.cliente.persona'])
            ->latest()
            ->take(50) // Limitamos para no sobrecargar el sistema
            ->get();

        return view('arreglos.index', compact('arreglos', 'clientes', 'manoObras', 'stocks', 'auditorias'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'cliente_id'   => 'required|exists:clientes,id',
            'mano_obra_id' => 'required|exists:mano_obras,id',
            'stock_id'     => 'nullable|exists:celular_stock,id',
        ]);

        DB::transaction(function () use ($request) {
            $manoObra = ManoObra::findOrFail($request->mano_obra_id);
            $totalCalculado = (float) $manoObra->precio;

            if ($request->filled('stock_id')) {
                $repuesto = CelularStock::findOrFail($request->stock_id);
                $totalCalculado += (float) ($repuesto->precio_venta ?? 0);
                $repuesto->decrement('cantidad', 1);
            }

            Arreglo::create([
                'cliente_id'   => $request->cliente_id,
                'mano_obra_id' => $request->mano_obra_id,
                'stock_id'     => $request->stock_id ?: null,
                'total'        => $totalCalculado,
                'estado'       => 'Pendiente',
                'estado_pago'  => 'Pendiente',
            ]);
        });

        return back()->with('success', 'Orden de reparación registrada.');
    }

    // MÉTODO PARA ACTUALIZAR PAGO Y REGISTRAR AUDITORÍA
    public function updatePago(Request $request, $id)
    {
        if (Auth::user()->rol !== 'admin') {
            return back()->with('error', 'No autorizado.');
        }

        $arreglo = Arreglo::findOrFail($id);

        // Guardamos los valores ANTES del cambio para la auditoría
        $valoresAntes = [
            'estado_pago'    => $arreglo->estado_pago,
            'motivo_no_pago' => $arreglo->motivo_no_pago
        ];

        $request->validate([
            'estado_pago'    => 'required|in:Pendiente,Pagado',
            'motivo_no_pago' => 'nullable|string'
        ]);

        // Actualizamos
        $arreglo->update([
            'estado_pago'    => $request->estado_pago,
            'motivo_no_pago' => $request->motivo_no_pago
        ]);

        // Guardamos en la tabla de auditoría
        AuditoriaArreglo::create([
            'arreglo_id'      => $arreglo->id,
            'user_id'         => Auth::id(),
            'accion'          => 'MODIFICACIÓN DE PAGO',
            'valores_antes'   => json_encode($valoresAntes),
            'valores_despues' => json_encode($request->only('estado_pago', 'motivo_no_pago'))
        ]);

        return back()->with('success', 'Pago actualizado y registrado en historial.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'estado' => 'required|string|in:Pendiente,En Proceso,Terminado,Entregado',
        ]);

        $arreglo = Arreglo::findOrFail($id);

        // Guardamos valor antes
        $valoresAntes = ['estado' => $arreglo->estado];

        // Actualizamos
        $arreglo->update($request->only('estado'));

        // Registramos en auditoría
        $this->registrarAuditoria($arreglo->id, 'MODIFICACIÓN DE ESTADO', $valoresAntes, $request->only('estado'));

        return back()->with('success', 'El estado de la reparación ha sido actualizado.');
    }

    /**
     * Método privado para registrar en Auditoría (Reutilizable)
     */
    private function registrarAuditoria($arregloId, $accion, $antes, $despues)
    {
        \App\Models\AuditoriaArreglo::create([
            'arreglo_id'      => $arregloId,
            'user_id'         => \Illuminate\Support\Facades\Auth::id(),
            'accion'          => $accion,
            'valores_antes'   => json_encode($antes),
            'valores_despues' => json_encode($despues)
        ]);
    }
}
