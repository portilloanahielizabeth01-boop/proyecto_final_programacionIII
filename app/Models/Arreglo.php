<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Arreglo extends Model
{
    use HasFactory;

    protected $table = 'arreglos';

    protected $fillable = [
        'cliente_id',
        'mano_obra_id',
        'stock_id',
        'total',
        'estado'
    ];

    /**
     * El arreglo pertenece a un cliente.
     */
    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }

    /**
     * El arreglo utiliza un tipo de mano de obra/servicio.
     */
    public function manoObra()
    {
        return $this->belongsTo(ManoObra::class, 'mano_obra_id');
    }

    /**
     * El arreglo puede usar un repuesto del inventario (puede ser null).
     */
    public function stock()
    {
        return $this->belongsTo(Stock::class, 'stock_id');
    }
    public function auditorias()
    {
        return $this->hasMany(AuditoriaArreglo::class, 'arreglo_id')->latest();
    }
}
