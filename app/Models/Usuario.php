<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
// 1. Quitamos 'Model' y agregamos 'Authenticatable'
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Persona;

// 2. Cambiamos 'extends Model' por 'extends Authenticatable'
class Usuario extends Authenticatable 
{
    use HasFactory;

    // 3. (Opcional pero recomendado) Escondemos el password para que no viaje en consultas
    protected $hidden = [
        'password',
    ];

    protected $fillable = [
        'persona_id',
        'usuario',
        'password'
    ];

    public function persona()
    {
        return $this->belongsTo(Persona::class);
    }
}