"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type PlantWithRelations = {
  id: string;
  species: string;
  user_id: string;
  created_at: string;
  current_stage?: {
    id: string;
    stage: string;
    room?: string | null;
    entered_on: string;
    notes?: string | null;
  } | null;
  user?: {
    full_name?: string | null;
    email: string;
  } | null;
};

export default function AllPlantsAdminPage() {
  const supabase = createClient();
  const [plants, setPlants] = useState<PlantWithRelations[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlants() {
      setLoading(true);

      const { data, error } = await supabase
        .from("plants_with_profiles")
        .select(
          `
            id,
            species,
            user_id,
            created_at,
            current_stage,
            user
          `
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching plants:", error);
        setPlants([]);
      } else {
        // Map to PlantWithRelations shape with nested objects
        const plantsMapped: PlantWithRelations[] = (data || []).map(
          (p: any) => ({
            id: p.id,
            species: p.species,
            user_id: p.user_id,
            created_at: p.created_at,
            current_stage: p.current_stage ?? null,
            user: p.user ?? null,
          })
        );
        setPlants(plantsMapped);
      }

      setLoading(false);
    }

    fetchPlants();
  }, [supabase]);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-[var(--moss-shadow)] mb-6">
        All Logged Plants
      </h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-lime-400 border-t-transparent rounded-full" />
        </div>
      ) : plants.length === 0 ? (
        <p className="text-center text-gray-600 py-12">No plants logged yet.</p>
      ) : (
        <table className="w-full border-collapse border rounded-xl shadow-md overflow-hidden">
          <thead className="bg-[var(--spore-grey)]">
            <tr>
              <th className="border px-4 py-3 text-left">Species</th>
              <th className="border px-4 py-3 text-left">Current Stage</th>
              <th className="border px-4 py-3 text-left">Room</th>
              <th className="border px-4 py-3 text-left">Entered On</th>
              <th className="border px-4 py-3 text-left">Added By</th>
              <th className="border px-4 py-3 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((p, i) => (
              <tr
                key={p.id}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border px-4 py-2 font-semibold">{p.species}</td>
                <td className="border px-4 py-2">
                  {p.current_stage?.stage || "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {p.current_stage?.room || "-"}
                </td>
                <td className="border px-4 py-2">
                  {p.current_stage?.entered_on
                    ? new Date(p.current_stage.entered_on).toLocaleDateString()
                    : "-"}
                </td>
                <td className="border px-4 py-2">
                  {p.user?.full_name || p.user?.email || "Unknown"}
                </td>
                <td className="border px-4 py-2">
                  {new Date(p.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
