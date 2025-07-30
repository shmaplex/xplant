// lib/api/plants/index.ts
import { createClient } from "@/lib/supabase/server";
import type { Plant } from "@/lib/types";

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
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
