<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('user_edit');
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
            'username' => ['required', 'string', 'max:25', Rule::unique('users')->ignore($id)],
            'fullname' => ['required', 'string', 'max:60'],
            'email' => ['required', 'string', 'max:50', Rule::unique('users')->ignore($id)],
            'phone' => ['required', 'string', 'max:16', Rule::unique('users')->ignore($id)],
            'password' => ['nullable', 'string'],

            'pivots' => ['required', 'array', 'min:1'],
            'pivots.*.bu_id' => ['required', 'integer', 'exists:bus,id'],
            'pivots.*.role_id' => ['required', 'array', 'min:1'],
            'pivots.*.role_id.*' => ['required', 'integer', 'exists:roles,id'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'pivots.required' => 'User must have at least one role in one business unit.',
            'pivots.min' => 'User must have at least one role in one business unit.',
            'pivots.*.bu_id.required' => 'Business Unit field is required.',
            'pivots.*.bu_id.integer' => 'Business Unit must be a valid id.',
            'pivots.*.bu_id.exists' => 'Business Unit does not exist.',
            'pivots.*.role_id.required' => 'Role field is required.',
            'pivots.*.role_id.min' => 'At least one role must be selected.',
            'pivots.*.role_id.*.exists' => 'One or more selected roles does not exist.',
        ];
    }
}
