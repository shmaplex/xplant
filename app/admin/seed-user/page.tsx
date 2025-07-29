import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SeedUserPage from "./SeedUserPage";

export default async function ProtectedSeedPage() {
  // Create Supabase server client — this handles cookies internally
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const allowedEmails = ["team@shmaplex.com"]; // 👈 your admin emails

  if (
    !session ||
    !session.user.email ||
    !allowedEmails.includes(session.user.email)
  ) {
    redirect("/"); // ❌ not allowed
  }

  return <SeedUserPage />;
}
