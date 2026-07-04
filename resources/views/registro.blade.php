<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Técnicos</title>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background-color: #f4f6f9; 
            padding: 40px 15px; 
            margin: 0;
        }
        .form-container { 
            max-width: 450px; 
            margin: 0 auto; 
            background: white; 
            padding: 30px; 
            border-radius: 10px; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
        }
        h2 {
            margin-top: 0;
            color: #333;
            text-align: center;
            margin-bottom: 25px;
        }
        .form-group { 
            margin-bottom: 20px; 
        }
        label { 
            display: block; 
            margin-bottom: 8px; 
            font-weight: 600; 
            color: #495057;
        }
        input, select { 
            width: 100%; 
            padding: 10px; 
            box-sizing: border-box; 
            border: 1px solid #ced4da; 
            border-radius: 5px; 
            font-size: 14px;
            transition: border-color 0.2s;
        }
        input:focus, select:focus {
            outline: none;
            border-color: #28a745;
        }
        button { 
            width: 100%; 
            padding: 12px; 
            background-color: #28a745; 
            color: white; 
            border: none; 
            border-radius: 5px; 
            font-size: 16px; 
            font-weight: bold;
            cursor: pointer; 
            margin-top: 10px;
            transition: background-color 0.2s;
        }
        button:hover {
            background-color: #218838;
        }
        .error-box { 
            background-color: #f8d7da;
            color: #721c24; 
            padding: 12px;
            border-radius: 5px;
            font-size: 14px; 
            margin-bottom: 20px; 
            border: 1px solid #f5c6cb;
        }
        .text-muted {
            font-size: 12px;
            color: #6c757d;
            margin-top: 4px;
        }
    </style>
</head>
<body>

<div class="form-container">
    <h2>Registro de Nuevo Técnico</h2>

    @if(session('error'))
        <div class="error-box">
            {{ session('error') }}
        </div>
    @endif

    @if($errors->any())
        <div class="error-box">
            <ul style="margin: 0; padding-left: 20px;">
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('tecnico.registro.guardar') }}" method="POST">
        @csrf <div class="form-group">
            <label>Nombre:</label>
            <input type="text" name="nombre" value="{{ old('nombre') }}" placeholder="Ej: Juan" required>
        </div>

        <div class="form-group">
            <label>Apellido:</label>
            <input type="text" name="apellido" value="{{ old('apellido') }}" placeholder="Ej: Pérez" required>
        </div>

        <div class="form-group">
            <label>DNI / Documento:</label>
            <input type="text" name="dni" value="{{ old('dni') }}" placeholder="Ej: 45678912" required>
        </div>

        <div class="form-group">
            <label>Fecha de Nacimiento:</label>
            <input type="date" name="fecha_nacimiento" value="{{ old('fecha_nacimiento') }}" required>
        </div>

        <div class="form-group">
            <label>Sexo:</label>
            <select name="sexo" required>
                <option value="">Seleccione...</option>
                <option value="Masculino" {{ old('sexo') == 'Masculino' ? 'selected' : '' }}>Masculino</option>
                <option value="Femenino" {{ old('sexo') == 'Femenino' ? 'selected' : '' }}>Femenino</option>
                <option value="Otro" {{ old('sexo') == 'Otro' ? 'selected' : '' }}>Otro</option>
            </select>
        </div>

        <div class="form-group">
            <label>Código de Técnico Autorizado:</label>
            <input type="text" name="codigo" placeholder="Ej: TEC-2026" required>
            <div class="text-muted">Solicita este código al administrador del sistema.</div>
        </div>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;">

        <div class="form-group">
            <label>Nombre de Usuario:</label>
            <input type="text" name="usuario" value="{{ old('usuario') }}" placeholder="Ej: juan.tecnico" required>
        </div>

        <div class="form-group">
            <label>Contraseña:</label>
            <input type="password" name="contraseña" placeholder="Mínimo 6 caracteres" required>
        </div>

        <button type="submit">Crear Cuenta de Técnico</button>
    </form>
</div>

</body>
</html>