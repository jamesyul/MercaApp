<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Devuelve la lista de productos AGRUPADOS para la vista de cuadrícula.
     * Cada producto tendrá el precio más bajo y datos adicionales que el frontend necesita.
     */
    public function index()
    {
        // Usamos una subconsulta para encontrar el precio más bajo (min_price) y el más alto (max_price)
        // para cada grupo de producto (nombre y marca).
        $products = DB::table('productos as p1')
            ->select(
                'p1.nombre',
                'p1.marca',
                'p1.imagen as imageUrl',
                'p1.idproducto as id',
                DB::raw('MIN(p1.precio) as price'), // El precio más bajo es el 'price' principal
                DB::raw('MAX(p1.precio) as oldPrice') // El precio más alto como 'oldPrice' para comparación
            )
            ->groupBy('p1.nombre', 'p1.marca', 'p1.imagen', 'p1.idproducto')
            ->orderBy('price', 'asc')
            ->get()
            ->map(function ($product) {
                // Calculamos el descuento si oldPrice es mayor que price
                if ($product->oldPrice > $product->price) {
                    $product->discount = round((($product->oldPrice - $product->price) / $product->oldPrice) * 100);
                } else {
                    // Si los precios son iguales, no hay oldPrice ni descuento.
                    $product->oldPrice = null;
                    $product->discount = null;
                }
                
                // Añadimos datos de rating fijos, ya que no están en la BD.
                $product->rating = round(rand(40, 50) / 10, 1); // Rating aleatorio entre 4.0 y 5.0

                return $product;
            });

        return response()->json($products);
    }

    /**
     * Devuelve los detalles completos y TODAS las ofertas para un producto lógico.
     */
    public function show($brand, $name)
    {
        $decodedName = urldecode($name);
        $decodedBrand = urldecode($brand);

        $offers = Product::where('nombre', $decodedName)
            ->where('marca', $decodedBrand)
            ->join('supermercado', 'productos.supermercado', '=', 'supermercado.idsuper')
            ->select('productos.*', 'supermercado.nombre as supermarketName')
            ->orderBy('precio', 'asc')
            ->get();
        
        if ($offers->isEmpty()) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        // El primer producto de la colección (el más barato) nos sirve de base.
        $baseProduct = $offers->first();
        
        // Formateamos la respuesta para que coincida exactamente con la interfaz ProductDetail de Angular.
        $productDetails = [
            'id' => $baseProduct->idproducto,
            'name' => $baseProduct->nombre,
            'brand' => $baseProduct->marca,
            'imageUrl' => $baseProduct->imagen,
            'summary' => "Encuentra el mejor precio para {$baseProduct->nombre} de la marca {$baseProduct->marca}. Comparamos las ofertas de los principales supermercados para que ahorres en cada compra.",
            
            // --- CAMPOS AÑADIDOS ---
            'price' => $offers->min('precio'),      // El precio más bajo de todas las ofertas.
            'oldPrice' => $offers->max('precio'),   // El precio más alto para mostrar un rango.
            'rating' => round(rand(40, 50) / 10, 1), // Rating aleatorio temporal.
            'reviews' => rand(50, 2000),             // Nº de reseñas aleatorio temporal.
            
            // Mapeamos cada una de las ofertas encontradas.
            'offers' => $offers->map(function ($item) {
                return [
                    'supermarket' => $item->supermarketName,
                    'price' => (float) $item->precio,
                    'shipping' => 'Información de envío no disponible', // Lógica a implementar
                    'url' => $item->urlproducto,
                    // 'supermarketLogo' => ... (se podría añadir una columna 'logo' a la tabla supermercado)
                ];
            })
        ];

        // Si el precio más bajo y más alto son iguales, no tiene sentido mostrar el oldPrice.
        if ($productDetails['price'] === $productDetails['oldPrice']) {
            $productDetails['oldPrice'] = null;
        }

        return response()->json($productDetails);
    }
}