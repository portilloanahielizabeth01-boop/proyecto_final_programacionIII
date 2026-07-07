<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistorialStock extends Model
{
    protected $table = 'historial_stocks';
    
    protected $fillable = ['stock_id', 'usuario_id', 'accion', 'detalles'];

    // Relación con el usuario que hizo el cambio
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    // Relación con el componente
    public function stock()
    {
        return $this->belongsTo(Stock::class, 'stock_id');
    }
}