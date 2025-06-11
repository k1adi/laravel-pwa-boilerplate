<?php

namespace App\Models;

use App\Traits\HasAdvancedFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    use HasAdvancedFilter;
    protected $fillable = ['name'];
    protected $filterable = ['name'];

    public function hasPermissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class,
            'role_permissions',
            'role_id',
            'permission_id'
        );
    }
}
