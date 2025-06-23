<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Login extends Model
{
    use HasFactory;

    protected $table = 'login';
    protected $primaryKey = 'idlogin';
    public $timestamps = false;

    protected $fillable = [
        'idusuario',
        'contrasena',
    ];
    
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'contrasena',
    ];

    /**
     * Get the user that owns the login credential.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'idusuario', 'idusuario');
    }
}