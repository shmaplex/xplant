# Database Schema Overview

## Core Tables

### profiles

Stores user profile data and includes:

- `role` (user, manager, editor, admin)
- `is_banned`
- `onboarding_complete` (used to redirect new users)

### plants

Tracks plant specimens linked to users.

### contamination_logs

Logs contamination issues linked to plants.

### media_recipes

Stores user-generated and system recipes.

### tasks

Simple task management for lab-related workflows.

(See `schema.sql` for the full schema; this documentation only highlights key tables.)

## Relationships

- **profiles.id** → **auth.users.id**
- **plants.user_id** → **auth.users.id**
- **contamination_logs.plant_id** → **plants.id**
- **media_recipes.user_id** → **auth.users.id**
