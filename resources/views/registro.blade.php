@extends('layouts.auth')

@section('content')

<div class="container-xxl">
    <div class="authentication-wrapper authentication-basic container-p-y">
        <div class="authentication-inner">

            <div class="card">
                <div class="card-body">

                    <!-- Logo -->
                    <div class="app-brand justify-content-center mb-3">
                        <a href="#" class="app-brand-link gap-2">
                            <span class="app-brand-text demo text-body fw-bolder">Sneat</span>
                        </a>
                    </div>

                    <h4 class="mb-2 text-center">Registro de Técnico 🚀</h4>
                    <p class="mb-4 text-center">Crea tu cuenta para acceder al sistema</p>

                    {{-- ERROR GENERAL --}}
                    @if(session('error'))
                    <div class="alert alert-danger">
                        {{ session('error') }}
                    </div>
                    @endif

                    <form action="{{ route('tecnico.registro.guardar') }}" method="POST">
                        @csrf

                        <!-- NOMBRE -->
                        <div class="mb-3">
                            <label class="form-label">Nombre</label>
                            <input type="text"
                                name="nombre"
                                value="{{ old('nombre') }}"
                                class="form-control @error('nombre') is-invalid @enderror"
                                required>

                            @error('nombre')
                            <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <!-- APELLIDO -->
                        <div class="mb-3">
                            <label class="form-label">Apellido</label>
                            <input type="text"
                                name="apellido"
                                value="{{ old('apellido') }}"
                                class="form-control @error('apellido') is-invalid @enderror"
                                required>

                            @error('apellido')
                            <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <!-- DNI -->
                        <div class="mb-3">
                            <label class="form-label">DNI</label>
                            <input type="text"
                                name="dni"
                                value="{{ old('dni') }}"
                                class="form-control @error('dni') is-invalid @enderror"
                                required>

                            @error('dni')
                            <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>



                        <!-- FECHA NACIMIENTO -->
                        <div class="mb-3">
                            <label class="form-label">Fecha nacimiento</label>

                            <input type="date"
                                name="fecha_nacimiento"
                                value="{{ old('fecha_nacimiento') }}"
                                class="form-control @error('fecha_nacimiento') is-invalid @enderror"
                                required>

                            @error('fecha_nacimiento')
                            <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <!-- SEXO -->
                        <div class="mb-3">
                            <label class="form-label">Sexo</label>

                            <select name="sexo"
                                class="form-select @error('sexo') is-invalid @enderror"
                                required>

                                <option value="">Seleccione...</option>
                                <option value="Masculino" {{ old('sexo')=='Masculino'?'selected':'' }}>Masculino</option>
                                <option value="Femenino" {{ old('sexo')=='Femenino'?'selected':'' }}>Femenino</option>
                                <option value="Otro" {{ old('sexo')=='Otro'?'selected':'' }}>Otro</option>
                            </select>

                            @error('sexo')
                            <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <!-- CÓDIGO TÉCNICO -->
                        <div class="mb-3">
                            <label class="form-label">Código técnico</label>

                            <input type="text"
                                name="codigo"
                                class="form-control @error('codigo') is-invalid @enderror"
                                required>

                            <small class="text-muted">Solicítalo al administrador</small>

                            @error('codigo')
                            <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <hr>
                        <!-- USUARIO (EMAIL) -->
                        <div class="mb-3">
                            <label class="form-label">usuario</label>

                            <input type="text"
                                name="usuario"
                                value="{{ old('usuario') }}"
                                placeholder="ejemplo@mail.com"
                                class="form-control @error('usuario') is-invalid @enderror"
                                required>

                            @error('usuario')
                            <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                        <!-- PASSWORD -->
                        <div class="mb-3 form-password-toggle">
                            <label class="form-label">Contraseña</label>

                            <div class="input-group input-group-merge">
                                <input type="password"
                                    name="password"
                                    class="form-control @error('password') is-invalid @enderror"
                                    required>

                                <span class="input-group-text cursor-pointer">
                                    <i class="bx bx-hide"></i>
                                </span>
                            </div>

                            @error('password')
                            <div class="invalid-feedback d-block">
                                {{ $message }}
                            </div>
                            @enderror
                        </div>

                        <!-- BOTÓN SUBMIT -->
                        <button type="submit" class="btn btn-primary d-grid w-100">
                            Crear cuenta
                        </button>

                    </form>

                    <!-- VOLVER AL LOGIN -->
                    <a href="{{ url('/login') }}"
                        class="btn btn-outline-secondary d-grid w-100 mt-2">
                        ← Volver al inicio
                    </a>

                </div>
            </div>

        </div>
    </div>
</div>

@endsection