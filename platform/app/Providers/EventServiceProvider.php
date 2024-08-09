<?php

namespace App\Providers;

class EventServiceProvider extends \Illuminate\Foundation\Support\Providers\EventServiceProvider
{
    protected $listen = [
        \SocialiteProviders\Manager\SocialiteWasCalled::class => [
            // ... other providers
            \SocialiteProviders\Twitch\TwitchExtendSocialite::class . '@handle',
        ],
    ];
}
