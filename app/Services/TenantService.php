<?php
namespace App\Services;

use App\Models\Organization;

class TenantService
{
    private static ?Organization $organization = null;

    public static function getKeyName(): string
    {
        return 'organization_id';
    }

    public static function setTenant(Organization $organization): void
    {
        self::$organization = $organization;
    }

    public static function getKey(): ?string
    {
        return self::$organization?->id;
    }
}
