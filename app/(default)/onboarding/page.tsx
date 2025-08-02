"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function OnboardingPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const finishOnboarding = async (withMockData: boolean) => {
    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) return;

    if (withMockData) {
      await supabase.rpc("seed_new_user", {
        user_uuid: session.user.id,
      });
    }

    // Update onboarding_complete
    await supabase
      .from("profiles")
      .update({ onboarding_complete: true })
      .eq("id", session.user.id);

    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <h1 className="text-2xl font-bold">Welcome to ShmaplexPlant!</h1>
      <p>How would you like to start your dashboard?</p>
      <div className="flex space-x-4">
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-lg"
          disabled={loading}
          onClick={() => finishOnboarding(true)}
        >
          Start with Mock Data
        </button>
        <button
          className="px-6 py-3 bg-gray-600 text-white rounded-lg"
          disabled={loading}
          onClick={() => finishOnboarding(false)}
        >
          Start Blank
        </button>
      </div>
    </div>
  );
}
