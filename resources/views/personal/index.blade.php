@extends('layouts.app')

@section('title', 'Dashboard - Servicio Técnico')

@section('content')

<div class="container">
    <h2>Módulo: Carga de Personal</h2>

    @if(session('success'))
    <div class="alert-success">{{ session('success') }}</div>
    @endif

    @if($errors->any())
    <div class="alert-error">
        <ul style="margin:0; padding-left:20px;">
            @foreach($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif
    
    <div class="card mb-4">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Cargar Nuevo Personal</h5>
            <small class="text-muted float-end">Formulario</small>
        </div>
        <div class="card-body">
            <form action="{{ route('personal.store') }}" method="POST">
                @csrf 

                <div class="mb-3">
                    <label class="form-label" for="basic-default-fullname">Nombre:</label>
                    <input class="form-control" id="basic-default-fullname" type="text" name="nombre" value="{{ old('nombre') }}" placeholder="Ej: Anahi" required>
                </div>
                
                <div class="mb-3">
                    <label class="form-label" for="basic-default-company">Apellido:</label>
                    <input class="form-control" id="basic-default-company" type="text" name="apellido" value="{{ old('apellido') }}" placeholder="Ej: Portillo" required>
                </div>
                
                <div class="mb-3">
                    <label class="form-label" for="basic-default-phone">Código Único:</label>
                    <input type="text" class="form-control" name="codigo_unico" value="{{ old('codigo_unico') }}" placeholder="Ej: EMP-101" required>
                </div>

                <div class="pt-4">
                    <button type="submit" class="btn btn-primary me-sm-3 me-1">Guardar Personal</button>
                </div>
            </form>
        </div>
    </div>

    <hr style="margin: 40px 0; border: 0; border-top: 1px solid #eee;">

    <div class="card">
        <div class="card-header d-flex flex-column flex-md-row justify-content-between align-items-md-center">
            <h5 class="mb-3 mb-md-0">Personal Registrado</h5>
            
            <form action="{{ request()->url() }}" method="GET" class="d-flex">
                <input type="text" name="buscar" class="form-control me-2" placeholder="Buscar personal..." value="{{ request('buscar') }}">
                <button type="submit" class="btn btn-primary">Buscar</button>
                
                @if(request('buscar'))
                    <a href="{{ request()->url() }}" class="btn btn-outline-secondary ms-2">Limpiar</a>
                @endif
            </form>
        </div>
        
        <div class="table-responsive">
            <table class="table table-bordered table-hover mb-0">
                <thead class="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Nombre y Apellido</th>
                        <th>Código Único</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($personalMuestra as $p)
                    <tr>
                        <td>{{ $p->id }}</td>
                        <td>{{ $p->apellido }}, {{ $p->nombre }}</td>
                        <td><strong>{{ $p->codigo_unico }}</strong></td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="3" class="text-center text-muted py-4">
                            @if(request('buscar'))
                                No se encontraron resultados para "<strong>{{ request('buscar') }}</strong>".
                            @else
                                No hay personal registrado todavía.
                            @endif
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>

@endsection