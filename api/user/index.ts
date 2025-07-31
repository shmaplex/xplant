// @/api/user.ts
import { createClient } from "@/lib/supabase/server";

// Get current authenticated user from Supabase auth
export async function getCurrentUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

// Get profile row from your public.profiles table
export async function getUserProfile(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

// Update profile data
export async function updateUserProfile(userId: string, updates: any) {
  const supabase = await createClient();

  // Remove `display_name` from updates
  const { display_name, ...filteredUpdates } = updates;

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
  phone?: string;
  [key: string]: any;
}) {
  const supabase = await createClient();

  // Prepare payload
  const updatePayload: any = {
    data: {
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
