"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Loader from "@/components/ui/Loader";
import { toast } from "react-toastify";

export default function SeedingPage() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [error, setError] = useState<string | null>(null);

  const seedUserData = useCallback(async () => {
    if (!userId) {
      setError("No user ID provided.");
      return;
    }

    try {
      const { error: rpcError } = await supabase.rpc("seed_new_user", {
        user_uuid: userId,
      });

      if (rpcError) {
        console.error("Failed to seed user data:", rpcError);
        toast.error(
          "We couldn't fully prepare your workspace. You can still access your dashboard."
        );
      } else {
        toast.success("Workspace initialized successfully!");
      }
    } catch (err) {
      console.error("Unexpected error during seeding:", err);
      toast.error("Unexpected error during workspace initialization.");
    } finally {
      // Redirect regardless of success or failure
      router.replace("/dashboard");
    }
  }, [supabase, userId, router]);

  useEffect(() => {
    const run = async () => {
      if (!userId) {
        setError("No user ID provided.");
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from("profiles")
          .select("seed_completed")
          .eq("id", userId)
          .single();

        if (fetchError) {
          console.error("Error fetching seed status:", fetchError);
          toast.warn(
            "Could not verify your workspace. Redirecting to dashboard."
          );
          router.replace("/dashboard");
          return;
        }

        if (data?.seed_completed) {
          // Skip seeding
          router.replace("/dashboard");
        } else {
          // Seed data
          await seedUserData();
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        toast.error("Unexpected error. Redirecting to dashboard.");
        router.replace("/dashboard");
      }
    };

    run();
  }, [supabase, userId, router, seedUserData]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-milk-bio p-6">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <Loader
      message="Cultivating your personalized tissue culture workspace..."
      iconColor="text-green-600"
      bgColor="bg-green-300/30"
      textColor="text-green-800"
      mainBgColor="bg-green-50"
    />
  );
}
