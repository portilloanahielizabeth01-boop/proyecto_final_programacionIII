<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Persona;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Creamos los datos personales del Administrador
        $personaAdmin = Persona::create([
            'nombre' => 'Administrador',
            'apellido' => 'General',
            'fecha_nacimiento' => '1999-06-18', // Pon una fecha cualquiera
        ]);

        // 2. Creamos su cuenta de usuario vinculada a esa persona
        Usuario::create([
            'persona_id' => $personaAdmin->id,
            'usuario' => 'admin@correo.com',          // <-- CORREO POR DEFECTO
            'password' => Hash::make('admin003'), // <-- CONTRASEÑA POR DEFECTO
            'rol' => 'admin',                        // <-- ROL DE ADMIN
        ]);
    }
}