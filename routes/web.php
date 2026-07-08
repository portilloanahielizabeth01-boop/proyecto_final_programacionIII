<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\RegistroController;
use App\Http\Controllers\PersonalController;
use App\Http\Controllers\CelularController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ManoObraController;
use App\Http\Controllers\ArregloController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// =========================
// RUTAS PÚBLICAS (Cualquiera puede entrar)
// =========================

Route::get('/', function () {
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

    // 1. EL DASHBOARD
    Route::get('dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    // 2. CERRAR SESIÓN
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // 3. CLIENTES (CRUD)
    Route::prefix('clientes')->name('clientes.')->group(function () {
        Route::get('/', [ClienteController::class, 'index'])->name('index');
        Route::post('/', [ClienteController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [ClienteController::class, 'edit'])->name('edit');
        Route::put('/{id}', [ClienteController::class, 'update'])->name('update');
        Route::delete('/{id}', [ClienteController::class, 'destroy'])->name('destroy');
    });

    // 4. MÓDULO DE PRODUCTOS (Celulares y Stock)
    Route::get('/productos', [StockController::class, 'index'])->name('productos.index');
    Route::post('/productos/stock', [StockController::class, 'store'])->name('stock.store');
    Route::post('/productos/celulares', [CelularController::class, 'storeCelular'])->name('celulares.storeCelular');
    Route::put('/productos/stock/{id}', [StockController::class, 'update'])->name('stock.update');
    // Ruta corregida usando la importación superior
    Route::post('/productos/vincular', [StockController::class, 'vincular'])->name('stock.vincular');

    // 5. CARGA DE PERSONAL
    Route::get('/carga-personal', [PersonalController::class, 'index'])->name('personal.index');
    Route::post('/carga-personal', [PersonalController::class, 'store'])->name('personal.store');
    //5.Modulo de perfil
    Route::get('/perfil', [ProfileController::class, 'show'])->name('perfil.show');
    // Rutas para Mano de Obra (Tarifario)
    Route::prefix('mano-obra')->name('mano_obra.')->group(function () {
        Route::get('/', [ManoObraController::class, 'index'])->name('index');
        Route::post('/', [ManoObraController::class, 'store'])->name('store');
        Route::put('/{id}', [ManoObraController::class, 'update'])->name('update');
    });

    // Rutas para los Arreglos (Órdenes de trabajo)
    // Rutas para los Arreglos (Órdenes de trabajo)
    Route::prefix('arreglos')->name('arreglos.')->group(function () {
        Route::get('/', [ArregloController::class, 'index'])->name('index');
        Route::post('/', [ArregloController::class, 'store'])->name('store');
        Route::put('/{id}', [ArregloController::class, 'update'])->name('update');

        // Mueve la ruta de pago aquí adentro:
        Route::put('/{id}/pago', [ArregloController::class, 'updatePago'])->name('updatePago');
    });
    Route::get('/landing', function () {
        return view('landing'); // Asegúrate de que el archivo se llame landing.blade.php
    })->name('landing');
});
