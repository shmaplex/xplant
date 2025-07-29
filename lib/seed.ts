import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function runPlantSeed() {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const user_id = session.user.id;

  const mockPlants = [
    {
      user_id,
      species: "Strawberry - Albion",
      source: "Seedling",
      initial_n_date: new Date().toISOString(),
      initial_i_date: new Date().toISOString(),
      transfer_cycle: 0,
      media: ["MS", "RootFlow"],
      notes: "Sample tissue culture plant",
      photo_url: "/img/sample-plant-1.jpg",
    },
    {
      user_id,
      species: "Orchid - Dendrobium",
      source: "Explant",
      initial_n_date: new Date().toISOString(),
      initial_i_date: new Date().toISOString(),
      transfer_cycle: 1,
      media: ["MS"],
      notes: "Delicate explant in media",
      photo_url: "/img/sample-plant-2.jpg",
    },
  ];

  const { error } = await supabase.from("plants").insert(mockPlants);

  if (error) throw new Error(error.message);
  return { success: true };
}
