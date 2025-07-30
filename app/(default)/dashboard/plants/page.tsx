import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import PlantCard from "@/components/dashboard/plants/PlantCard";
import { Plant, PlantStage } from "@/lib/types";
import { Sprout } from "lucide-react";

export default async function PlantLogbook() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-moss-shadow">
        <Sprout className="w-12 h-12 mb-4 text-[var(--future-lime)]" />
        <h2 className="text-2xl font-semibold">Please log in</h2>
        <p className="text-gray-500 mt-2">
          You need an account to access your plant logbook.
        </p>
      </div>
    );
  }

  const { data: plantsWithStages, error } = await supabase
    .from("plants")
    .select(
      `
      id,
      user_id,
      species,
      source,
      initial_n_date,
      initial_i_date,
      transfer_cycle,
      media,
      notes,
      photo_url,
      created_at,
      plant_stages!plant_stages_plant_id_fkey (
        id,
        stage,
        room,
        entered_on,
        notes,
        created_at
      )
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !plantsWithStages) {
    console.error("Error fetching plants:", error?.message || "Unknown error");
    return (
      <div className="bg-red-50 text-red-700 border border-red-200 p-6 rounded-xl max-w-xl mx-auto mt-12 shadow">
        <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
        <p>We couldn’t load your plants right now. Please try again shortly.</p>
      </div>
    );
  }

  const plants: Plant[] = plantsWithStages.map((plant: any) => {
    const stages: PlantStage[] = plant.plant_stages || [];
    const latestStage =
      stages.sort(
        (a, b) =>
          new Date(b.entered_on).getTime() - new Date(a.entered_on).getTime()
      )[0] || null;

    return {
      ...plant,
      current_stage: latestStage,
    };
  });

  const hasPlants = plants.length > 0;

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-moss-shadow">Plant Logbook</h1>
        <p className="text-gray-500 mt-2">
          Track the progress of your cultures and stages.
        </p>
      </div>

      {/* Plant grid or empty state */}
      {hasPlants ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-[var(--spore-grey)]/20 rounded-xl">
          <Sprout className="w-14 h-14 text-[var(--future-lime)] mb-4" />
          <p className="text-lg font-semibold text-gray-700">
            No plants logged yet
          </p>
          <p className="text-gray-500 mt-1">
            Start by adding your first culture.
          </p>
        </div>
      )}

      {/* Floating Add Plant button */}
      <Link
        href="/dashboard/plants/new"
        className="
          fixed bottom-5 right-6 sm:right-24
          bg-[var(--future-lime)] hover:bg-lime-500
          text-black font-medium shadow-lg rounded-full
          px-6 py-3
          transition-colors duration-300
        "
      >
        + Add Plant
      </Link>
    </div>
  );
}
