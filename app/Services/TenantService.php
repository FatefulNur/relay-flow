<?php

namespace App\Services;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Validation\UnauthorizedException;
use Symfony\Component\HttpFoundation\Response;

class TenantService
{
    public function __construct(
        private ?Organization $organization = null,
    ) {
        $this->set($organization);
    }

    public function getKeyName(): string
    {
        return 'organization_id';
    }

    public function getKey(): ?string
    {
        return $this->organization?->id;
    }

    public function set(?Organization $organization = null): self
    {
        $this->organization = $organization;

        return $this;
    }

    public function get(bool $throwOnNull = false): Organization
    {
        if ($this->organization === null && $throwOnNull) {
            throw new UnauthorizedException('Tenant not found', Response::HTTP_UNAUTHORIZED);
        }

        return $this->organization;
    }

    public function getSessionKeyFor(User $user): string
    {
        return sprintf('user_organization:%s:%s', $user->id, $user->email);
    }
}
