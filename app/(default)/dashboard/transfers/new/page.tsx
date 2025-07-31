"use client";

import NewTransferForm from "@/components/dashboard/transfers/NewTransferForm";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { PlantBasic } from "@/lib/types";
import { toast } from "react-toastify";
import PlantLoader from "@/components/dashboard/plants/PlantLoader";

function TransferPageClient() {
  const searchParams = useSearchParams();
  const transferId = searchParams.get("id") ?? undefined;

  const [plants, setPlants] = useState<PlantBasic[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchPlants = async () => {
      const { data, error } = await supabase
        .from("plants")
        .select("id,species");
      if (error) {
        toast.error("Failed to load plants.");
      } else {
        setPlants(data || []);
      }
      setLoading(false);
    };
    fetchPlants();
  }, [supabase]);

  if (loading) {
    return <PlantLoader />;
  }

  return (
    <div className="min-h-screen bg-[var(--milk-bio)] py-16 px-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-12">
        <h1 className="text-3xl font-semibold text-[var(--moss-shadow)] mb-6">
          {transferId ? "Edit Transfer" : "New Transfer"}
        </h1>

        <p className="mb-10 text-base text-[var(--moss-shadow)] max-w-lg leading-relaxed">
          {transferId
            ? "Update the details of your existing plant transfer."
            : "Fill out the form below to log a new plant transfer cycle."}
        </p>

        <NewTransferForm plants={plants} transferId={transferId} />
      </div>
    </div>
  );
}

export default TransferPageClient;
