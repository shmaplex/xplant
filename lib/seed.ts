import { createClient } from "@/lib/supabase/server";

export async function runPlantSeed() {
  const supabase = await createClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw new Error("Error fetching session: " + sessionError.message);
  }

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const user_id = session.user.id;
  const now = new Date().toISOString();

  const mockPlants = [
    {
      user_id,
      species: "Strawberry - Albion",
      source: "Seedling",
      initial_n_date: now,
      initial_i_date: now,
      transfer_cycle: 0,
      media: ["MS", "RootFlow"],
      notes: "Sample tissue culture plant",
      photo_url: "/img/sample-plant-1.jpg",
    },
    {
      user_id,
      species: "Orchid - Dendrobium",
      source: "Explant",
      initial_n_date: now,
      initial_i_date: now,
      transfer_cycle: 1,
      media: ["MS"],
      notes: "Delicate explant in media",
      photo_url: "/img/sample-plant-2.jpg",
    },
  ];

  const { error } = await supabase.from("plants").insert(mockPlants);

  if (error) {
    throw new Error("Failed to insert plants: " + error.message);
  }

  return { success: true };
}
