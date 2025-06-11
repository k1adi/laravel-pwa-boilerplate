<?php

namespace App\Models;

use App\Models\Permission;
use App\Traits\HasAdvancedFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasAdvancedFilter, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'fullname',
        'email',
        'phone',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * The attributes that column can be filtered with relation.
     *
     * @var array<string, string>
     */
    protected $filterable = [ 
        'username',
        'fullname',
        'email',
        'phone',
    ];

    public function setPasswordAttribute($value)
    {
        if ($value) {
            $this->attributes['password'] = Hash::needsRehash($value) ? Hash::make($value) : $value;
        }
    }

    public function bus(): BelongsToMany
    {
        return $this->belongsToMany(Bu::class, 'user_bu_roles', 'user_id', 'bu_id')
                    ->withPivot('role_id')
                    ->using(UserBuRole::class);
    }
    
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'user_bu_roles', 'user_id', 'role_id')
                    ->withPivot('bu_id')
                    ->using(UserBuRole::class);
    }

    public function buRoles(): HasMany
    {
        return $this->hasMany(UserBuRole::class);
    }

    public function grantPermission($buId = null)
    {
        // Use the provided BU ID or default to the session value
        $buId = $buId ?? Session::get('bu_id');
        
        // If no BU ID is provided or in session, try to get the first BU associated with the user
        if (!$buId) {
            $userBuRole = DB::table('user_bu_roles')
                ->where('user_id', $this->id)
                ->first();
                
            if ($userBuRole) {
                $buId = $userBuRole->bu_id;
                // Store in session for future use
                Session::put('bu_id', $buId);
            } else {
                // No business unit found for this user
                return collect([]);
            }
        }

        return Permission::query()
            ->whereHas('relatedRole', function ($query) use ($buId) {
                $query->whereIn('roles.id', function ($subQuery) use ($buId) {
                    $subQuery->select('role_id')
                        ->from('user_bu_roles')
                        ->where('bu_id', $buId)
                        ->where('user_id', $this->id);
                });
            })
            ->pluck('name');
    }

    public function syncBuRoles(array $pivots): void
    {
        $syncData = [];

        foreach($pivots as $item) {
            $buId = $item['bu_id'];

            if(!isset($syncData[$buId])) {
                $syncData[$buId] = ['role_id' => []];
            }

            foreach($item['role_id'] as $role) {
                if (!in_array($role, $syncData[$buId]['role_id'])) {
                    $syncData[$buId]['role_id'][] = $role;
                    $this->bus()->attach([
                        $buId => ['role_id' => $role]
                    ]);
                }
            }
        }
    }

    public function groupRoleByBU(): Collection
    {
        return $this->roles->groupBy('pivot.bu_id')->map(function ($roles, $buId) {
            return [
                'bu' => optional($this->bus->firstWhere('id', $buId))->only(['id', 'name']),
                'roles' => $roles->map(fn($role) => ['id' => $role->id, 'name' => $role->name])
            ];
        })->values();
    }
}
