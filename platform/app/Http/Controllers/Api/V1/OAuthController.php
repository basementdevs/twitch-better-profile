<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use ChrisReedIO\Socialment\Exceptions\AbortedLoginException;
use ChrisReedIO\Socialment\Facades\Socialment;
use ChrisReedIO\Socialment\Models\ConnectedAccount;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class OAuthController extends Controller
{
    public function authenticateWithOAuth(Request $request, string $provider)
    {
        \Log::alert('Provider: ' . $provider, $request->all());
        $socialUser = Socialite::driver($provider)
            ->stateless()
            ->user();

        $tokenExpiration = match ($provider) {
            'azure' => now()->addSeconds($socialUser->expiresIn),
            default => null,
        };

        // Create a user or log them in...
        $connectedAccount = ConnectedAccount::firstOrNew([
            'provider' => $provider,
            'provider_user_id' => $socialUser->getId(),
        ], [
            'name' => $socialUser->getName(),
            'nickname' => $socialUser->getNickname(),
            'email' => $socialUser->getEmail(),
            'avatar' => $socialUser->getAvatar(),
            'token' => $socialUser->token,
            'refresh_token' => $socialUser->refreshToken,
            'expires_at' => $tokenExpiration,
        ]);

        if (! $connectedAccount->exists) {
            // Check for an existing user with this email
            // Create a new user if one doesn't exist
            $user = Socialment::createUser($connectedAccount);

            if ($user === null) {
                throw new AbortedLoginException('This account is not authorized to log in.');
            }

            // Associate the user and save this connected account
            $connectedAccount->user()->associate($user)->save();
        } else {
            // Update the connected account with the latest data
            $connectedAccount->update([
                'name' => $socialUser->getName(),
                'nickname' => $socialUser->getNickname(),
                'email' => $socialUser->getEmail(),
                'avatar' => $socialUser->getAvatar(),
                'token' => $socialUser->token,
                'refresh_token' => $socialUser->refreshToken,
                'expires_at' => $tokenExpiration,
            ]);
        }
        // AccessToken
        $accessToken = $connectedAccount
            ->user
            ->createToken('authToken', ['*'], now()->addWeek())
            ->plainTextToken;


        return response()->json([
            'access_token' => $accessToken,
            'token_type' => 'Bearer',
            'expires_at' => now()->addWeek(),
            'user' => $connectedAccount->user,
        ]);
    }
}
