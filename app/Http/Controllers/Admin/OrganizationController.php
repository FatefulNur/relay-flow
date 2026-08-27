<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Services\TenantService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
    public function switch(Request $request, Organization $organization): RedirectResponse
    {
        $request->session()->put(
            TenantService::getSessionKeyFor($request->user()),
            $organization->slug
        );

        return redirect()->intended(route('dashboard'));
    }
}
