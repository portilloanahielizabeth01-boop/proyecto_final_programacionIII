@extends('layouts.auth')

@section('content')

<div class="container-xxl">
    <div class="authentication-wrapper authentication-basic container-p-y">
        <div class="authentication-inner">

            <div class="card">
                <div class="card-body p-5">

                    <div class="app-brand justify-content-center mb-4">
                        <img src="{{ asset('assets/img/icons/global/iconoresetgo-removebg-preview.png') }}" 
                             class="img-fluid" 
                             style="max-width: 120px;" 
                             alt="Reset & Go">
                    </div>

                    <div class="text-center mb-4">
                        
                        <p class="text-muted">
                            Ingresá tus credenciales para continuar
                        </p>
                    </div>

                    @if ($errors->any())
                    <div class="alert alert-danger">
                        {{ $errors->first() }}
                    </div>
                    @endif

                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="mb-3">
                            <label class="form-label">
                                Correo electrónico
                            </label>

                            <input
                                type="email"
                                name="email"
                                class="form-control"
                                placeholder="correo@ejemplo.com"
                                required
                                autofocus>
                        </div>

                        <div class="mb-4">
                            <label class="form-label">
                                Contraseña
                            </label>

                            <input
                                type="password"
                                name="password"
                                class="form-control"
                                placeholder="********"
                                required>
                        </div>

                        <button class="btn btn-primary w-100">
                            Ingresar
                        </button>
                        
                        <div class="text-center mt-3">
                            <a href="{{ route('tecnico.registro.ver') }}" class="text-primary">
                                ¿No tienes cuenta? Regístrate aquí
                            </a>
                        </div>

                    </form>

                </div>
            </div>

        </div>
    </div>
</div>

@endsection