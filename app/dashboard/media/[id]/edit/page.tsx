import { createClient } from "@/lib/supabase/server";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MediaRecipeForm from "@/components/dashboard/media/MediaRecipeForm";
import { Toaster } from "react-hot-toast";

export default async function EditMediaRecipePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const supabase = await createClient();

  // Check that recipe exists (optional: you could skip this if the form fetches it itself)
  const { data: recipe, error } = await supabase
    .from("media_recipes")
    .select("id, title")
    .eq("id", id)
    .maybeSingle();

  if (error || !recipe) {
    return <div className="p-8">Recipe not found</div>;
  }

  return (
    <div className="w-full p-8 bg-spore-grey">
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto min-h-screen bg-white/40 p-12 rounded-2xl">
        <Breadcrumbs
          items={[
            { label: "Media Recipes", href: "/dashboard/media" },
            { label: recipe.title, href: `/dashboard/media/${id}` },
            { label: "Edit" },
          ]}
        />

        <header className="space-y-4 text-center sm:text-left mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-biochar-black">
            Edit <span className="text-[#5b3fa8]">{recipe.title}</span>
          </h1>
        </header>

        <section className="relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-milk-bio via-spore-grey/10 to-milk-bio">
          <div className="absolute inset-0 bg-[url('/png/asfalt-light.png')] bg-repeat opacity-5 pointer-events-none"></div>
          <div className="relative p-8">
            {/* Pass just the recipeId, the form handles fetching and populating */}
            <MediaRecipeForm recipeId={id} />
          </div>
        </section>
      </div>
    </div>
  );
}
