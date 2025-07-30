import { createClient } from "@/lib/supabase/server";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import MediaRecipeNotFound from "@/components/dashboard/media/MediaRecipeNotFound";
import PlantCard from "@/components/dashboard/plants/PlantCard";
import MediaLinkedProductsGrid from "@/components/dashboard/media/MediaLinkedProductsGrid";
import { Plant } from "@/lib/types";

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

  // ---- LINKED PLANTS ----
  const { data: plantLinks, error: plantLinkError } = await supabase
    .from("plant_recipe_links")
    .select("plant_id")
    .eq("recipe_id", id);

  if (plantLinkError) {
    console.error("Error loading linked plants:", plantLinkError);
  }

  const plantIds = plantLinks?.map((row) => row.plant_id) ?? [];

  let linkedPlants: Plant[] = [];
  if (plantIds.length > 0) {
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

    if (plantsError) {
      console.error("Error fetching plants with stages:", plantsError);
    } else if (plantsData) {
      linkedPlants = plantsData.map((plant) => ({
        ...plant,
        current_stage: plant.current_stage ?? null,
        media: [], // <-- add empty media array to satisfy Plant type
      }));
    }
  }

  // ---- LINKED PRODUCTS ----
  const { data: productLinks, error: productLinkError } = await supabase
    .from("media_recipe_products")
    .select("product_id")
    .eq("recipe_id", id);

  if (productLinkError) {
    console.error("Error loading linked products:", productLinkError);
  }

  const productIds = productLinks?.map((row) => row.product_id) ?? [];

  let linkedProducts: any[] = [];
  if (productIds.length > 0) {
    const { data: productsData, error: productsError } = await supabase
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

    if (productsError) {
      console.error("Error fetching linked products:", productsError);
    } else if (productsData) {
      linkedProducts = productsData;
    }
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

        {/* Components list */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Components</h2>
          <ul className="list-disc list-inside bg-white/70 p-4 rounded-xl shadow">
            {recipe.components?.map((c: any, idx: number) => (
              <li key={idx} className="text-gray-700">
                {c.qty} – {c.name}
              </li>
            ))}
          </ul>
        </section>

        {/* Linked Plants */}
        {linkedPlants.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Linked Plants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {linkedPlants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          </section>
        )}

        {/* Linked Products */}
        {linkedProducts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Linked Products</h2>
            <MediaLinkedProductsGrid products={linkedProducts} />
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
