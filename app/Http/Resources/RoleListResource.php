<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoleListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'permissions' => $this->collectPermission(),
            'canDelete' => true, // as a default role can delete
        ];
    }

    private function collectPermission()
    {
        return $this->hasPermissions->pluck('name')->toArray();
    }
}
