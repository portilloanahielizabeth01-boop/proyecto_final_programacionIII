<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Página principal → redirige a clientes
Route::get('/', function () {
    return redirect('/clientes');
});

// CRUD de clientes (agrupado y ordenado)
Route::prefix('clientes')->group(function () {

    Route::get('/', [ClienteController::class, 'index']);          // Listar
    Route::get('/create', [ClienteController::class, 'create']);    // Form crear
    Route::post('/', [ClienteController::class, 'store']);          // Guardar

    Route::get('/{id}/edit', [ClienteController::class, 'edit']);   // Form editar
    Route::put('/{id}', [ClienteController::class, 'update']);      // Actualizar

    Route::delete('/{id}', [ClienteController::class, 'destroy']);  // Eliminar
});