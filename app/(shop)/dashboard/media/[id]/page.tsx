"use client";

import { use, useEffect, useState } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import MediaRecipeNotFound from "@/components/dashboard/media/MediaRecipeNotFound";
import PlantCard from "@/components/dashboard/plants/PlantCard";
import MediaLinkedProductsGrid from "@/components/dashboard/media/MediaLinkedProductsGrid";
import {
  fetchMediaRecipeById,
  fetchLinkedPlantsForRecipe,
  fetchLinkedProductsForRecipe,
} from "@/lib/api/media";
import MediaComponentDisplay from "@/components/dashboard/media/MediaComponentDisplay";
import { formatDate } from "@/lib/date";

export default function MediaRecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ unwrap the promise using React.use()
  const { id } = use(params);

  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState<any | null>(null);
  const [linkedPlants, setLinkedPlants] = useState<any[]>([]);
  const [linkedProducts, setLinkedProducts] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const recipeData = await fetchMediaRecipeById(id);
        if (!recipeData) {
          setRecipe(null);
          setLoading(false);
          return;
        }

        const [plants, products] = await Promise.all([
          fetchLinkedPlantsForRecipe(id),
          fetchLinkedProductsForRecipe(id),
        ]);

        setRecipe(recipeData);
        setLinkedPlants(plants);
        setLinkedProducts(products);
      } catch (err) {
        console.error("Failed to load recipe detail:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full p-8">
        <p className="text-center text-gray-500">Loading recipe details…</p>
      </div>
    );
  }

  if (!recipe) {
    return <MediaRecipeNotFound />;
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
            Created on {formatDate(recipe.created_at)}
          </p>
        </header>

        {/* Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Components</h2>
          <MediaComponentDisplay components={recipe.components} />
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
