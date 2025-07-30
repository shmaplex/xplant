import { createClient } from "@/lib/supabase/server";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import MediaRecipeNotFound from "@/components/dashboard/media/MediaRecipeNotFound";
import PlantCard from "@/components/dashboard/plants/PlantCard";
import { Plant, PlantWithStage } from "@/lib/types";

export default async function MediaRecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // 1. Fetch media recipe
  const { data: recipe } = await supabase
    .from("media_recipes")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!recipe) return <MediaRecipeNotFound />;

  // 2. Fetch linked plant IDs
  const { data: linkRows, error: linkError } = await supabase
    .from("plant_recipe_links")
    .select("plant_id")
    .eq("recipe_id", id);

  if (linkError) {
    console.error("Error loading linked plants:", linkError);
  }

  const plantIds = linkRows?.map((row) => row.plant_id) ?? [];

  // 3. Fetch plants with current_stage joined from plant_stages via FK constraint
  let linkedPlants: Plant[] = [];
  const { data: plantsData, error: plantsError } = await supabase
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
      stage
    )
  `
    )
    .in("id", plantIds);

  console.log("plantsData", plantsData);
  if (plantsError) {
    console.error("Error fetching plants with stages:", plantsError);
  } else if (plantsData) {
    linkedPlants = plantsData.map((plant) => ({
      ...plant,
      current_stage: plant.current_stage ?? null,
    }));
  }

  const canEdit = true;
  const editUrl = `/dashboard/media/${id}/edit`;

  return (
    <div className="w-full p-8 bg-spore-grey">
      <div className="max-w-4xl mx-auto min-h-screen bg-white/40 p-12 rounded-2xl relative">
        <Breadcrumbs
          items={[
            { label: "Media Recipes", href: "/dashboard/media" },
            { label: recipe.title },
          ]}
        />

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-biochar-black">
            {recipe.title}
          </h1>
          <p className="text-sm text-gray-500">
            Created on {new Date(recipe.created_at).toLocaleDateString()}
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Components</h2>
          <ul className="list-disc list-inside bg-white/70 p-4 rounded-xl shadow">
            {recipe.components?.map((c: any, idx: number) => {
              const hasProduct = !!c.product_id;
              const content = (
                <>
                  {c.qty} &ndash; {c.name}
                </>
              );
              return (
                <li key={idx} className="text-gray-700">
                  {hasProduct ? (
                    <Link
                      href={`/shop/${c.product_id}`}
                      className="text-psybeam-purple hover:underline"
                    >
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {linkedPlants.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Linked Plants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {linkedPlants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          </section>
        )}

        {canEdit && (
          <Link
            href={editUrl}
            className="
              fixed bottom-5 right-6 sm:right-24
              bg-future-lime hover:bg-lime-500
              text-black font-medium shadow-lg rounded-full
              px-6 py-3
              transition-colors duration-300
              z-50
            "
            aria-label="Edit Recipe"
          >
            ✏️ Edit Recipe
          </Link>
        )}
      </div>
    </div>
  );
}
