<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Aquí definimos todas las rutas para nuestra aplicación, incluyendo la API.
| Para la API, usaremos un prefijo '/api' para mantener la organización.
|
*/

// Agrupamos todas nuestras rutas de API bajo el prefijo '/api'
Route::prefix('api')->group(function () {
    
    // --- Rutas Públicas (no requieren autenticación) ---
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // Rutas de productos
    Route::get('/products', [ProductController::class, 'index']);
    
    // ¡LÍNEA CORREGIDA! Se cambió Route. por Route:: y .class por ::class
    Route::get('/products/details/{brand}/{name}', [ProductController::class, 'show']);


    // --- Rutas Protegidas (requieren token) ---
    // Asegúrate de que tu AuthController tenga un método 'user' o usa la clausura
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
        // Futuras rutas protegidas aquí...
    });

});

// Esta es una ruta raíz de bienvenida, útil para verificar que el backend funciona.
Route::get('/', function () {
    return response()->json(['message' => 'Plick API está funcionando correctamente.']);
});