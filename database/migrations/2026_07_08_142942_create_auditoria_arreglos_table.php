<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('auditoria_arreglos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('arreglo_id')->constrained('arreglos')->onDelete('cascade');

            // Creamos la columna como un entero simple sin forzar la relación de FK en MySQL
            $table->unsignedBigInteger('user_id');

            $table->string('accion');
            $table->json('valores_antes')->nullable();
            $table->json('valores_despues')->nullable();
            $table->timestamps();

            // QUITAMOS la línea $table->foreign(...);
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Corrige el nombre aquí también
        Schema::dropIfExists('auditoria_arreglos');
    }
};
