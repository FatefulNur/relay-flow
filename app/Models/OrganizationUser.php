<?php

namespace App\Models;

use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\Pivot;

#[Fillable(['organization_id', 'user_id', 'role'])]
class OrganizationUser extends Pivot
{
    protected function casts(): array
    {
        return [
            'role' => UserRole::class,
        ];
    }
}
