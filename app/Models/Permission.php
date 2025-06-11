<?php

namespace App\Models;

use App\Traits\HasAdvancedFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Permission extends Model
{
    use HasAdvancedFilter;
    protected $fillable = ['name'];
    protected $filterable = ['name'];

    public function relatedRole(): BelongsToMany
    {
        return $this->belongsToMany(Role::class,
            'role_permissions',
            'permission_id',
            'role_id'
        );
    }
}
