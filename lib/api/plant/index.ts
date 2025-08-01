// lib/api/plants/index.ts
import { createClient } from "@/lib/supabase/server";
import type { Plant, PlantMediaLog } from "@/lib/types";

export async function fetchFullPlantData(id: string, userId: string) {
  const [plant, stages, mediaLogs] = await Promise.all([
    fetchPlantById(id, userId),
    fetchPlantStages(id),
    fetchPlantMediaLogs(id, userId),
  ]);

  return { plant, stages, mediaLogs };
}

export async function fetchPlants(userId: string): Promise<Plant[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("plants")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function fetchPlantById(id: string, userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("plants")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function fetchPlantStages(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("plant_stages")
    .select("*")
    .eq("plant_id", id)
    .order("entered_on", { ascending: false });

  if (error) throw error;
  return data;
}

export async function fetchPlantRelatedData(id: string) {
  const supabase = await createClient();

  const [
    { data: transfers, error: transfersError },
    { data: logs, error: logsError },
    { data: recipes, error: recipesError },
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

    fetchPlantRecipes(id),
  ]);

  // Transform join results into an array of recipe objects
  const linkedRecipes = (recipes ?? [])
    .map((row: any) => row.media_recipes)
    .filter(Boolean);

  return {
    transfers: transfers ?? [],
    logs: logs ?? [],
    recipes: linkedRecipes,
    errors: { transfersError, logsError, recipesError },
  };
}

export async function fetchPlantRecipes(plantId: string) {
  const supabase = await createClient();

  return await supabase
    .from("plant_recipe_links")
    .select(
      `
      recipe_id,
      linked_at,
      media_recipes (
        id,
        title,
        components,
        origin,
        created_at
      )
    `
    )
    .eq("plant_id", plantId);
}

export async function insertPlant({
  userId,
  species,
  source,
  initial_n_date,
  initial_i_date,
  notes,
}: {
  userId: string;
  species: string;
  source?: string;
  initial_n_date?: string;
  initial_i_date?: string;
  notes?: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("plants")
    .insert([
      {
        user_id: userId,
        species,
        source,
        initial_n_date,
        initial_i_date,
        notes,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function insertPlantMediaRecord({
  plantId,
  mediaUrl,
  originalName,
  fileType,
  uploadedBy,
  type,
}: {
  plantId: string;
  mediaUrl: string;
  originalName: string;
  fileType: string;
  uploadedBy: string | null;
  type: "photo" | "video" | "annotation";
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("plant_media_logs").insert({
    plant_id: plantId,
    contamination_log_id: null,
    type,
    media_url: mediaUrl,
    original_name: originalName,
    file_type: fileType || "other",
    description: null,
    captured_at: null,
    labels: [],
    annotated: false,
    is_public: false,
    uploaded_by: uploadedBy,
  });

  if (error) {
    throw error;
  }
}

export async function fetchPlantMediaLogs(
  plantId: string,
  userId: string
): Promise<PlantMediaLog[]> {
  const supabase = await createClient();

  // Check plant ownership first
  const { data: plant, error: plantError } = await supabase
    .from("plants")
    .select("user_id")
    .eq("id", plantId)
    .single();

  // PGRST116 = The result contains 0 rows
  if (plantError && plantError.code === "PGRST116") {
    return [];
  }

  if (plantError) throw plantError;
  if (!plant || plant.user_id !== userId) {
    // Not authorized or plant doesn't exist
    return [];
  }

  // Now fetch media logs
  const { data, error } = await supabase
    .from("plant_media_logs")
    .select("*")
    .eq("plant_id", plantId)
    .order("created_at", { ascending: false });

  console.log("error", error);
  if (error) throw error;
  return data || [];
}
