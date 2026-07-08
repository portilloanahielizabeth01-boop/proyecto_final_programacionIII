<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mano_obras', function (Blueprint $table) {
            $table->id();
            $table->string('nombre'); // Ej: "Cambio de Pantalla", "Limpieza química"
            $table->decimal('precio', 10, 2); // Precio base del servicio
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mano_obras');
    }
};