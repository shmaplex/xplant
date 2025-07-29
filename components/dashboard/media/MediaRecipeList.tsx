"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MediaRecipe } from "@/lib/types";
import MediaRecipeCard from "@/components/dashboard/media/MediaRecipeCard";

export default function MediaRecipeList() {
  const supabase = createClient();
  const [recipes, setRecipes] = useState<MediaRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("media_recipes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching media recipes:", error);
        setLoading(false);
        return;
      }

      if (data) setRecipes(data);
      setLoading(false);
    })();
  }, [supabase]);

  if (loading) {
    return (
      <p className="text-center text-sm text-spore-grey py-20">
        Loading media recipes...
      </p>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-xl shadow-md border border-gray-200">
        <svg
          className="w-16 h-16 mb-6 text-psybeam-purple"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-3-3v6m4.5-9a6 6 0 11-9 0 6 6 0 019 0z"
          />
        </svg>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          No Media Recipes Yet
        </h3>
        <p className="text-center text-gray-500 max-w-xs">
          It looks like you haven’t added any media recipes yet. Get started by
          clicking the “Add Media” button above to create your first recipe!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {recipes.map((recipe) => (
        <MediaRecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
