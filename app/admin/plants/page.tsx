"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AllPlantsAdminPage() {
  const supabase = createClient();

  const [plants, setPlants] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPlants() {
      const { data, error } = await supabase
        .from("plants")
        .select("id, species, user_id, created_at");
      if (error) {
        console.error("Error fetching plants:", error);
      }
      if (data) setPlants(data);
    }

    fetchPlants();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--moss-shadow)] mb-4">
        All Logged Plants
      </h1>
      <table className="w-full border-collapse border">
        <thead className="bg-[var(--spore-grey)]">
          <tr>
            <th className="border px-4 py-2 text-left">Species</th>
            <th className="border px-4 py-2 text-left">User</th>
            <th className="border px-4 py-2 text-left">Created</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((p) => (
            <tr key={p.id}>
              <td className="border px-4 py-2">{p.species}</td>
              <td className="border px-4 py-2 text-xs">{p.user_id}</td>
              <td className="border px-4 py-2">
                {new Date(p.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
