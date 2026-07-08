<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable = [
        'persona_id',
        'empleado_id',
        'fecha_ingreso'
    ];


    public function persona()
    {
        return $this->belongsTo(Persona::class, 'persona_id');
    }


    public function contactos()
    {
        return $this->hasManyThrough(
            Contacto::class,
            Persona::class,
            'id',          // llave primaria de personas
            'persona_id',  // llave foránea en contactos
            'persona_id',  // llave en clientes
            'id'           // llave primaria en personas
        );
    }


    public function usuarioCreador()
    {
        return $this->belongsTo(Usuario::class, 'empleado_id');
    }


    public function historial()
    {
        return $this->hasMany(HistorialCliente::class);
    }
}
