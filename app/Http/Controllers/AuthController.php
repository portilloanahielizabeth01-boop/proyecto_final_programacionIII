<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Mostrar el formulario de Login
    public function showLogin()
    {
        return view('auth.login');
    }

    // Procesar el intento de ingreso
    public function login(Request $request)
    {
        // Validamos que completen los campos
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Intentamos iniciar sesión
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            // Si entra bien, lo mandamos a la lista de clientes
            return redirect()->intended('clientes');
        }

        // Si se equivoca, lo mandamos atrás con un error
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