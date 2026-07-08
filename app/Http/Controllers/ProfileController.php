<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Muestra el perfil del usuario autenticado.
     */
    public function show()
    {
        
        $usuario = Auth::user()->load(['empleado.persona']);

        return view('perfil.show', compact('usuario'));
    }
}