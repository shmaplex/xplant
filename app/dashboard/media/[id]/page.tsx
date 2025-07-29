import { createClient } from "@/lib/supabase/server";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import MediaRecipeNotFound from "@/components/dashboard/media/MediaRecipeNotFound";

export default async function MediaRecipeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const supabase = await createClient();

  // Fetch media recipe
  const { data: recipe } = await supabase
    .from("media_recipes")
    .select("*, linked_plant_ids")
    .eq("id", id)
    .maybeSingle();

  if (!recipe) return <MediaRecipeNotFound />;

  // Fetch linked plants
  const linkedPlantIds = recipe.linked_plant_ids ?? [];
  const { data: linkedPlants } = linkedPlantIds.length
    ? await supabase
        .from("plants")
        .select("id,species")
        .in("id", linkedPlantIds)
    : { data: [] };

  // Decide if edit button should show
  // TODO: Replace with permission check based on user session
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
            {recipe.components.map((c: any, idx: number) => {
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

        {linkedPlants && linkedPlants.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Linked Plants</h2>
            <ul className="space-y-2">
              {linkedPlants.map((plant: any) => (
                <li key={plant.id}>
                  <Link
                    href={`/dashboard/plants/${plant.id}`}
                    className="text-psybeam-purple hover:underline"
                  >
                    {plant.species}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Floating Edit Recipe Button */}
        {canEdit && (
          <Link
            href={editUrl}
            className="
              fixed bottom-5 right-6 sm:right-24
              bg-[var(--future-lime)] hover:bg-lime-500
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
