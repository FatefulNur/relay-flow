<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    public function switch(Request $request, Organization $organization): RedirectResponse
    {
        $request->session()->put(
            tenant()->getSessionKeyFor($request->user()),
            $organization->slug
        );

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Organization switched.')]);

        return redirect()->intended(route('dashboard'));
    }
}
