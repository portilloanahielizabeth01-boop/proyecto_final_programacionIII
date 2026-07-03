<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $fillable = [
        'persona_id','usuario','password'
    ];

    public function persona()
    {
        return $this->belongsTo(Persona::class);
    }
}