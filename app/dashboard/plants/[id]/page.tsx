import PlantDetail from "@/components/dashboard/plants/PlantDetail";
import PlantNotFoundClient from "../PlantNotFoundClient";
import type { Plant, PlantStage } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

type PlantWithStages = Omit<Plant, "current_stage"> & {
  plant_stages: PlantStage[];
};

export default async function PlantsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    console.log("Fetching plant with id:", id);

    // Log the session to verify RLS will allow the row
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    console.log("Supabase session:", session);
    if (sessionError) console.error("Error fetching session:", sessionError);

    // Fetch plant
    const { data: plantData, error: plantError } = await supabase
      .from("plants")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    console.log("Plant query error:", plantError);
    console.log("Plant query data:", plantData);

    if (!plantData) {
      // This usually means RLS blocked access or the record truly doesn't exist
      return <PlantNotFoundClient />;
    }

    // Fetch stages separately
    const { data: stages, error: stagesError } = await supabase
      .from("plant_stages")
      .select("*")
      .eq("plant_id", id)
      .order("entered_on", { ascending: false });

    if (stagesError) {
      console.error("Error fetching plant stages:", stagesError);
    }

    const current_stage = stages?.[0] ?? null;

    const plant: Plant = {
      ...plantData,
      plant_stages: stages ?? [],
      current_stage,
    };

    // Fetch related data concurrently
    const [
      { data: transfersRaw, error: transfersError },
      { data: logsRaw, error: logsError },
      { data: recipesRaw, error: recipesError },
    ] = await Promise.all([
      supabase
        .from("plant_transfers")
        .select("*")
        .eq("plant_id", id)
        .order("transfer_date", { ascending: false }),

      supabase
        .from("contamination_logs")
        .select("*")
        .eq("plant_id", id)
        .order("logged_at", { ascending: false }),

      supabase
        .from("media_recipes")
        .select("*")
        .contains("linked_plants", [id]),
    ]);

    if (transfersError)
      console.error("Error fetching transfers:", transfersError);
    if (logsError) console.error("Error fetching logs:", logsError);
    if (recipesError) console.error("Error fetching recipes:", recipesError);

    return (
      <PlantDetail
        plant={plant}
        transfers={transfersRaw ?? []}
        logs={logsRaw ?? []}
        recipes={recipesRaw ?? []}
      />
    );
  } catch (err) {
    console.error("Unexpected error in PlantsPage:", err);
    return <PlantNotFoundClient />;
  }
}
