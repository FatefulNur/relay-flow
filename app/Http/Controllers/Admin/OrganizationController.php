<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrganizationRequest;
use App\Models\Organization;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class OrganizationController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('organizations/create');
    }

    public function store(StoreOrganizationRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::transaction(function () use ($input, $request) {
            $organization = Organization::create([
                'name' => $input['organization_name'],
                'slug' => $input['organization_slug'],
            ]);

            $request->user()->organizations()->attach($organization, [
                'role' => UserRole::OWNER->value,
            ]);
        });

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Organization created')]);

        return to_route('dashboard');
    }

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
