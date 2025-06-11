<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserListResource extends JsonResource
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
            'username' => $this->username,
            'fullname' => $this->fullname,
            'email' => $this->email,
            'phone' => $this->phone,
            'pivot' => $this->buRoleList(),
            'canDelete' => true,
        ];
    }

    private function buRoleList(): array
    {
        return [
            'bus' => $this->bus->pluck('code')->unique()->toArray(),
            'roles' => $this->roles->pluck('name')->unique()->toArray(),
        ];
    }
}
