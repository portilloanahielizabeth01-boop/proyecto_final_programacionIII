<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Mostrar el formulario de Login
    public function showLogin()
    {
        return view('login');
    }

    // Procesar el intento de ingreso
    public function login(Request $request)
    {
        // 1. Validamos los campos del formulario (el input se llama 'email')
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // 2. Intentamos iniciar sesión mapeando a tu base de datos
        // Aquí usamos 'usuario' (en singular) que es el nombre exacto de tu columna
        if (Auth::attempt([
            'usuario' => $credentials['email'], 
            'password' => $credentials['password']
        ])) {
            $request->session()->regenerate();

            
            return redirect()->intended('dashboard');
        }

        // 3. Si falla
        return back()->withErrors([
            'email' => 'Las credenciales no coinciden con nuestros registros.',
        ])->onlyInput('email');
    }

    // Cerrar sesión
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}