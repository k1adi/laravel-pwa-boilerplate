<?php

namespace App\Models;

use App\Traits\HasAdvancedFilter;
use Illuminate\Database\Eloquent\Model;

class Bu extends Model
{
    use HasAdvancedFilter;
    protected $fillable = [
        'code',
        'name'
    ];

    protected $filterable = [
        'code',
        'name'
    ];
}
