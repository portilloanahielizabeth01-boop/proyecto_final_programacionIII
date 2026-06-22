<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reparaciones', function (Blueprint $table) {
            $table->id();

            $table->foreignId('equipo_id')
                ->constrained('equipos')
                ->onDelete('cascade');

            $table->text('descripcion_falla');
            $table->text('diagnostico')->nullable();
            $table->decimal('costo', 10, 2)->nullable();

            $table->date('fecha_ingreso');
            $table->date('fecha_entrega')->nullable();

            $table->string('estado')->default('pendiente');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reparaciones');
    }
};
