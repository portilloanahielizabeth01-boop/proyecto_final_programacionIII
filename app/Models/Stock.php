<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $table = 'stocks';

    protected $fillable = ['nombre'];

    public function celularesCompatibles()
    {
        return $this->belongsToMany(Celular::class, 'celular_stock', 'stock_id', 'celular_id')
            ->withPivot('cantidad', 'precio_comprado', 'precio_venta', 'descripcion')
            ->withTimestamps();
    }
}
