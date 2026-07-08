@extends('layouts.app')

@section('title', 'Módulo de Productos - Reset & Go')

@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
    <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Administración /</span> Gestión de Productos</h4>

    @if(session('success'))
    <div class="alert alert-success alert-dismissible" role="alert">
        {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif

    @if($errors->any())
    <div class="alert alert-danger alert-dismissible" role="alert">
        <ul class="mb-0">
            @foreach($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif

    <div class="nav-align-top mb-4">
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <button type="button" class="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#clientes-listado" aria-controls="navs-listado" aria-selected="true">
                    <i class="tf-icons bx bx-list-ul me-1"></i> Lista de Clientes
                </button>
            </li>
            <li class="nav-item">
                <button type="button" class="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#clientes-registrar" aria-controls="navs-form-celular" aria-selected="false">
                    <i class="tf-icons bx bx-mobile me-1"></i> Registrar Cliente
                </button>
            </li>


            @if(auth()->user()->rol == 'admin')
            <li class="nav-item">
                <button type="button" class="nav-link" role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#clientes-historial">
                    <i class="tf-icons bx bx-history me-1"></i> Historial de Cambios
                </button>
            </li>
            @endif
        </ul>

        <div class="tab-content">

            <div class="tab-pane fade show active" id="clientes-listado" role="tabpanel">

                <h5 class="card-header px-0">
                    Lista de Clientes
                </h5>

                <div class="table-responsive text-nowrap">

                    <table class="table table-hover table-bordered">

                        <thead class="table-light">
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>DNI</th>
                                <th>Teléfono</th>
                                <th>Fecha Alta</th>
                                <th class="text-center">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            @forelse($clientes as $cliente)

                            <tr>

                                <td>{{ $cliente->persona->nombre }}</td>

                                <td>{{ $cliente->persona->apellido }}</td>

                                <td>{{ $cliente->persona->dni }}</td>

                                <td>
                                    @foreach($cliente->contactos as $contacto)
                                    {{ $contacto->valor }}
                                    @endforeach
                                </td>


                                <td>{{ $cliente->created_at->format('d/m/Y') }}</td>

                                <td class="text-center">

                                    <button
                                        class="btn btn-sm btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editModal{{ $cliente->id }}">
                                        <i class="bx bx-edit"></i>
                                    </button>

                                </td>

                            </tr>

                            @empty

                            <tr>
                                <td colspan="6" class="text-center">
                                    No existen clientes registrados.
                                </td>
                            </tr>

                            @endforelse

                        </tbody>

                    </table>


                </div>

            </div>

            <div class="tab-pane fade" id="clientes-registrar" role="tabpanel">
                <h5 class="mb-4">Registrar Cliente</h5>
                <form action="{{ route('clientes.store') }}" method="POST">

                    @csrf

                    <div class="row">

                        <div class="col-md-6 mb-3">
                            <label>Nombre</label>
                            <input type="text"
                                name="nombre"
                                class="form-control"
                                required>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label>Apellido</label>
                            <input type="text"
                                name="apellido"
                                class="form-control"
                                required>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label>DNI</label>

                            <input
                                class="form-control"
                                type="text"
                                name="dni"
                                maxlength="8"
                                minlength="7"
                                pattern="[0-9]{7,8}"
                                required>
                        </div>



                        <div class="col-md-6 mb-3">
                            <label>Teléfono</label>
                            <input
                                class="form-control"
                                type="text"
                                name="telefono"
                                placeholder="Ej: 1123456789"
                                maxlength="13"
                                required>
                        </div>



                    </div>

                    <button class="btn btn-primary">
                        Registrar Cliente
                    </button>

                </form>
            </div>

            <div class="tab-pane fade" id="clientes-historial" role="tabpanel">
                <h5 class="card-header px-0">Historial de Auditoría de Inventario</h5>
                <div class="table-responsive text-nowrap">
                    @if(auth()->user()->rol == 'admin')

                    <table class="table table-striped">

                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Usuario</th>
                                <th>Acción</th>
                                <th>Cliente</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>

                        <tbody>

                            @forelse($historial as $log)

                            <tr>

                                <td>{{ $log->created_at->format('d/m/Y H:i') }}</td>

                                <td>{{ $log->usuario->usuario }}</td>

                                <td>{{ $log->accion }}</td>

                                <td>{{ $log->cliente->persona->nombre }} {{ $log->cliente->persona->apellido }}</td>

                                <td>{{ $log->detalle }}</td>

                            </tr>

                            @empty

                            <tr>
                                <td colspan="5" class="text-center">
                                    No hay registros en el historial.
                                </td>
                            </tr>

                            @endforelse

                        </tbody>

                    </table>

                    @endif
                </div>
            </div>

        </div>
        @foreach($clientes as $cliente)



        <div class="modal fade"
            id="editModal{{ $cliente->id }}"
            tabindex="-1"
            aria-hidden="true">

            <div class="modal-dialog modal-lg">

                <div class="modal-content">
                    @if($errors->any())
                    <div class="alert alert-danger alert-dismissible" role="alert">
                        <ul class="mb-0">
                            @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                            @endforeach
                        </ul>

                    </div>
                    @endif
                    <form action="{{ route('clientes.update',$cliente->id) }}"
                        method="POST">

                        @csrf
                        @method('PUT')
                        <input type="hidden" name="cliente_id" value="{{ $cliente->id }}">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                Editar Cliente
                            </h5>

                            <button type="button"
                                class="btn-close"
                                data-bs-dismiss="modal">
                            </button>
                        </div>

                        <div class="modal-body">

                            <div class="row">

                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Nombre</label>
                                    <input type="text"
                                        name="nombre"
                                        class="form-control"
                                        value="{{ $cliente->persona->nombre }}"
                                        required>
                                </div>

                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Apellido</label>
                                    <input type="text"
                                        name="apellido"
                                        class="form-control"
                                        value="{{ $cliente->persona->apellido }}"
                                        required>
                                </div>

                                <div class="col-md-6 mb-3">
                                    <label class="form-label">DNI</label>
                                    <input type="number"
                                        name="dni"
                                        class="form-control"
                                        maxlength="8"
                                        minlength="7"
                                        pattern="[0-9]{7,8}"
                                        value="{{ $cliente->persona->dni }}"
                                        required>
                                </div>

                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Teléfono</label>
                                    <input type="text"
                                        name="telefono"
                                        maxlength="13"
                                        class="form-control"
                                        value="{{ optional($cliente->persona->contactos->first())->valor }}" required>
                                </div>

                            </div>

                        </div>

                        <div class="modal-footer">

                            <button type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal">
                                Cancelar
                            </button>

                            <button type="submit"
                                class="btn btn-primary">
                                Actualizar Cliente
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>


        @endforeach

    </div>
</div>
@endsection
@section('scripts')
@if($errors->any())

<script>
    document.addEventListener('DOMContentLoaded', function() {

        let modalId = "{{ old('cliente_id') }}";

        if (modalId) {

            let modal = new bootstrap.Modal(
                document.getElementById('editModal' + modalId)
            );

            modal.show();

        }

    });
</script>

@endif
@endsection