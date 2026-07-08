<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
// Heredamos de Authenticatable en lugar del Model común de Eloquent
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Persona;

class Usuario extends Authenticatable
{
    use HasFactory;

    // Nombre de tu tabla personalizada si Laravel no la deduce automáticamente
    protected $table = 'usuarios';

    /**
     * Los atributos que se pueden asignar de forma masiva.
     */
    protected $fillable = [
        'persona_id',
        'usuario',
        'password',
        'rol'
    ];

    /**
     * Los atributos que deben ocultarse en las serializaciones (consultas JSON/API).
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function empleado()
    {
        // Relación con el modelo Empleado
        return $this->belongsTo(Empleado::class, 'empleado_id');
    }
    public function historialClientes()
{
    return $this->hasMany(HistorialCliente::class);
}
}
