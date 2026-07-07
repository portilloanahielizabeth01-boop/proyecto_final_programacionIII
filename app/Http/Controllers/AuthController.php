<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Muestra el formulario de inicio de sesión
     */
    public function showLogin()
    {
        return view('login');
    }

    /**
     * Procesa el intento de ingreso al sistema
     */
    public function login(Request $request)
    {
        // 1. Validamos los campos que llegan desde la vista de login (donde el input se llama 'email')
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ], [
            'email.required'    => 'El correo electrónico es obligatorio.',
            'email.email'       => 'El formato del correo electrónico no es válido.',
            'password.required' => 'La contraseña es obligatoria.',
        ]);

        /**
         * 2. Intentamos iniciar sesión mapeando los datos.
         * Mapeamos lo que el usuario escribió en 'email' hacia tu columna 'usuario' de la base de datos.
         * Laravel tomará automáticamente el password, lo encriptará y lo comparará en la tabla.
         */
        if (Auth::attempt([
            'usuario'  => $credentials['email'], 
            'password' => $credentials['password']
        ])) {
            // Si las credenciales son correctas, regeneramos la sesión por seguridad
            $request->session()->regenerate();

            // Redirige al dashboard o a la ruta que intentaba entrar antes de ser bloqueado
            return redirect()->intended('dashboard');
        }

        // 3. Si la autenticación falla, regresamos al formulario con el error
        return back()->withErrors([
            'email' => 'Las credenciales no coinciden con nuestros registros.',
        ])->onlyInput('email');
    }

    /**
     * Destruye la sesión del usuario (Cerrar sesión)
     */
    public function logout(Request $request)
    {
        Auth::logout();

        // Invalidamos la sesión actual y recreamos el token CSRF para prevenir ataques
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}