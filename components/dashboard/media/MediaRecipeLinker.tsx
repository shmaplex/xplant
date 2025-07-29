"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type PlantOption = {
  id: string;
  species: string;
};

type RecipeOption = {
  id: string;
  title: string;
};

export default function MediaRecipeLinker() {
  const supabase = createClientComponentClient();
  const [plants, setPlants] = useState<PlantOption[]>([]);
  const [recipes, setRecipes] = useState<RecipeOption[]>([]);
  const [selected, setSelected] = useState({ plant_id: "", recipe_id: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data: p } = await supabase.from("plants").select("id, species");
      const { data: r } = await supabase
        .from("media_recipes")
        .select("id, title");

      if (p) setPlants(p);
      if (r) setRecipes(r);
    };

    load();
  }, []);

  const link = async () => {
    if (!selected.plant_id || !selected.recipe_id) {
      toast.warning("Please select both a plant and a recipe.");
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from("plant_recipe_links")
      .insert([{ plant_id: selected.plant_id, recipe_id: selected.recipe_id }]);

    setLoading(false);

    if (error) {
      toast.error("Failed to link recipe.");
      console.error(error);
    } else {
      toast.success("Media recipe linked to plant!");
      setSelected({ plant_id: "", recipe_id: "" });
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-moss-shadow mb-1">
          Select Plant
        </label>
        <select
          value={selected.plant_id}
          onChange={(e) =>
            setSelected({ ...selected, plant_id: e.target.value })
          }
          className="input w-full rounded border border-spore-grey/50 p-2 focus:ring-2 focus:ring-psybeam-purple focus:outline-none"
        >
          <option value="">— Choose a plant —</option>
          {plants.map((p) => (
            <option key={p.id} value={p.id}>
              {p.species}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-moss-shadow mb-1">
          Select Media Recipe
        </label>
        <select
          value={selected.recipe_id}
          onChange={(e) =>
            setSelected({ ...selected, recipe_id: e.target.value })
          }
          className="input w-full rounded border border-spore-grey/50 p-2 focus:ring-2 focus:ring-psybeam-purple focus:outline-none"
        >
          <option value="">— Choose a recipe —</option>
          {recipes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.title}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={link}
        disabled={loading}
        className="w-full bg-psybeam-purple text-white font-semibold py-2 rounded hover:bg-psybeam-purple/90 transition disabled:opacity-50"
      >
        {loading ? "Linking..." : "Link"}
      </button>
    </div>
  );
}
