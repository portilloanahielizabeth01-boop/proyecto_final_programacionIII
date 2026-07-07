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
        Schema::create('celular_stock', function (Blueprint $table) {
            $table->id();

            // Relación con la tabla celulares
            // 'onDelete(cascade)' asegura que si se borra un celular, se borren también sus asociaciones de repuestos automáticamente
            $table->foreignId('celular_id')->constrained('celulares')->onDelete('cascade');

            // Relación con la tabla stocks
            $table->foreignId('stock_id')->constrained('stocks')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('celular_stock');
    }
};