# Authentication & Onboarding Flow

## Auth Flow

1. User signs in via Supabase Auth.
2. Next.js `/auth/callback` route:
   - Calls `supabase.auth.getUser()` (server-validated)
   - Fetches `profiles.onboarding_complete`
   - Redirects to `/onboarding` if false, otherwise `/dashboard`.

## Seeding New Users

- The stored procedure `seed_new_user(user_uuid)` can be called to populate default data.
- This is triggered after login but before onboarding.

## Onboarding Steps

1. Choose between:
   - **Blank dashboard**
   - **Pre-populated mock data**
2. Optionally provide additional profile preferences.
3. Mark `profiles.onboarding_complete = true`.

## Why `getUser()` Instead of `getSession()`?

- `getUser()` verifies the JWT with Supabase servers.
- `getSession()` just reads the client state, which could be stale or tampered with.
