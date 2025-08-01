"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NewTransferForm from "@/components/dashboard/transfers/NewTransferForm";
import type { PlantBasic, PlantTransfer } from "@/lib/types";
import PlantLoader from "@/components/dashboard/plants/PlantLoader";

export default function EditTransferPage() {
  const { id: transferId } = useParams<{ id: string }>();
  const router = useRouter();

  const [plants, setPlants] = useState<PlantBasic[]>([]);
  const [initialData, setInitialData] = useState<Partial<PlantTransfer> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!transferId) {
      setError("No transfer ID provided");
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        // Fetch plants
        const plantsRes = await fetch("/api/plants");
        const plantsJson = await plantsRes.json();
        if (!plantsRes.ok)
          throw new Error(plantsJson.error || "Failed to load plants");
        setPlants(plantsJson.plants || []);

        // Fetch transfer by id
        const transferRes = await fetch(`/api/transfers/${transferId}`);
        const transferJson = await transferRes.json();
        if (!transferRes.ok)
          throw new Error(transferJson.error || "Failed to load transfer");

        if (!transferJson.data) throw new Error("Transfer not found.");

        setInitialData(transferJson.data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [transferId]);

  if (loading) return <PlantLoader />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );

  if (!initialData)
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <p className="text-red-600 font-semibold">No initial data found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[var(--milk-bio)] py-16 px-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-12">
        <h1 className="text-3xl font-semibold text-[var(--moss-shadow)] mb-6">
          Edit Transfer
        </h1>

        <p className="mb-10 text-base text-[var(--moss-shadow)] max-w-lg leading-relaxed">
          Update the details of your existing plant transfer.
        </p>

        <NewTransferForm
          plants={plants}
          transferId={transferId ?? undefined}
          initialData={initialData}
          onSuccess={() => router.push("/dashboard/transfers")}
        />
      </div>
    </div>
  );
}
