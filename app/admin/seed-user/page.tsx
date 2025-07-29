// app/dashboard/admin/seed-user/page.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import SeedUserPage from "./SeedUserPage";

export default async function ProtectedSeedPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const allowedEmails = ["team@shmaplex.com"]; // 👈 add your admin email(s) here

  if (
    !session ||
    !session.user.email ||
    !allowedEmails.includes(session.user.email)
  ) {
    redirect("/"); // ❌ not allowed
  }

  return <SeedUserPage />;
}
