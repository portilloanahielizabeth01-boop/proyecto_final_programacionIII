<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistorialCliente extends Model
{
    protected $table = 'historial_clientes';

    protected $fillable = [
        'cliente_id',
        'usuario_id',
        'accion',
        'detalles'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }
}
