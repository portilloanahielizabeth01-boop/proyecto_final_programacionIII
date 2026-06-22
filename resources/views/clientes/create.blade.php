<h1>Crear Cliente</h1>

<form action="/clientes" method="POST">
    @csrf

    <label>Nombre:</label>
    <input type="text" name="nombre">

    <br>

    <label>Teléfono:</label>
    <input type="text" name="telefono">

    <br>

    <label>Dirección:</label>
    <input type="text" name="direccion">

    <br><br>

    <button type="submit">Guardar</button>
</form>