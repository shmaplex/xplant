"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Plant } from "@/lib/types";
import PlantCard from "./PlantCard";

export default function PlantList() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchPlants = async () => {
      const { data, error } = await supabase.from("plants").select("*");

      if (error) {
        console.error("Error fetching plants:", error.message);
      } else {
        setPlants(data);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </div>
  );
}
