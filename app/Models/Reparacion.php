<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reparacion extends Model
{
    use HasFactory;

    protected $fillable = [
        'descripcion',
        'tipo_reparacion_id'
    ];

    public function tipo()
    {
        return $this->belongsTo(TipoReparacion::class, 'tipo_reparacion_id');
    }

    public function clienteReparaciones()
    {
        return $this->hasMany(ClienteReparacion::class);
    }
}