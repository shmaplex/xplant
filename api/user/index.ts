// @/api/user.ts
import { createClient } from "@/lib/supabase/server";

// Get current authenticated user from Supabase auth
export async function getCurrentUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

export async function getCurrentUserId() {
  const user = await getCurrentUser();
  return user?.id || null;
}

export async function getUserProfileByUsername(
  username: string,
  options?: {
    include?: ("plants" | "media_recipes" | "contamination_logs")[];
  }
) {
  const supabase = await createClient();

  // Use maybeSingle so it won't throw when no rows are found
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  // If there's an error unrelated to "no rows", handle it
  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  // No matching profile
  if (!profile) {
    return null;
  }

  const id = profile.id;

  // Related data fetching
  let plants: any[] = [];
  let media_recipes: any[] = [];
  let contamination_reports: any[] = [];

  if (options?.include?.includes("plants")) {
    const { data } = await supabase
      .from("plants")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false });
    plants = data || [];
  }

  if (options?.include?.includes("media_recipes")) {
    const { data } = await supabase
      .from("media_recipes")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false });
    media_recipes = data || [];
  }

  if (options?.include?.includes("contamination_logs")) {
    const { data } = await supabase
      .from("contamination_logs")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false });
    contamination_reports = data || [];
  }

  return {
    ...profile,
    plants,
    media_recipes,
    contamination_reports,
  };
}

/**
 * Get profile information by:
 *  - Passing an authUser (from getCurrentUser)
 *  - Or passing a userId directly (string)
 *
 * Supports optional `include` parameter to pull in related data.
 */
export async function getUserProfile(
  userOrId:
    | { id: string; email?: string; phone?: string; user_metadata?: any }
    | string,
  options?: {
    include?: ("plants" | "media_recipes" | "contamination_logs")[];
  }
) {
  const supabase = await createClient();

  // Normalize to id and authUser fields
  let id: string;
  let authUser: any = null;
  if (typeof userOrId === "string") {
    id = userOrId;
  } else {
    id = userOrId.id;
    authUser = userOrId;
  }

  // Base profile query
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (profileError) throw profileError;

  // Related data fetching
  let plants: any[] = [];
  let media_recipes: any[] = [];
  let contamination_reports: any[] = [];

  if (options?.include?.includes("plants")) {
    const { data } = await supabase
      .from("plants")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false });
    plants = data || [];
  }

  if (options?.include?.includes("media_recipes")) {
    const { data } = await supabase
      .from("media_recipes")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false });
    media_recipes = data || [];
  }

  if (options?.include?.includes("contamination_logs")) {
    const { data } = await supabase
      .from("contamination_logs")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false });
    contamination_reports = data || [];
  }

  return {
    ...profile,
    // If authUser info is available (e.g., current user)
    email: authUser?.email || profile.email,
    phone: authUser?.phone || profile.phone,
    display_name:
      authUser?.user_metadata?.display_name || profile.display_name || "",
    full_name: profile.full_name,
    plants,
    media_recipes,
    contamination_reports,
  };
}

// Update profile data
export async function updateUserProfile(userId: string, updates: any) {
  const supabase = await createClient();

  // Strip out fields handled by auth
  const { display_name, email, phone, ...filteredUpdates } = updates;

  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...filteredUpdates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

// Update auth user data (metadata, phone, etc.)
export async function updateAuthUser(data: {
  display_name?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}) {
  const supabase = await createClient();

  // Prepare payload
  const updatePayload: any = {
    data: {
      email: data.email,
      display_name: data.display_name,
    },
  };

  // Only include phone if an SMS provider is configured
  // (If you don't have one, skip this)
  if (process.env.NEXT_PUBLIC_ENABLE_SMS === "true" && data.phone) {
    updatePayload.phone = data.phone;
  }

  const { data: userData, error } = await supabase.auth.updateUser(
    updatePayload
  );

  if (error) throw error;
  return userData;
}
