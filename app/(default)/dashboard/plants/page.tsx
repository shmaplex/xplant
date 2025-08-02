import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import PlantCard from "@/components/dashboard/plants/PlantCard";
import { Plant, PlantStage } from "@/lib/types";
import { Sprout } from "lucide-react";
import NotLoggedIn from "@/components/ui/NotLoggedIn";
import { fetchPlants } from "@/lib/api/plant";
import { FiPlus } from "react-icons/fi";

export default async function PlantLogbook() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <NotLoggedIn />;
  }

  // Use your new API function
  const plantsData = await fetchPlants(user.id);

  // Get the latest stage for each plant
  const plants: Plant[] = plantsData.map((plant: any) => {
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
    <div className="relative min-h-screen">
      {/* Background radial gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,var(--future-lime)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-moss-shadow">
            Plant Logbook
          </h1>
          <p className="text-moss-shadow/70 mt-2 text-lg">
            Track the progress of your cultures and stages.
          </p>
        </div>

        {/* Plant grid or empty state */}
        {hasPlants ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white/50 rounded-2xl shadow-lg backdrop-blur">
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
            transition-colors duration-300 flex justify-center items-center
          "
        >
          <FiPlus className="w-4 h-4" /> Add Plant
        </Link>
      </div>
    </div>
  );
}
