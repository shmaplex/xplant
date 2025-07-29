import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  Plant,
  PlantStage,
  PlantTransfer,
  ContaminationLog,
  MediaRecipe,
} from "@/lib/types";
import PlantDetail from "@/components/dashboard/plants/PlantDetail";

type PlantWithStages = Omit<Plant, "current_stage"> & {
  plant_stages: PlantStage[];
};

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });

  // Fetch plant and its stages
  const { data: plantData, error: plantError } = await supabase
    .from("plants")
    .select(
      `
        id,
        user_id,
        species,
        source,
        initial_n_date,
        initial_i_date,
        notes,
        photo_url,
        transfer_cycle,
        media,
        created_at,
        plant_stages(
          id,
          plant_id,
          stage,
          room,
          entered_on,
          notes,
          created_at
        )
      `
    )
    .eq("id", params.id)
    .order("entered_on", { foreignTable: "plant_stages", ascending: false })
    .single();

  if (!plantData || plantError) {
    return <div className="p-6">Plant not found</div>;
  }

  const current_stage = plantData.plant_stages?.[0] ?? null;

  const plant: Plant = {
    ...plantData,
    current_stage,
  };

  // Fetch related transfers, contamination logs, and linked recipes
  const [{ data: transfersRaw }, { data: logsRaw }, { data: recipesRaw }] =
    await Promise.all([
      supabase
        .from("plant_transfers")
        .select("*")
        .eq("plant_id", params.id)
        .order("transfer_date", { ascending: false }),

      supabase
        .from("contamination_logs")
        .select("*")
        .eq("plant_id", params.id)
        .order("logged_at", { ascending: false }),

      supabase
        .from("media_recipes")
        .select("*")
        .contains("linked_plants", [params.id]),
    ]);

  const transfers: PlantTransfer[] = transfersRaw ?? [];
  const logs: ContaminationLog[] = logsRaw ?? [];
  const recipes: MediaRecipe[] = recipesRaw ?? [];

  return (
    <PlantDetail
      plant={plant}
      transfers={transfers}
      logs={logs}
      recipes={recipes}
    />
  );
}
