<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Celular extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre','modelo','anio'
    ];

    public function reparaciones()
    {
        return $this->hasMany(ClienteReparacion::class);
    }
}