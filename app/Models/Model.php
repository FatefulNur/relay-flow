<?php

namespace App\Models;

use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Model as BaseModel;
use Override;

#[ScopedBy(TenantScope::class)]
class Model extends BaseModel
{
    #[Override]
    protected static function booted()
    {
        static::creating(function (Model $model) {
            $model->attributes[tenant()->getKeyName()] = tenant()->getKey();
        });
    }
}
