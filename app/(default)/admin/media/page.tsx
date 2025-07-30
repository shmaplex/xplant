"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type MediaComponent = {
  name: string;
  qty: string;
};

type MediaRecipeWithUser = {
  id: string;
  title: string;
  user_id: string;
  components: MediaComponent[];
  origin?: string | null;
  status?: string | null;
  created_at: string;
  user?: {
    full_name?: string | null;
    email: string;
  } | null;
};

export default function MediaRecipesAdminPage() {
  const supabase = createClient();
  const [recipes, setRecipes] = useState<MediaRecipeWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);

      // Adjust the table/view name if you have a view with joined user info
      const { data, error } = await supabase
        .from("media_recipes_with_profiles")
        .select(
          `
            id,
            title,
            user_id,
            components,
            origin,
            status,
            created_at,
            user
          `
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching media recipes:", error);
        setRecipes([]);
      } else {
        setRecipes(data || []);
      }

      setLoading(false);
    }

    fetchRecipes();
  }, [supabase]);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-[var(--moss-shadow)] mb-6">
        Media Recipes
      </h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-lime-400 border-t-transparent rounded-full" />
        </div>
      ) : recipes.length === 0 ? (
        <p className="text-center text-gray-600 py-12">
          No media recipes found.
        </p>
      ) : (
        <table className="w-full border-collapse border rounded-xl shadow-md overflow-hidden">
          <thead className="bg-[var(--spore-grey)]">
            <tr>
              <th className="border px-4 py-3 text-left">Title</th>
              <th className="border px-4 py-3 text-left">Components</th>
              <th className="border px-4 py-3 text-left">Origin</th>
              <th className="border px-4 py-3 text-left">Status</th>
              <th className="border px-4 py-3 text-left">Added By</th>
              <th className="border px-4 py-3 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, i) => (
              <tr
                key={recipe.id}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border px-4 py-2 font-semibold">
                  {recipe.title}
                </td>
                <td className="border px-4 py-2 text-sm">
                  {recipe.components
                    ?.map((c) => `${c.name}: ${c.qty}`)
                    .join(", ") || "-"}
                </td>
                <td className="border px-4 py-2">{recipe.origin || "-"}</td>
                <td className="border px-4 py-2">{recipe.status || "-"}</td>
                <td className="border px-4 py-2">
                  {recipe.user?.full_name || recipe.user?.email || "Unknown"}
                </td>
                <td className="border px-4 py-2">
                  {new Date(recipe.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
