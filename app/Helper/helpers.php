<?php

use App\Models\Bu;
use App\Models\Permission;
use App\Models\Role;

if (!function_exists('addDotsCurrency')) {
    function addDotsCurrency($value)
    {
        return $value ? number_format($value, 0, '', '.') : '';
    }
}

if (!function_exists('formatPhoneNumber')) {
    function formatPhoneNumber(string $phone): string
    {
        // Remove all non-numeric characters
        $phone = preg_replace('/[^0-9]/', '', $phone);
    
        // If the number starts with '0', replace it with '62'
        if (substr($phone, 0, 1) === '0') {
            $phone = '62' . substr($phone, 1);
        }
    
        // If the number starts with '+62', remove the '+' and ensure it starts with '62'
        if (substr($phone, 0, 3) === '620') {
            $phone = '62' . substr($phone, 3);
        }
    
        return $phone;
    }
}

if (!function_exists('buSelectOption')) {
    function buSelectOption()
    {
        return Bu::all(['id', 'name'])->map(function ($data) {
            return [
                'value' => $data->id,
                'label' => $data->name,
            ];
        })->toArray();
    }
}

if (!function_exists('roleSelectOptions')) {
    function roleSelectOptions()
    {
        return Role::all(['id', 'name'])->map(function ($data) {
            return [
                'value' => $data->id,
                'label' => $data->name,
            ];
        })->toArray();
    }
}

if (!function_exists('permissionSelectOptions')) {
    function permissionSelectOptions()
    {
        return Permission::all(['id', 'name'])->map(function ($data) {
            return [
                'value' => $data->id,
                'label' => $data->name,
            ];
        })->toArray();
    }
}