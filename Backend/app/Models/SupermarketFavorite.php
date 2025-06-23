<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupermarketFavorite extends Model
{
    use HasFactory;

    protected $table = 'supermercadofavorito';
    protected $primaryKey = 'idfavorito';
    public $timestamps = false;

    protected $fillable = [
        'idsuper',
        'idusuario',
    ];
}