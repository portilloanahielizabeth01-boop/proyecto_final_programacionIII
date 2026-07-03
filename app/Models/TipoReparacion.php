<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoReparacion extends Model
{
    use HasFactory;

    protected $fillable = ['tipo'];

    public function reparaciones()
    {
        return $this->hasMany(Reparacion::class);
    }
}