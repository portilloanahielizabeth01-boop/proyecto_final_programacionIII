<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditoriaArreglo extends Model
{
    protected $fillable = [
        'arreglo_id', 'user_id', 'accion', 'valores_antes', 'valores_despues'
    ];

    // Relación con el Usuario
    public function user()
    {
        return $this->belongsTo(Usuario::class, 'user_id', 'id');
    }

    // Relación con el Arreglo
    public function arreglo()
    {
        return $this->belongsTo(Arreglo::class, 'arreglo_id', 'id');
    }
}