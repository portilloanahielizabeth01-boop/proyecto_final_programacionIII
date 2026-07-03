<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre','descripcion','cantidad',
        'precio_comprado','precio_venta'
    ];

    public function clienteReparaciones()
    {
        return $this->hasMany(ClienteReparacion::class);
    }
}