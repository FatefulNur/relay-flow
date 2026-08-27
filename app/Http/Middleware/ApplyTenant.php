<?php

namespace App\Http\Middleware;

use App\Services\TenantService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApplyTenant
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        abort_if(! $user = $request->user(), Response::HTTP_UNAUTHORIZED, 'Unauthenticated');

        $organization = null;

        if ($request->hasHeader('X-Tenant-Slug')) {
            $organization = $user->organizations()
                ->where('slug', $request->header('X-Tenant-Slug'))
                ->first();
        }

        if ($organizationSlug = $request->session()->get(TenantService::getSessionKeyFor($user))) {
            $organization = $user->organizations()->where('slug', decrypt($organizationSlug))->first();
        }

        if (! $organization) {
            $organization = $user->organizations()->first();
        }

        abort_if(! $organization, Response::HTTP_UNAUTHORIZED, 'Tenant not found');

        TenantService::set($organization);

        return $next($request);
    }
}
