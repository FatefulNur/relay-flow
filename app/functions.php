<?php

use App\Models\Organization;
use App\Services\TenantService;

if (! function_exists('tenant')) {
    function tenant(?Organization $organization = null): ?TenantService
    {
        return app()->bound('tenant') ? app()->make('tenant', $organization ?? []) : null;
    }
}
