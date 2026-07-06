<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\RegistroController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// =========================
// RUTAS PÚBLICAS (Cualquiera puede entrar)
// =========================

Route::get('/', function () {
    // Si entran a la raíz, los mandamos al login por defecto
    return redirect('/login');
});

// Autenticación
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

// Registro Técnico
Route::get('/registro-tecnico', [RegistroController::class, 'mostrarFormulario'])
    ->name('tecnico.registro.ver');
Route::post('/registro-tecnico', [RegistroController::class, 'registrar'])
    ->name('tecnico.registro.guardar');


// =========================
// RUTAS PROTEGIDAS (Solo usuarios logueados)
// =========================
Route::middleware(['auth'])->group(function () {

    // 1. EL DASHBOARD (A donde llegas al loguearte)
    Route::get('dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    // 2. CERRAR SESIÓN
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // 3. CLIENTES (CRUD)
    Route::prefix('clientes')->group(function () {
        // Le agregamos el ->name() porque lo usas en tu sidebar.blade.php
        Route::get('/', [ClienteController::class, 'index'])->name('clientes.index');

        Route::get('/create', [ClienteController::class, 'create']);
        Route::post('/', [ClienteController::class, 'store']);
        Route::get('/{id}/edit', [ClienteController::class, 'edit']);
        Route::put('/{id}', [ClienteController::class, 'update']);
        Route::delete('/{id}', [ClienteController::class, 'destroy']);
    });

    // 4. STOCK
    Route::get('/stock', [StockController::class, 'index'])
        ->name('stock.index');
});
