<?php

namespace App\Services;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Validation\UnauthorizedException;
use Symfony\Component\HttpFoundation\Response;

class TenantService
{
    private static ?Organization $organization = null;

    public static function getKeyName(): string
    {
        return 'organization_id';
    }

    public static function getKey(): ?string
    {
        return self::$organization?->id;
    }

    public static function set(Organization $organization): void
    {
        self::$organization = $organization;
    }

    public static function get(bool $throwOnNull = false): Organization
    {
        if (self::$organization === null && $throwOnNull) {
            throw new UnauthorizedException('Tenant not found', Response::HTTP_UNAUTHORIZED);
        }

        return self::$organization;
    }

    public static function getSessionKeyFor(User $user): string
    {
        return sprintf('user_organization:%s:%s', $user->id, $user->email);
    }
}
