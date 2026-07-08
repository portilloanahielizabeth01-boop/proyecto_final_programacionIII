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
        Schema::table('usuarios', function (Blueprint $table) {
            // Agregamos la columna como nullable (porque los Admin no tendrán empleado)
            $table->foreignId('empleado_id')
                ->nullable()
                ->after('id') // Opcional: la coloca después del ID
                ->constrained('empleados') // Asumiendo que tu tabla se llama 'empleados'
                ->onDelete('set null'); // Si se borra el empleado, el usuario queda como "Admin" o sin perfil
        });
    }

    public function down(): void
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropForeign(['empleado_id']);
            $table->dropColumn('empleado_id');
        });
    }
};
