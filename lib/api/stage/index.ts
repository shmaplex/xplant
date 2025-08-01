import { createClient } from "@/lib/supabase/server";
import type { PlantStage } from "@/lib/types";

export async function fetchAllStages(): Promise<PlantStage[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("plant_stages")
    .select("*")
    .order("entered_on", { ascending: false });

  if (error) {
    console.error("Error fetching plant stages:", error);
    return [];
  }

  return data || [];
}

export async function fetchStagesByPlantId(
  plantId: string
): Promise<PlantStage[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("plant_stages")
    .select("*")
    .eq("plant_id", plantId)
    .order("entered_on", { ascending: false });

  if (error) {
    console.error(`Error fetching stages for plant ${plantId}:`, error);
    return [];
  }

  return data || [];
}
