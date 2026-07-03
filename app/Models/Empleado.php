<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    use HasFactory;

    protected $fillable = [
        'persona_id','codigo'
    ];

    public function persona()
    {
        return $this->belongsTo(Persona::class);
    }

    public function reparaciones()
    {
        return $this->hasMany(ClienteReparacion::class);
    }
}
