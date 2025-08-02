"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("onboarding_complete")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Failed to fetch profile", error);
          router.replace("/dashboard");
          return;
        }

        // Redirect based on onboarding status
        if (!profile?.onboarding_complete) {
          router.replace("/onboarding");
        } else {
          router.replace("/dashboard");
        }
      }
    };

    handleSession();
  }, [router, supabase]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Signing you in...</p>
    </div>
  );
}
