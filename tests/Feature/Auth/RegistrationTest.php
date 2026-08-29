<?php

use App\Enums\UserRole;
use App\Models\Organization;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::registration());
});

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('new users can register', function () {
    $response = $this->post(route('register.store'), [
        'name'                  => 'Test User',
        'email'                 => 'test@example.com',
        'password'              => 'password',
        'password_confirmation' => 'password',
        'organization_name'     => 'Test Org',
        'organization_slug'     => 'test-org',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));

    $organization = Organization::query()->where('slug', 'test-org')->firstOrFail();

    expect($organization->name)->toBe('Test Org')
        ->and(
            $organization->users()->whereKey(auth()->id())->first()
        )->not->toBeNull()
        ->and($organization->users()->first()->pivot->role)->toBe(UserRole::OWNER);
});

test('registration requires an organization name', function () {
    $response = $this->from(route('register'))->post(route('register.store'), [
        'name'                  => 'Test User',
        'email'                 => 'test@example.com',
        'password'              => 'password',
        'password_confirmation' => 'password',
        'organization_slug'     => 'test-org',
    ]);

    $response->assertRedirect(route('register'));
    $response->assertSessionHasErrors('organization_name');
    $this->assertGuest();
});
