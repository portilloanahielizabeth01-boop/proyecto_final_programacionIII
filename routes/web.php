<?php


use App\Http\Controllers\StockController;

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

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\AuthController;
// Rutas de Autenticación
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
// Rutas de Stock
Route::get('/stock', [StockController::class, 'index'])->name('stock.index');



// Rutas exclusivas para el registro de Anahí
Route::get('/registro-tecnico', [RegistroController::class, 'mostrarFormulario'])->name('tecnico.registro.ver');
Route::post('/registro-tecnico', [RegistroController::class, 'registrar'])->name('tecnico.registro.guardar');