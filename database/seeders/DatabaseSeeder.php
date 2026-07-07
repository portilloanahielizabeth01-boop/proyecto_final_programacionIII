<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Persona;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Creamos los datos personales (Añadimos DNI y Sexo)
       $personaAdmin = Persona::create([
            'nombre'           => 'Administrador',
            'apellido'         => 'General',
            
            'dni'              => '11111111', 
            'fecha_nacimiento' => '1999-06-18', 
        ]);
        // 2. Creamos su cuenta de usuario vinculada
        Usuario::create([
            'persona_id' => $personaAdmin->id,
            'usuario'    => 'admin@gmail.com',  
            'password'   => Hash::make('admin003'), 
            'rol'        => 'admin',            
        ]);
    }
}