<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserBuRole extends Pivot
{
    protected $table = 'user_bu_roles';
    protected $foreignKey = 'user_id';
    protected $relatedKey = 'bu_id';
    public $timestamps = false;

    // Define the third foreign key
    // Default value, can be null or any default 
    protected $attributes = [ 'role_id' => null ]; 

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    
    public function bu(): BelongsTo
    {
        return $this->belongsTo(Bu::class, 'bu_id', 'id');
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'role_id', 'id');
    }
}
