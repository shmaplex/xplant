# Security Considerations

## Authentication

- We use `supabase.auth.getUser()` for sensitive operations to validate the user's token with Supabase.
- `supabase.auth.getSession()` is used only for UI purposes, never for access control.

## Authorization

- Role-based checks are enforced in:
  - Next.js middleware
  - Server-side route handlers
- Protected routes:
  - `/dashboard` → accessible to `admin`, `manager`, `editor`, `user`
  - `/admin` → accessible only to `admin`

## Role Storage

- User roles are stored in the `profiles.role` column.
- Example roles: `user`, `manager`, `editor`, `admin`.

## Onboarding

- New users (where `onboarding_complete = false`) are redirected to `/onboarding`.
- After completing onboarding, this flag is set to `true`.

## Logout

- Logout triggers a state refresh to hide user menus and protected components.

## Data Access

- Row-level security (RLS) can be enabled in Supabase to restrict table access.
- Foreign key constraints ensure data integrity.

## Secure Image Loading

- Next.js `remotePatterns` is used instead of `images.domains`.
- Only trusted sources (like DiceBear) are allowed.
