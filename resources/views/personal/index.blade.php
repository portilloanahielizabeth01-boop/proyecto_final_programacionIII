<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carga de Personal</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 30px; margin: 0; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h2, h3 { color: #333; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input { width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; }
        button { background-color: #007bff; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: bold; }
        button:hover { background-color: #0056b3; }
        .alert-success { background-color: #d4edda; color: #155724; padding: 10px; border-radius: 4px; margin-bottom: 15px; border: 1px solid #c3e6cb; }
        .alert-error { background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 4px; margin-bottom: 15px; border: 1px solid #f5c6cb; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>

<div class="container">
    <h2>Módulo: Carga de Personal</h2>

    <!-- Mensajes de éxito o error -->
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

    <!-- Formulario de Carga -->
    <form action="{{ route('personal.store') }}" method="POST">
        @csrf
        <div class="form-group">
            <label>Nombre:</label>
            <input type="text" name="nombre" value="{{ old('nombre') }}" placeholder="Ej: Anahi" required>
        </div>
        <div class="form-group">
            <label>Apellido:</label>
            <input type="text" name="apellido" value="{{ old('apellido') }}" placeholder="Ej: Portillo" required>
        </div>
        <div class="form-group">
            <label>Código Único:</label>
            <input type="text" name="codigo_unico" value="{{ old('codigo_unico') }}" placeholder="Ej: EMP-101" required>
        </div>
        <button type="submit">Registrar Personal</button>
    </form>

    <hr style="margin: 40px 0; border: 0; border-top: 1px solid #eee;">

    <!-- Listado de Personal -->
    <h3>Personal Registrado</h3>
    <table>
        <thead>
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
                    <td colspan="3" style="text-align: center; color: #777;">No hay personal registrado todavía.</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</div>

</body>
</html>