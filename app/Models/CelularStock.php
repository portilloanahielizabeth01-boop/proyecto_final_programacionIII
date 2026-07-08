<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CelularStock extends Model
{
    use HasFactory;

    protected $table = 'celular_stock';

    protected $fillable = [
        'celular_id',
        'stock_id',
        'precio_comprado',
        'precio_venta',
        'cantidad',
        'descripcion'
    ];
}