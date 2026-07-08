<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManoObra extends Model
{
    use HasFactory;

    protected $table = 'mano_obras';

    protected $fillable = [
        'nombre',
        'precio'
    ];

    /**
     * Una mano de obra (servicio) puede estar en muchos arreglos.
     */
    public function arreglos()
    {
        return $this->hasMany(Arreglo::class, 'mano_obra_id');
    }
}