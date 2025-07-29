"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

type MediaComponent = {
  name: string;
  qty: string;
};

type MediaRecipe = {
  id: string;
  title: string;
  components?: MediaComponent[];
  linked_plant_ids?: string[];
  created_at?: string;
};

export default function MediaRecipeList() {
  const supabase = createClientComponentClient();
  const [recipes, setRecipes] = useState<MediaRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("media_recipes")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setRecipes(data);
      setLoading(false);
    })();
  }, []);

  if (loading)
    return <p className="text-center text-sm text-spore-grey">Loading...</p>;

  if (recipes.length === 0) {
    return (
      <div className="text-center text-spore-grey mt-10">
        <p className="text-lg font-medium">No media recipes yet.</p>
        <p className="text-sm">Add one using the form.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="bg-white rounded-2xl shadow p-5 border border-spore-grey/30 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold text-biochar-black mb-3">
            {recipe.title}
          </h3>

          <div className="mb-3 text-sm text-moss-shadow space-y-1 min-h-[60px]">
            {Array.isArray(recipe.components) &&
            recipe.components.length > 0 ? (
              recipe.components.map((comp, i) => (
                <div key={i}>
                  <span className="font-semibold">{comp.name}</span>: {comp.qty}
                </div>
              ))
            ) : (
              <p className="italic text-gray-400">No components listed.</p>
            )}
          </div>

          {Array.isArray(recipe.linked_plant_ids) &&
            recipe.linked_plant_ids.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-psybeam-purple mb-2">
                  Linked Plants
                </p>
                <div className="flex flex-wrap gap-2">
                  {recipe.linked_plant_ids.map((pid) => (
                    <Link
                      key={pid}
                      href={`/dashboard/plants/${pid}`}
                      className="bg-future-lime text-biochar-black text-xs px-2 py-1 rounded hover:underline"
                    >
                      {pid.slice(0, 6)}...
                    </Link>
                  ))}
                </div>
              </div>
            )}
        </div>
      ))}
    </div>
  );
}
