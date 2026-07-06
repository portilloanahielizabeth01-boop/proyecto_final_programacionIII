<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            
            // Tus otras columnas
            $table->foreignId('persona_id')->constrained('personas');
            $table->string('usuario');
            $table->string('password');
            
            // ¡ESTA ES LA COLUMNA QUE FALTA EN TU BD!
            $table->string('rol')->default('empleado'); 
            
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
};