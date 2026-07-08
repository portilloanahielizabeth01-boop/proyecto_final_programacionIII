@extends('layouts.app')

@section('content')
<div class="container-xxl flex-grow-1">
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5>Tarifario: Mano de Obra</h5>

            <form action="{{ route('mano_obra.index') }}" method="GET" class="d-flex">
                <input type="text" name="buscar" class="form-control me-2" placeholder="Buscar servicio..." value="{{ request('buscar') }}">
                <button type="submit" class="btn btn-primary">Buscar</button>
                <a href="{{ route('mano_obra.index') }}" class="btn btn-outline-secondary ms-2">Limpiar</a>
            </form>

            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#manoObraModal">+ Nuevo Servicio</button>
        </div>

        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Servicio</th>
                        <th>Precio Base</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($manoObras as $mo)
                    <tr>
                        <td>{{ $mo->nombre }}</td>
                        <td>${{ number_format($mo->precio, 2) }}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editManoObraModal{{ $mo->id }}">Editar</button>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="3" class="text-center">No se encontraron servicios.</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="card-footer">
            {{ $manoObras->links('pagination::bootstrap-5') }}
        </div>
    </div>
</div>

@foreach($manoObras as $mo)
<div class="modal fade" id="editManoObraModal{{ $mo->id }}" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <form action="{{ route('mano_obra.update', $mo->id) }}" method="POST" class="modal-content">
            @csrf
            @method('PUT')

            <div class="modal-header">
                <h5 class="modal-title">Editar Servicio</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Nombre del Servicio</label>
                    <input type="text" name="nombre" class="form-control" value="{{ $mo->nombre }}" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Precio ($)</label>
                    <input type="number" step="0.01" name="precio" class="form-control" value="{{ $mo->precio }}" required>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-primary">Actualizar</button>
            </div>
        </form>
    </div>
</div>
@endforeach

<div class="modal fade" id="manoObraModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <form action="{{ route('mano_obra.store') }}" method="POST" class="modal-content">
            @csrf
            <div class="modal-header">
                <h5 class="modal-title">Registrar Servicio</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Nombre del Servicio (Ej: Cambio Módulo)</label>
                    <input type="text" name="nombre" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Precio ($)</label>
                    <input type="number" step="0.01" name="precio" class="form-control" required>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
        </form>
    </div>
</div>
@endsection