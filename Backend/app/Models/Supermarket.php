<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supermarket extends Model
{
    use HasFactory;

    protected $table = 'supermercado';
    protected $primaryKey = 'idsuper';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
    ];

    /**
     * Get the products offered by the supermarket.
     */
    public function products()
    {
        return $this->hasMany(Product::class, 'supermercado', 'idsuper');
    }
}