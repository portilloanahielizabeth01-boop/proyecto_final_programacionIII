<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre','apellido','fecha_nacimiento','dni'
    ];

    public function contactos()
    {
        return $this->hasMany(Contacto::class);
    }

    public function usuario()
    {
        return $this->hasOne(Usuario::class);
    }

    public function empleado()
    {
        return $this->hasOne(Empleado::class);
    }

    public function cliente()
    {
        return $this->hasOne(Cliente::class);
    }
}