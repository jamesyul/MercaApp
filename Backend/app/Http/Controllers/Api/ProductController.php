<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Product;

class ProductController extends Controller
{
    // Este método devuelve la lista de productos AGRUPADOS, con el precio MÁS BAJO.
    public function index()
    {
        $products = DB::table('productos as p1')
            ->select('p1.nombre', 'p1.marca', 'p1.imagen as imageUrl', 'p1.idproducto as id',
                DB::raw('(SELECT precio FROM productos p2 WHERE p2.nombre = p1.nombre AND p2.marca = p1.marca ORDER BY p2.precio ASC LIMIT 1) as price')
            )
            ->groupBy('p1.nombre', 'p1.marca', 'p1.imagen', 'p1.idproducto')
            ->orderBy('price', 'asc')
            ->get();

        return response()->json($products);
    }

    // Este método devuelve TODAS las ofertas para un producto lógico.
    public function show($brand, $name)
    {
        $offers = Product::where('nombre', urldecode($name))
            ->where('marca', urldecode($brand))
            ->join('supermercado', 'productos.supermercado', '=', 'supermercado.idsuper')
            ->select('productos.*', 'supermercado.nombre as supermarketName')
            ->orderBy('precio', 'asc')
            ->get();
        
        if ($offers->isEmpty()) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        // Formateamos la respuesta para que coincida con lo que espera el frontend
        $productDetails = [
            'id' => $offers->first()->idproducto,
            'name' => $offers->first()->nombre,
            'brand' => $offers->first()->marca,
            'imageUrl' => $offers->first()->imagen,
            'summary' => 'Descripción detallada del producto vendrá aquí...', // Puedes añadir una columna de descripción
            'offers' => $offers->map(function ($item) {
                return [
                    'supermarket' => $item->supermarketName,
                    'price' => $item->precio,
                    'shipping' => 'Envío y devoluciones gratis', // Lógica a implementar
                    'url' => $item->urlproducto,
                    // 'supermarketLogo' => ...
                ];
            })
        ];

        return response()->json($productDetails);
    }
}