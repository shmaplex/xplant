import PlantDetail from "@/components/dashboard/plants/PlantDetail";
import PlantNotFoundClient from "../PlantNotFoundClient";
import type { Plant, PlantStage } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

export default async function PlantsPage(props: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await props.params;
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) console.error("Error fetching user:", userError);

    if (!user) return <PlantNotFoundClient />;

    // Fetch plant
    const { data: plantData, error: plantError } = await supabase
      .from("plants")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (plantError) console.error("Error fetching plant:", plantError);
    if (!plantData) return <PlantNotFoundClient />;

    // Fetch stages
    const { data: stages, error: stagesError } = await supabase
      .from("plant_stages")
      .select("*")
      .eq("plant_id", id)
      .order("entered_on", { ascending: false });

    if (stagesError) console.error("Error fetching stages:", stagesError);

    const current_stage = stages?.[0] ?? null;
    const plant: Plant = {
      ...plantData,
      plant_stages: stages ?? [],
      current_stage,
    };

    // Related data
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
        .order("log_date", { ascending: false }),

      supabase
        .from("media_recipes")
        .select("*")
        .contains("linked_plant_ids", [id]),
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
        canEdit={user?.id === plant.user_id}
        editUrl={`/dashboard/plants/${id}/edit`}
      />
    );
  } catch (err) {
    console.error("Unexpected error in PlantsPage:", err);
    return <PlantNotFoundClient />;
  }
}
