import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SeedAdminPanel from "./seed-panel";

export default async function ProtectedSeedPage() {
  const supabase = await createClient();

  // Get session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.id) {
    redirect("/"); // no session
  }

  // Fetch profile for the logged-in user
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (error || !profile) {
    console.error("Could not fetch profile or no profile found", error);
    redirect("/");
  }

  // Only allow admins (and optionally managers) to see this page
  const allowedRoles = ["admin", "manager"];
  if (!allowedRoles.includes(profile.role)) {
    redirect("/");
  }

  return <SeedAdminPanel />;
}
