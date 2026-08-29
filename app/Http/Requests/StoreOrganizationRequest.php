<?php

namespace App\Http\Requests;

use App\Enums\UserRole;
use App\Models\Organization;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreOrganizationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'organization_name' => ['required', 'string', 'min:3'],
            'organization_slug' => [
                'required',
                'string',
                'min:3',
                Rule::unique(Organization::class, 'slug'),
            ],
            'role' => ['nullable', Rule::enum(UserRole::class)],
        ];
    }
}
