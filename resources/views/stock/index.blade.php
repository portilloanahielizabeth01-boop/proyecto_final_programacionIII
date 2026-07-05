@extends('layouts.app')

@section('content')
<div class="container mt-5">
    <h2>Inventario de stock</h2>
    <table class="table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio</th>
            </tr>
        </thead>
        <tbody>
            @foreach($stock as $stock)
            <tr>
                <td>{{ $stock->nombre }}</td>
                <td>{{ $stock->cantidad }}</td>
                <td>{{ $stock->precio_venta }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection@extends('layouts.app')

@section('content')
<div class="container mt-5">
    <h2>Inventario de Stocks</h2>
    <table class="table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio</th>
            </tr>
        </thead>
        <tbody>
            @foreach($stock as $item)
            <tr>
                <td>{{ $stock->nombre }}</td>
                <td>{{ $stock->cantidad }}</td>
                <td>{{ $stock->precio_venta }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection