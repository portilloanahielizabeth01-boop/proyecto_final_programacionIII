<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('historial_clientes', function (Blueprint $table) {
            $table->id();

            // Relación con el cliente afectado
            $table->foreignId('cliente_id')->constrained('clientes')->onDelete('cascade');

            // Relación con el usuario que hizo el cambio
            $table->foreignId('usuario_id')->constrained('usuarios')->onDelete('cascade');

            $table->string('accion'); // Ej: 'Creación', 'Edición'
            $table->text('detalles')->nullable(); // Ej: 'Se cambió el teléfono de 123 a 456'

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('historial_clientes');
    }
};
