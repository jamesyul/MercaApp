<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PriceHistory extends Model
{
    use HasFactory;

    protected $table = 'historialprecios';
    protected $primaryKey = 'idhistorial';
    public $timestamps = false;

    protected $fillable = [
        'Date',
        'precio',
        'idproducto',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'Date' => 'date',
    ];

    /**
     * Get the product that owns the price history record.
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'idproducto', 'idproducto');
    }
}