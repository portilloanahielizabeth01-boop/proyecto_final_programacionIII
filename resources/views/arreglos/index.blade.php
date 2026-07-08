@extends('layouts.app')

@section('title', 'Gestión de Reparaciones')

@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
    <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Taller /</span> Órdenes de Reparación</h4>

    @if(session('success'))
    <div class="alert alert-success alert-dismissible" role="alert">
        {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif

    <div class="nav-align-top mb-4">
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <button type="button" class="nav-link active" data-bs-toggle="tab" data-bs-target="#arreglos-listado">
                    <i class="bx bx-list-ul me-1"></i> Lista de Reparaciones
                </button>
            </li>
            <li class="nav-item">
                <button type="button" class="nav-link" data-bs-toggle="tab" data-bs-target="#arreglos-registrar">
                    <i class="bx bx-plus-circle me-1"></i> Registrar Reparación
                </button>
            </li>
            @if(auth()->user()->rol == 'admin')
            <li class="nav-item">
                <button type="button" class="nav-link" data-bs-toggle="tab" data-bs-target="#arreglos-auditoria">
                    <i class="bx bx-history me-1"></i> Auditoría
                </button>
            </li>
            @endif
        </ul>

        <div class="tab-content">
            <div class="tab-pane fade show active" id="arreglos-listado">
                <div class="mb-4">
                    <form action="{{ route('arreglos.index') }}" method="GET" class="d-flex">
                        <input type="text" name="buscar" class="form-control me-2" placeholder="Buscar por cliente o DNI..." value="{{ request('buscar') }}">
                        <button type="submit" class="btn btn-primary">Buscar</button>
                        <a href="{{ route('arreglos.index') }}" class="btn btn-outline-secondary ms-2">Limpiar</a>
                    </form>
                </div>

                <div class="table-responsive text-nowrap">
                    <table class="table table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>Cliente</th>
                                <th>Servicio</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Pago</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($arreglos as $a)
                            <tr>
                                <td>{{ $a->cliente->persona->nombre ?? 'N/A' }} {{ $a->cliente->persona->apellido ?? '' }}</td>
                                <td>{{ $a->manoObra->nombre }}</td>
                                <td><span class="fw-bold">${{ number_format($a->total, 2) }}</span></td>
                                <td>
                                    <span class="badge bg-label-{{ $a->estado == 'Pendiente' ? 'warning' : 'success' }}">{{ $a->estado }}</span>
                                </td>
                                <td>
                                    @if(auth()->user()->rol == 'admin')
                                    <button class="btn btn-sm btn-{{ $a->estado_pago == 'Pagado' ? 'success' : 'warning' }}" data-bs-toggle="modal" data-bs-target="#pagoModal{{ $a->id }}">
                                        {{ $a->estado_pago }}
                                    </button>
                                    @else
                                    <span class="badge bg-label-{{ $a->estado_pago == 'Pagado' ? 'success' : 'danger' }}">{{ $a->estado_pago }}</span>
                                    @endif
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                
                <div class="mt-4">
                    {{ $arreglos->links('pagination::bootstrap-5') }}
                </div>
            </div>

            <div class="tab-pane fade" id="arreglos-registrar">
                <form action="{{ route('arreglos.store') }}" method="POST">
                    @csrf
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Cliente</label>
                            <select name="cliente_id" class="form-select" required>
                                @foreach($clientes as $c)
                                <option value="{{ $c->id }}">{{ $c->persona->nombre }} {{ $c->persona->apellido }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Servicio</label>
                            <select name="mano_obra_id" class="form-select" required>
                                @foreach($manoObras as $mo)
                                <option value="{{ $mo->id }}">{{ $mo->nombre }} (${{ $mo->precio }})</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <button class="btn btn-primary">Registrar Reparación</button>
                </form>
            </div>

            @if(auth()->user()->rol == 'admin')
            <div class="tab-pane fade" id="arreglos-auditoria">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr><th>Fecha</th><th>Admin</th><th>Acción</th><th>Detalle</th></tr>
                        </thead>
                        <tbody>
                            @foreach($auditorias as $log)
                            <tr>
                                <td>{{ $log->created_at->format('d/m/Y H:i') }}</td>
                                <td>{{ $log->user->name ?? 'Admin' }}</td>
                                <td>{{ $log->accion }}</td>
                                <td><pre class="mb-0 small">{{ json_encode(json_decode($log->valores_despues), JSON_PRETTY_PRINT) }}</pre></td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
            @endif
        </div>
    </div>
</div>

@if(auth()->user()->rol == 'admin')
@foreach($arreglos as $a)
<div class="modal fade" id="pagoModal{{ $a->id }}" tabindex="-1">
    <div class="modal-dialog">
        <form action="{{ route('arreglos.updatePago', $a->id) }}" method="POST" class="modal-content">
            @csrf @method('PUT')
            <div class="modal-header"><h5 class="modal-title">Gestión de Pago</h5></div>
            <div class="modal-body">
                <select name="estado_pago" class="form-select mb-3">
                    <option value="Pendiente" {{ $a->estado_pago == 'Pendiente' ? 'selected' : '' }}>Pendiente</option>
                    <option value="Pagado" {{ $a->estado_pago == 'Pagado' ? 'selected' : '' }}>Pagado</option>
                </select>
                <textarea name="motivo_no_pago" class="form-control" placeholder="Motivo de no pago">{{ $a->motivo_no_pago }}</textarea>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Actualizar Pago</button>
            </div>
        </form>
    </div>
</div>
@endforeach
@endif
@endsection