<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('celular_stock', function (Blueprint $table) {
            $table->id();

            $table->foreignId('celular_id')->constrained('celulares')->onDelete('cascade');
            $table->foreignId('stock_id')->constrained('stocks')->onDelete('cascade');

            // 🚀 Nuevas columnas de precio en la tabla intermedia
            $table->decimal('precio_comprado', 10, 2)->default(0.00);
            $table->decimal('precio_venta', 10, 2)->default(0.00);
            $table->integer('cantidad');
            $table->text('descripcion')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('celular_stock');
    }
};