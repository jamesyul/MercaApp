<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Login;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'correo' => 'required|string|email|max:255|unique:usuario,correo',
            'contrasena' => 'required|string|min:8',
        ]);

        $user = User::create([
            'nombre' => $request->nombre,
            'correo' => $request->correo,
        ]);

        Login::create([
            'idusuario' => $user->idusuario,
            'contrasena' => Hash::make($request->contrasena)
        ]);

        return response()->json(['message' => 'Usuario registrado con éxito'], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'correo' => 'required|email',
            'contrasena' => 'required',
        ]);

        $user = User::where('correo', $request->correo)->first();

        if (! $user) {
            throw ValidationException::withMessages(['correo' => ['Credenciales incorrectas.']]);
        }

        $loginCredential = $user->loginCredential;

        if (! $loginCredential || ! Hash::check($request->contrasena, $loginCredential->contrasena)) {
            throw ValidationException::withMessages(['correo' => ['Credenciales incorrectas.']]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
    
    public function user(Request $request)
    {
        return $request->user();
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Sesión cerrada con éxito']);
    }
}