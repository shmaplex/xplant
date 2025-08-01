"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NewTransferForm from "@/components/dashboard/transfers/NewTransferForm";
import type { PlantBasic } from "@/lib/types";
import PlantLoader from "@/components/dashboard/plants/PlantLoader";

export default function NewTransferPageForPlant() {
  const { plantId } = useParams<{ plantId: string }>();
  const [plants, setPlants] = useState<PlantBasic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlants() {
      try {
        const res = await fetch("/api/plants");
        const json = await res.json();

        if (res.ok) {
          setPlants(json.plants || []);
        } else {
          console.error(json.error || "Failed to load plants");
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
      setLoading(false);
    }

    fetchPlants();
  }, []);

  if (loading) {
    return <PlantLoader />;
  }

  return (
    <div className="min-h-screen bg-[var(--milk-bio)] py-16 px-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-12">
        <h1 className="text-3xl font-semibold text-[var(--moss-shadow)] mb-6">
          New Transfer
        </h1>

        <p className="mb-10 text-base text-[var(--moss-shadow)] max-w-lg leading-relaxed">
          Fill out the form below to log a new plant transfer cycle.
        </p>

        <NewTransferForm
          plants={plants}
          initialData={plantId ? { plant_id: plantId } : {}}
        />
      </div>
    </div>
  );
}
