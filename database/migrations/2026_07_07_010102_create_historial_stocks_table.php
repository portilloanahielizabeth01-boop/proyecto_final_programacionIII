<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('historial_stocks', function (Blueprint $table) {
            $table->id();
            // Relación con el componente modificado
            $table->foreignId('stock_id')->constrained('stocks')->onDelete('cascade');
            // Relación con el usuario que hizo la modificación
            $table->foreignId('usuario_id')->constrained('usuarios')->onDelete('cascade');
            
            $table->string('accion'); // Ej: 'Creación', 'Actualización de Precios'
            $table->text('detalles')->nullable(); // Ej: 'Precio venta cambió de $100 a $150'
            $table->timestamps(); // created_at guardará el "cuándo" automáticamente
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('historial_stocks');
    }
};