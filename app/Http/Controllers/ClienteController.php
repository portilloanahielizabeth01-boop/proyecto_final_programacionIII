<?php

namespace App\Http\Controllers;

use App\Models\{Cliente, Persona, Contacto, HistorialCliente};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClienteController extends Controller
{
    public function index(Request $request)
    {
        $query = Cliente::with([
            'persona',
            'contactos'
        ]);

        if ($request->has('q') && $request->q != '') {

            $query->whereHas('persona', function ($q) use ($request) {
                $q->where('nombre', 'like', "%{$request->q}%")
                    ->orWhere('apellido', 'like', "%{$request->q}%")
                    ->orWhere('dni', 'like', "%{$request->q}%");
            });
        }

        $clientes = $query->latest()->paginate(10);


        // Historial para la pestaña de historial
        $historial = HistorialCliente::with([
            'usuario',
            'cliente.persona'
        ])
            ->latest()
            ->paginate(10);


        return view('clientes.index', compact(
            'clientes',
            'historial'
        ));
    }
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => [
                'required',
                'string',
                'max:50'
            ],

            'apellido' => [
                'required',
                'string',
                'max:50'
            ],

            'dni' => [
                'required',
                'digits_between:7,8',
                'numeric',
                'unique:personas,dni'
            ],

            'telefono' => [
                'required',
                'regex:/^(?:(?:\+54|54)?\s?9?\s?\d{2,4}\s?\d{6,8})$/'
            ],

        ], [
            'nombre.required' => 'El nombre es obligatorio.',
            'apellido.required' => 'El apellido es obligatorio.',

            'dni.required' => 'El DNI es obligatorio.',
            'dni.numeric' => 'El DNI debe contener solo números.',
            'dni.digits_between' => 'El DNI debe tener entre 7 y 8 números.',
            'dni.unique' => 'El DNI ya se encuentra registrado.',

            'telefono.required' => 'El teléfono es obligatorio.',
            'telefono.regex' => 'Ingrese un número de teléfono argentino válido.'
        ]);
        DB::transaction(function () use ($request) {

            // 1. Crear persona
            $persona = Persona::create($request->only('nombre', 'apellido', 'dni'));

            // 2. Crear cliente asignado al empleado autenticado (o el que corresponda)
            $cliente = Cliente::create([
                'persona_id'  => $persona->id,
                'usuario_id' => auth()->id(),
                'fecha_ingreso' => now()
            ]);

            // 3. Contactos
            Contacto::create([
                'persona_id' => $persona->id,
                'tipo_contacto_id' => 2,
                'valor' => $request->telefono
            ]);



            // 4. Historial (Solo si es admin)
            HistorialCliente::create([
                'cliente_id' => $cliente->id,
                'usuario_id' => auth()->id(),
                'accion'     => 'Alta de Cliente',
                'detalles'   => 'Cliente registrado.'
            ]);
        });

        return redirect()->route('clientes.index')->with('success', 'Cliente registrado.');
    }
    public function update(Request $request, $id)
    {

        $cliente = Cliente::with(['persona.contactos'])->findOrFail($id);



        $request->validate([

            'nombre' => [
                'required',
                'string',
                'max:50'
            ],

            'apellido' => [
                'required',
                'string',
                'max:50'
            ],

            'dni' => [
                'required',
                'digits_between:7,8',
                'numeric'
            ],

            'telefono' => [
                'required',
                'regex:/^(?:(?:\+54|54)?\s?9?\s?\d{2,4}\s?\d{6,8})$/'
            ],

        ], [

            'nombre.required' => 'El nombre es obligatorio.',
            'apellido.required' => 'El apellido es obligatorio.',

            'dni.required' => 'El DNI es obligatorio.',
            'dni.numeric' => 'El DNI debe contener solo números.',
            'dni.digits_between' => 'El DNI debe tener entre 7 y 8 números.',
            'dni.unique' => 'El DNI ya se encuentra registrado.',

            'telefono.required' => 'El teléfono es obligatorio.',
            'telefono.regex' => 'Ingrese un número de teléfono argentino válido.'

        ]);
        DB::transaction(function () use ($request, $cliente) {

            // Actualizar persona
            $cliente->persona->update([
                'nombre'   => $request->nombre,
                'apellido' => $request->apellido,
                'dni'      => $request->dni
            ]);

            // Actualizar teléfono
            $telefono = $cliente->persona->contactos()->first();

            if ($telefono) {
                $telefono->update([
                    'valor' => $request->telefono
                ]);
            } else {
                Contacto::create([
                    'persona_id' => $cliente->persona->id,
                    'valor'      => $request->telefono
                ]);
            }

            // Registrar historial
            HistorialCliente::create([
                'cliente_id' => $cliente->id,
                'usuario_id' => auth()->id(),
                'accion'     => 'Edición',
                'detalles'   => 'Se actualizaron los datos del cliente.'
            ]);
        });

        return redirect()
    ->route('clientes.index')
    ->with('success', 'Cliente actualizado correctamente.');
    }
}
