<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('profile_edit');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('user');

        return [
            'username' => ['required', 'string', 'max:30', Rule::unique('users')->ignore($id)],
            'fullname' => ['required', 'string', 'max:75'],
            'email' => ['required', 'string', 'max:50', Rule::unique('users')->ignore($id)],
            'phone' => ['required', 'string', 'max:16', Rule::unique('users')->ignore($id)],
            'password' => ['nullable', 'string'],
        ];
    }
}
