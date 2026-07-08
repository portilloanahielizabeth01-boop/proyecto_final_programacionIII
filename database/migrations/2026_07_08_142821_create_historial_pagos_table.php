<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void {
    Schema::create('historial_pagos', function (Blueprint $table) {
        $table->id();
        $table->foreignId('arreglo_id')->constrained('arreglos')->onDelete('cascade');
        $table->string('estado_anterior');
        $table->string('estado_nuevo');
        $table->text('motivo')->nullable();
        $table->foreignId('user_id')->constrained('users'); // Quién hizo el cambio
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historial_pagos');
    }
};
