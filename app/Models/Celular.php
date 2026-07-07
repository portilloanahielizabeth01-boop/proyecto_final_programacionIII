<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Celular extends Model
{
    // 🚀 Le decimos a Laravel el nombre exacto de la tabla en español
    protected $table = 'celulares';

    protected $fillable = ['nombre', 'modelo', 'anio'];

    public function stocksCompatibles()
    {
        return $this->belongsToMany(Stock::class, 'celular_stock', 'celular_id', 'stock_id')
                    ->withPivot('cantidad', 'precio_comprado', 'precio_venta', 'descripcion')
                    ->withTimestamps();
    }
}