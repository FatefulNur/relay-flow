<?php

namespace App\Http\Middleware;

use App\Services\TenantService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApplyTenant
{
    public function __construct(
        private TenantService $tenantService,
    ) {}

    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        abort_if(! $user = $request->user(), Response::HTTP_UNAUTHORIZED, 'Unauthenticated');

        $organization = null;
        $sessionKey = $this->tenantService->getSessionKeyFor($user);
        $sessionSlug = $request->session()->get($sessionKey);

        // Matching organization strategy
        $organization = match (true) {
            $request->route()->hasParameter('organization') => $request->route('organization'),
            $request->session()->has($sessionKey)           => $user
                ->organizations()
                ->where('slug', $sessionSlug)
                ->first(),
            default => $user->organizations()->first(),
        };

        abort_if(! $organization, Response::HTTP_UNAUTHORIZED, 'Tenant not found');

        // Avoid organization switching twice in a single request
        if ($sessionSlug !== $organization->slug) {
            $request->session()->put($sessionKey, $organization->slug);
        }

        app()->singleton('tenant', function () use ($organization) {
            return $this->tenantService->set($organization);
        });

        return $next($request);
    }
}
