<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClienteReparacion extends Model
{
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'empleado_id',
        'celular_id',
        'reparacion_id',
        'stock_id',
        'descripcion',
        'fecha_ingreso',
        'fecha_egreso',
        'precio_final',
        'estado'
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    public function empleado()
    {
        return $this->belongsTo(Empleado::class);
    }

    public function celular()
    {
        return $this->belongsTo(Celular::class);
    }

    public function reparacion()
    {
        return $this->belongsTo(Reparacion::class);
    }

    public function stock()
    {
        return $this->belongsTo(Stock::class);
    }
}