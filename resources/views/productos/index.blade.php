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
                <button type="button" class="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#navs-listado" aria-controls="navs-listado" aria-selected="true">
                    <i class="tf-icons bx bx-list-ul me-1"></i> Listado de Productos
                </button>
            </li>
            <li class="nav-item">
                <button type="button" class="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-form-celular" aria-controls="navs-form-celular" aria-selected="false">
                    <i class="tf-icons bx bx-mobile me-1"></i> Registrar Celular
                </button>
            </li>
            <li class="nav-item">
                <button type="button"
                    class="nav-link"
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-producto-componentes">

                    <i class="tf-icons bx bx-package me-1"></i>
                    Registrar Componentes

                </button>
            </li>
            <li class="nav-item">
                <button type="button" class="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-form-componente" aria-controls="navs-form-componente" aria-selected="false">
                    <i class="tf-icons bx bx-wrench me-1"></i> Agregar Componente / Stock
                </button>
            </li>
            @if(auth()->user()->rol == 'admin')
            <li class="nav-item">
                <button type="button" class="nav-link" role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-historial">
                    <i class="tf-icons bx bx-history me-1"></i> Historial de Cambios
                </button>
            </li>
            @endif
        </ul>

        <div class="tab-content">

            <div class="tab-pane fade show active" id="navs-listado" role="tabpanel">

                <h5 class="card-header px-0">
                    Componentes en Stock y Compatibilidades
                </h5>

                <div class="table-responsive text-nowrap">

                    <table class="table table-bordered table-hover">

                        <thead class="table-light">
                            <tr>
                                <th>Componente</th>
                                <th>Celular Compatible</th>
                                <th>Stock</th>
                                <th>P. Compra</th>
                                <th>P. Venta</th>
                                <th class="text-center">Acciones</th>
                            </tr>
                        </thead>


                        <tbody>

                            @forelse($items as $item)

                            <tr>

                                <td>
                                    <strong>
                                        {{ $item->nombre_componente }}
                                    </strong>
                                </td>


                                <td>
                                    <span class="badge bg-label-primary">
                                        {{ $item->marca }} - {{ $item->modelo }}
                                    </span>
                                </td>


                                <td>
                                    <span class="badge 
                                        {{ $item->cantidad > 5 
                                            ? 'bg-label-success' 
                                            : 'bg-label-danger' }}">

                                        {{ $item->cantidad }} un.

                                    </span>
                                </td>


                                <td>
                                    ${{ number_format($item->precio_comprado,2) }}
                                </td>


                                <td>
                                    ${{ number_format($item->precio_venta,2) }}
                                </td>


                                <td class="text-center">

                                    <button type="button"
                                        class="btn btn-sm btn-icon btn-outline-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editModal{{ $item->id }}">

                                        <i class="bx bx-edit-alt"></i>

                                    </button>

                                </td>


                            </tr>


                            @empty

                            <tr>

                                <td colspan="6" class="text-center">

                                    No hay componentes vinculados.

                                </td>

                            </tr>

                            @endforelse


                        </tbody>


                    </table>


                </div>


                {{-- MODALES FUERA DE LA TABLA --}}




            </div>



            <div class="tab-pane fade" id="navs-form-celular" role="tabpanel">
                <h5 class="mb-4">Registrar Nuevo Modelo de Celular</h5>
                <form action="{{ route('celulares.storeCelular') }}" method="POST">
                    @csrf
                    <div class="row">
                        <div class="col-md-5 mb-3">
                            <label class="form-label">Marca / Fabricante</label>
                            <input type="text" name="nombre" class="form-control" placeholder="Ej: Samsung, Apple" required>
                        </div>
                        <div class="col-md-5 mb-3">
                            <label class="form-label">Modelo Exacto</label>
                            <input type="text" name="modelo" class="form-control" placeholder="Ej: Galaxy S23 Ultra" required>
                        </div>
                        <div class="col-md-2 mb-3">
                            <label class="form-label">Año</label>
                            <input type="number" name="anio" class="form-control" placeholder="Ej: {{ date('Y') }}" min="1990" max="{{ date('Y') }}" required>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Guardar Celular en la Base de Datos</button>
                </form>
            </div>
            <div class="tab-pane fade" id="navs-producto-componentes" role="tabpanel">
                <h5 class="mb-4">Registrar Componente</h5>
                <form action="{{ route('stock.store') }}" method="POST">
                    @csrf
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Nombre del Componente</label>
                            <input type="text" name="nombre" class="form-control" placeholder="Ej: Pantalla OLED" required>
                        </div>

                    </div>

                    <button type="submit" class="btn btn-primary">Registrar Componente</button>
                </form>
            </div>

            <div class="tab-pane fade" id="navs-form-componente" role="tabpanel">
                <h5 class="mb-4">Registrar Nuevo Repuesto / Componente</h5>
                <form action="{{ route('stock.vincular') }}" method="POST">
                    @csrf
                    <div class="row">
                        <div class="col-md-6 mb-3">

                            <label class="form-label">
                                Seleccionar Componente
                            </label>


                            <select name="stock_id" class="form-select" required>

                                <option value="">
                                    Seleccione un componente
                                </option>


                                @foreach($stocks as $stock)

                                <option value="{{ $stock->id }}">

                                    {{ $stock->nombre }}

                                </option>

                                @endforeach


                            </select>

                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Cantidad Inicial en Stock</label>
                            <input type="number" name="cantidad" class="form-control" placeholder="Ej: 10" min="0" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Precio de Compra</label>
                            <div class="input-group input-group-merge">
                                <span class="input-group-text">$</span>
                                <input type="number" name="precio_comprado" class="form-control" placeholder="0.00" step="0.01" required>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Precio de Venta</label>
                            <div class="input-group input-group-merge">
                                <span class="input-group-text">$</span>
                                <input type="number" name="precio_venta" class="form-control" placeholder="0.00" step="0.01" required>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Modelo de Celular</label>
                        <select name="celular_id" class="form-select" required>
                            <option value="">Seleccione un celular</option>
                            @foreach($todosLosCelulares as $celular)
                            <option value="{{ $celular->id }}">
                                {{ $celular->nombre }} - {{ $celular->modelo }} ({{ $celular->anio }})
                            </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Descripción / Notas Adicionales</label>
                        <textarea name="descripcion" class="form-control" rows="2" placeholder="Notas del repuesto..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Registrar Componente y Vincular</button>
                </form>
            </div>

            <div class="tab-pane fade" id="navs-historial" role="tabpanel">
                <h5 class="card-header px-0">Historial de Auditoría de Inventario</h5>
                <div class="table-responsive text-nowrap">
                    <table class="table table-striped table-bordered">
                        <thead class="table-light">
                            <tr>
                                <th>Fecha y Hora</th>
                                <th>Componente</th>
                                <th>Responsable</th>
                                <th>Acción</th>
                                <th>Detalles del Cambio</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($historialCambios as $log)
                            <tr>
                                <td><span class="text-muted small"><i class="bx bx-calendar me-1"></i>{{ $log->created_at->format('d/m/Y H:i:s') }}</span>
                                </td>
                                <td>
                                    <strong>
                                        @if($log->stock)
                                        {{ $log->stock->nombre }}
                                        @else
                                        <span class="text-muted italic">Alta de Celular</span>
                                        @endif
                                    </strong>
                                </td>
                                <td>

                                    @if($log->usuario)
                                    @if($log->usuario->empleado && $log->usuario->empleado->persona)
                                    {{-- Es un empleado con persona --}}
                                    {{ $log->usuario->empleado->persona->nombre }} {{ $log->usuario->empleado->persona->apellido }}
                                    <br>
                                    <small class="text-muted">Empleado</small>
                                    @else
                                    {{-- Es un usuario sin empleado, probablemente Admin --}}
                                    <span class="badge bg-label-danger">Admin</span>
                                    @endif
                                    @else
                                    <span class="text-danger">Sistema</span>
                                    @endif
                                </td>
                                <td>
                                    <span class="badge {{ $log->accion === 'Creación' ? 'bg-label-success' : 'bg-label-warning' }}">
                                        {{ $log->accion }}
                                    </span>
                                </td>
                                <td class="small" style="max-width: 400px; white-space: normal;">
                                    {{ $log->detalles }}
                                </td>
                            </tr>
                            @empty
                            <tr>
                                <td colspan="5" class="text-center text-muted py-4">No se registran movimientos en el historial aún.</td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        @foreach($items as $item)



        <div class="modal fade"
            id="editModal{{ $item->id }}"
            tabindex="-1"
            aria-hidden="true">


            <div class="modal-dialog modal-dialog-centered">


                <div class="modal-content">


                    <form action="{{ route('stock.update',$item->stock_id) }}"
                        method="POST">


                        @csrf
                        @method('PUT')


                        <input type="hidden"
                            name="celular_id"
                            value="{{ $item->celular_id }}">



                        <div class="modal-header">

                            <h5 class="modal-title">
                                Editar precios
                            </h5>


                            <button type="button"
                                class="btn-close"
                                data-bs-dismiss="modal">

                            </button>

                        </div>



                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Cantidad a Sumar</label>
                                <input type="number" name="cantidad_sumar" class="form-control" value="0" min="0" required>
                                <small class="text-muted">La cantidad ingresada se sumará al stock actual.</small>
                            </div>

                            <div class="mb-3">

                                <label class="form-label">
                                    Precio Compra
                                </label>


                                <input type="number"
                                    name="precio_comprado"
                                    class="form-control"
                                    value="{{ $item->precio_comprado ?? 0 }}"
                                    step="0.01"
                                    required>

                            </div>




                            <div class="mb-3">

                                <label class="form-label">
                                    Precio Venta
                                </label>


                                <input type="number"
                                    name="precio_venta"
                                    class="form-control"
                                    value="{{ $item->precio_venta ?? 0 }}"
                                    step="0.01"
                                    required>

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

                                Actualizar

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
<script>
    const stocksData = {
        !!$stockJson!!
    };
    document.querySelector('select[name="celular_id"]').addEventListener('change', function() {
        const stockId = document.querySelector('select[name="stock_id"]').value;
        const celularId = this.value;
        const encontrada = stocksData.find(s => s.stock_id == stockId && s.celular_id == celularId);

        if (encontrada) {
            document.querySelector('input[name="precio_comprado"]').value = encontrada.precio_comprado;
            document.querySelector('input[name="precio_venta"]').value = encontrada.precio_venta;

        }
    });
</script>
@endsection