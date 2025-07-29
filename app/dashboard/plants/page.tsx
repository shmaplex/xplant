import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import PlantCard from "@/components/dashboard/plants/PlantCard";
import { Plant, PlantStage } from "@/lib/types";

export default async function PlantLogbook() {
  // Use the custom server-side client
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.id) {
    return (
      <div className="text-center py-16 text-moss-shadow">
        <h2 className="text-2xl font-semibold mb-2">
          Please log in to view your plant logbook.
        </h2>
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
      plant_stages (
        id,
        stage,
        room,
        entered_on,
        notes,
        created_at
      )
    `
    )
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error || !plantsWithStages) {
    console.error("Error fetching plants:", error?.message || "Unknown error");
    return (
      <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded-md max-w-xl mx-auto mt-12">
        <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
        <p>We couldn’t load your plants right now. Please try again shortly.</p>
      </div>
    );
  }

  const plants: Plant[] = (plantsWithStages || []).map((plant: any) => {
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

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[var(--moss-shadow)]">
          Plant Logbook
        </h1>
        <Link
          href="/dashboard/plants/new"
          className="bg-[var(--future-lime)] hover:bg-lime-500 text-black px-4 py-2 rounded-md font-medium"
        >
          + Add Plant
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plants.length > 0 ? (
          plants.map((plant) => <PlantCard key={plant.id} plant={plant} />)
        ) : (
          <p className="text-gray-500">
            No plants logged yet. Add your first culture!
          </p>
        )}
      </div>
    </div>
  );
}
