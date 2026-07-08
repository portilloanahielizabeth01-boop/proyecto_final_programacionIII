@extends('layouts.app')

@section('title', 'Dashboard - Reset & Go')

@section('content')
<div class="row">
    <div class="col-md-12 col-lg-4 mb-4">
        <div class="card">
            <div class="d-flex align-items-end row">
                <div class="col-8">
                    <div class="card-body">
                        <h6 class="card-title mb-1 text-nowrap">¡Bienvenido al Sistema! 🎉</h6>
                        <small class="d-block mb-3 text-nowrap">Panel de control de reparaciones</small>
                        <h5 class="card-title text-primary mb-1">Servicio Activo</h5>
                        <small class="d-block mb-4 pb-1 text-muted">Gestión técnica en tiempo real</small>
                        <a href="{{ route('clientes.index') }}" class="btn btn-sm btn-primary">Ver Clientes</a>
                    </div>
                </div>
                <div class="col-4 pt-3 ps-0">
                    <img src="{{ asset('assets/img/illustrations/prize-light.png') }}" width="90" height="140" class="rounded-start" alt="Sales" />
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-8 mb-4">
        <div class="card">
            <div class="card-body">
                <h5>Estadísticas Generales</h5>
                <p>Aquí puedes integrar tus gráficos de ApexCharts para ver las órdenes semanales.</p>
            </div>
        </div>
    </div>
</div>
@endsection