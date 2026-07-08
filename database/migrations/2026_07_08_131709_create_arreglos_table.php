<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('arreglos', function (Blueprint $table) {
            $table->id();
            
            // Relación con el Cliente
            $table->foreignId('cliente_id')->constrained('clientes')->onDelete('cascade');
            
            // Relación con la Mano de Obra (Servicio)
            $table->foreignId('mano_obra_id')->constrained('mano_obras')->onDelete('cascade');
            
            // Relación con el Repuesto (Stock). Es NULLABLE porque no todos los arreglos usan repuestos (ej: una limpieza)
            $table->foreignId('stock_id')->nullable()->constrained('stocks')->onDelete('set null');
            
            // Monto total (Mano de obra + precio del componente en venta si aplica)
            $table->decimal('total', 10, 2); 
            
            // Estado de la reparación
            $table->string('estado')->default('Pendiente'); // Pendiente, En Proceso, Terminado, Entregado
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('arreglos');
    }
};