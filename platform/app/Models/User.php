<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use ChrisReedIO\Socialment\Models\ConnectedAccount;
use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasAvatar;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements FilamentUser, HasAvatar
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'is_admin',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
        ];
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return app()->isProduction() ? $this->is_admin : true;
    }

    public function getFilamentAvatarUrl(): ?string
    {

        $cachedAvatar = cache()->remember("user-{$this->id}-avatar", now()->addMinutes(5), function () {
            $twitchUser = $this->accounts()->where('provider', '=' , 'twitch')->first();

            return $twitchUser->avatar;
        });

        return $cachedAvatar ?? null;
    }

    public function accounts(): HasMany
    {
        return $this->hasMany(ConnectedAccount::class);
    }
}
