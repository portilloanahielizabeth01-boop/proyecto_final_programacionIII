<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoContacto extends Model
{
    use HasFactory;

    protected $fillable = ['descripcion'];

    public function contactos()
    {
        return $this->hasMany(Contacto::class);
    }
}