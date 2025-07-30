"use client";

import { createClient } from "@/lib/supabase/client";
import { Plant, MediaRecipe } from "@/lib/types";

const supabase = createClient();

export async function fetchLinkedPlantsForRecipe(recipeId: string) {
  const supabase = await createClient();

  const { data: plantLinks, error: linkErr } = await supabase
    .from("plant_recipe_links")
    .select("plant_id")
    .eq("recipe_id", recipeId);

  if (linkErr) throw linkErr;
  const plantIds = plantLinks?.map((row) => row.plant_id) ?? [];
  if (plantIds.length === 0) return [];

  const { data: plants, error: plantsErr } = await supabase
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
        photo_url,
        notes,
        created_at,
        current_stage_id,
        current_stage:plant_stages!plants_current_stage_id_fkey (
          id,
          stage,
          plant_id,
          entered_on,
          created_at
        )
      `
    )
    .in("id", plantIds);

  if (plantsErr) throw plantsErr;

  return (plants || []).map((p) => ({
    ...p,
    // Take the first related stage (if any)
    current_stage: Array.isArray(p.current_stage)
      ? p.current_stage[0] ?? null
      : p.current_stage ?? null,
    media: [],
  })) as Plant[];
}

export async function fetchLinkedProductsForRecipe(recipeId: string) {
  const supabase = await createClient();

  const { data: productLinks, error: linkErr } = await supabase
    .from("media_recipe_products")
    .select("product_id")
    .eq("recipe_id", recipeId);

  if (linkErr) throw linkErr;
  const productIds = productLinks?.map((row) => row.product_id) ?? [];
  if (productIds.length === 0) return [];

  const { data: products, error: productsErr } = await supabase
    .from("products")
    .select(
      `
        *,
        variants: product_variants (
          id,
          title,
          price
        )
      `
    )
    .in("id", productIds);

  if (productsErr) throw productsErr;

  return products || [];
}

export async function fetchPlants() {
  const supabase = createClient();
  const { data, error } = await supabase.from("plants").select("id, species");
  if (error) throw error;
  return data || [];
}

export async function fetchMediaRecipeOptions() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("media_recipes")
    .select("id, title");
  if (error) throw error;
  return data || [];
}

export async function linkPlantToRecipe(plant_id: string, recipe_id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("plant_recipe_links")
    .insert([{ plant_id, recipe_id }]);
  return { error };
}

/**
 * Fetch media recipes with optional search
 */
export async function fetchMediaRecipes(
  limit = 12,
  offset = 0,
  search?: string
): Promise<MediaRecipe[]> {
  // Use the view instead of the base table
  let query = supabase
    .from("media_recipes_search")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (search && search.trim() !== "") {
    // Use OR to search both title and components_text
    const term = `%${search.trim()}%`;
    query = query.or(`title.ilike.${term},components_text.ilike.${term}`);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
}
/**
 * Fetch one recipe by id
 */
export async function fetchMediaRecipeById(recipeId: string) {
  const { data, error } = await supabase
    .from("media_recipes")
    .select("title, components, created_at")
    .eq("id", recipeId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

/**
 * Fetch linked products for a recipe
 */
export async function fetchRecipeLinkedProducts(recipeId: string) {
  const { data, error } = await supabase
    .from("media_recipe_products")
    .select("product_id")
    .eq("recipe_id", recipeId);

  if (error) throw error;
  return data?.map((row) => row.product_id) || [];
}

/**
 * Fetch all distinct component names for suggestions
 */
export async function fetchAllComponentNames() {
  const { data, error } = await supabase
    .from("media_recipes")
    .select("components");

  if (error) throw error;

  const names = new Set<string>();
  data?.forEach((recipe) => {
    if (Array.isArray(recipe.components)) {
      recipe.components.forEach((c: any) => {
        if (c.name) names.add(c.name);
      });
    }
  });

  return Array.from(names).sort();
}

/**
 * Fetch products (for linking)
 */
export async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("id,title")
    .order("title");

  if (error) throw error;
  return data || [];
}

/**
 * Save a recipe (insert or update), return recipe id
 */
export async function saveMediaRecipe({
  recipeId,
  userId,
  title,
  components,
}: {
  recipeId?: string;
  userId: string;
  title: string;
  components: { name: string; qty: string }[];
}) {
  const { data, error } = await supabase
    .from("media_recipes")
    .upsert(
      [
        {
          id: recipeId,
          user_id: userId,
          title,
          components,
        },
      ],
      { onConflict: "id" }
    )
    .select("id")
    .single();

  if (error) throw error;
  return data.id;
}

/**
 * Update product links for a recipe
 */
export async function updateRecipeProductLinks(
  recipeId: string,
  productIds: string[]
) {
  // Delete old links
  const { error: delError } = await supabase
    .from("media_recipe_products")
    .delete()
    .eq("recipe_id", recipeId);

  if (delError) throw delError;

  if (productIds.length === 0) return;

  // Insert new links
  const { error: insertError } = await supabase
    .from("media_recipe_products")
    .insert(
      productIds.map((product_id) => ({ recipe_id: recipeId, product_id }))
    );

  if (insertError) throw insertError;
}
