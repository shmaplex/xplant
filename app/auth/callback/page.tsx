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
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/dashboard");
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
