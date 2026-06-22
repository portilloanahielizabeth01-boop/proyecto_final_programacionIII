@extends('layouts.app')

@section('content')

<h1 class="text-3xl font-bold mb-6">
    Listado de Clientes
</h1>

<a href="/clientes/create"
   class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
    Nuevo Cliente
</a>

<br><br>

<table class="min-w-full bg-white border rounded-lg">
    <thead class="bg-gray-200">
        <tr>
            <th class="p-3 border">ID</th>
            <th class="p-3 border">Nombre</th>
            <th class="p-3 border">Teléfono</th>
            <th class="p-3 border">Dirección</th>
            <th class="p-3 border">Acciones</th>
        </tr>
    </thead>

    <tbody>
        @foreach($clientes as $cliente)
        <tr>
            <td class="p-3 border">{{ $cliente->id }}</td>
            <td class="p-3 border">{{ $cliente->nombre }}</td>
            <td class="p-3 border">{{ $cliente->telefono }}</td>
            <td class="p-3 border">{{ $cliente->direccion }}</td>

            <td class="p-3 border">
                <a href="/clientes/{{ $cliente->id }}/edit"
                   class="text-blue-600 hover:underline">
                    Editar
                </a>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>

@endsection