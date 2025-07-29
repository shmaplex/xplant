"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { PlantBasic } from "@/lib/types";
import NewTransferForm from "@/components/dashboard/transfers/NewTransferForm";

export default function NewTransferPage() {
  const searchParams = useSearchParams();
  const transferId = searchParams.get("id") ?? undefined;
  const [plants, setPlants] = useState<PlantBasic[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchPlants = async () => {
      const { data } = await supabase.from("plants").select("id,species");
      setPlants(data || []);
    };
    fetchPlants();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-[var(--milk-bio)] py-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 sm:p-12">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--moss-shadow)] mb-4">
          {transferId ? "Edit Transfer" : "New Transfer"}
        </h1>

        <p className="mb-8 text-sm sm:text-base text-gray-600 max-w-lg">
          {transferId
            ? "Update the details of your existing plant transfer."
            : "Fill out the form below to log a new plant transfer cycle."}
        </p>

        <NewTransferForm plants={plants} transferId={transferId} />
      </div>
    </div>
  );
}
