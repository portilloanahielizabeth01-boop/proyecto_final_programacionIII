@extends('layouts.app')

@section('content')
<div class="container-xxl flex-grow-1 container-p-y">

    <div class="row">
        <div class="container-xxl flex-grow-1 container-p-y">
            <!-- About User -->
            <div class="card mb-4">
                <div class="card-body">
                    <small class="text-muted text-uppercase">Perfil</small>
                    <ul class="list-unstyled mb-4 mt-3">
                        <li class="d-flex align-items-center mb-3">
                            <i class="bx bx-user"></i><span class="fw-semibold mx-2">Nombre y Apellido:</span>
                            <span>{{ $usuario->empleado->persona->nombre ?? 'N/A' }} {{ $usuario->empleado->persona->apellido ?? '' }}</span>
                        </li>
                        <li class="d-flex align-items-center mb-3">
                            <i class="bx bx-check"></i><span class="fw-semibold mx-2">Estado:</span> <span>Activo</span>
                        </li>
                        <li class="d-flex align-items-center mb-3">
                            <i class="bx bx-calendar"></i>
                            <span class="fw-semibold mx-2">Fecha Nacimiento:</span>
                            <span>{{ $usuario->empleado->persona->fecha_nacimiento ?? 'N/A' }}</span>
                        </li>
                        <li class="d-flex align-items-center mb-3">
                            <i class="bx bx-id-card"></i>
                            <span class="fw-semibold mx-2">Código Empleado:</span>
                            <span>{{ $usuario->empleado->codigo ?? 'N/A' }}</span>
                        </li>
                        <li class="d-flex align-items-center mb-3">
                            <i class="bx bx-envelope"></i>
                            <span class="fw-semibold mx-2">Gmail:</span>
                            <span>{{ $usuario->usuario }}</span>
                        </li>
                        <li class="d-flex align-items-center mb-3">
                            <i class="bx bx-check-shield"></i>
                            <span class="fw-semibold mx-2">Rol:</span>
                            <span class="badge bg-label-primary">{{ ucfirst($usuario->rol) }}</span>
                        </li>
                    </ul>
                    
                </div>
            </div>
            <!--/ About User -->
            <!-- Profile Overview -->

            <!--/ Profile Overview -->
        </div>
    </div>
</div>
@endsection