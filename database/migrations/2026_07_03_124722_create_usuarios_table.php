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
        // 1. TU TABLA PRINCIPAL (Reemplaza a la tabla 'users' original)
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            
            // Relación con la tabla personas
            $table->foreignId('persona_id')->constrained('personas')->onDelete('cascade');
            
            // Credenciales y Rol
            $table->string('usuario')->unique(); // Lo marcamos único porque es el correo/login
            $table->string('password');
            $table->string('rol')->default('empleado');
            
            // Requisito nativo de Laravel para "Recordar sesión"
            $table->rememberToken(); 
            
            $table->timestamps();
        });

        // 2. TABLA DE RECUPERACIÓN DE CONTRASEÑAS (Adaptada)
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            // Cambiamos 'email' por 'usuario' para que coincida con tu lógica
            $table->string('usuario')->primary(); 
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // 3. TABLA DE SESIONES (Sistema de Laravel)
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            
            // IMPORTANTE: Laravel busca internamente la columna 'user_id' 
            // para manejar las sesiones en base de datos. Lo dejamos así por compatibilidad.
            $table->foreignId('user_id')->nullable()->index(); 
            
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Al revertir, borramos las tres tablas en el mismo orden inverso
        Schema::dropIfExists('usuarios');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};