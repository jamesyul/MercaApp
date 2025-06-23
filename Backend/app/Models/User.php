<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'usuario';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'idusuario';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
        'apellido',
        'correo',
    ];

    /**
     * Get the login credential associated with the user.
     */
    public function loginCredential()
    {
        return $this->hasOne(Login::class, 'idusuario', 'idusuario');
    }
    
    /**
     * The supermarkets that the user has favorited.
     */
    public function favoriteSupermarkets()
    {
        return $this->belongsToMany(Supermarket::class, 'supermercadofavorito', 'idusuario', 'idsuper');
    }
}