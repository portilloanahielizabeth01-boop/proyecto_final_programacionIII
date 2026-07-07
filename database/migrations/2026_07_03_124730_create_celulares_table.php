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
        Schema::create('celulares', function (Blueprint $table) {
            $table->id();
            $table->string('nombre'); // Ej: Samsung Galaxy
            $table->string('modelo'); // Ej: S23 Ultra
            $table->integer('anio')->nullable();
            $table->string('api_device_id')->nullable()->unique(); // <-- Para enlazar con la API externa
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('celulares');
    }
};
