// app/dashboard/admin/seed-user/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SeedUserPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSeed = async () => {
    setLoading(true);
    setStatus("idle");
    setMessage(null);

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user?.id) {
      setStatus("error");
      setMessage("Could not get user session.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.rpc("seed_new_user", {
      user_uuid: session.user.id,
    });

    if (error) {
      console.error("Seed error:", error);
      setStatus("error");
      setMessage("Failed to seed user data.");
    } else {
      setStatus("success");
      setMessage("Sample data seeded successfully!");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-[var(--moss-shadow)] mb-4">
        🧪 Seed Test Data
      </h1>
      <p className="text-gray-700 mb-6">
        This will insert sample plants, transfers, tasks, and media recipes for
        the currently logged-in user.
      </p>
      <button
        onClick={handleSeed}
        disabled={loading}
        className="bg-[var(--future-lime)] hover:bg-lime-500 text-black px-4 py-2 rounded-md font-medium disabled:opacity-50"
      >
        {loading ? "Seeding..." : "Seed Sample Data"}
      </button>

      {status !== "idle" && (
        <div
          className={`mt-4 p-4 rounded-md ${
            status === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
