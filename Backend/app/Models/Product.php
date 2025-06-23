<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'productos';
    protected $primaryKey = 'idproducto';
    public $timestamps = false;

    protected $fillable = [
        'idinterno',
        'nombre',
        'precio',
        'preciounidad',
        'imagen',
        'supermercado', // Este es un id, lo relacionaremos
        'categoria',
        'marca',
        'urlproducto',
    ];

    /**
     * Get the supermarket that offers this product.
     */
    public function supermarket()
    {
        return $this->belongsTo(Supermarket::class, 'supermercado', 'idsuper');
    }

    /**
     * Get the price history for the product.
     */
    public function priceHistory()
    {
        return $this->hasMany(PriceHistory::class, 'idproducto', 'idproducto');
    }
}