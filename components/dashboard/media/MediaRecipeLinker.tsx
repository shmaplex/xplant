"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClient } from "@/lib/supabase/client";

type PlantOption = {
  id: string;
  species: string;
};

type RecipeOption = {
  id: string;
  title: string;
};

export default function MediaRecipeLinker() {
  const supabase = createClient();
  const [plants, setPlants] = useState<PlantOption[]>([]);
  const [recipes, setRecipes] = useState<RecipeOption[]>([]);
  const [selected, setSelected] = useState({ plant_id: "", recipe_id: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data: p, error: pError } = await supabase
        .from("plants")
        .select("id, species");
      const { data: r, error: rError } = await supabase
        .from("media_recipes")
        .select("id, title");

      if (pError) {
        console.error("Error loading plants:", pError);
        toast.error("Failed to load plants.");
      }
      if (rError) {
        console.error("Error loading recipes:", rError);
        toast.error("Failed to load recipes.");
      }
      if (p) setPlants(p);
      if (r) setRecipes(r);
    };

    load();
  }, [supabase]);

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
      if (error.code === "23505") {
        // duplicate key value
        toast.info("This plant is already linked to the selected recipe.");
      } else {
        toast.error("Failed to link recipe.");
        console.error(error);
      }
    } else {
      toast.success("Media recipe linked to plant!");
      setSelected({ plant_id: "", recipe_id: "" });
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow rounded-2xl p-6 space-y-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-moss-shadow">
        Link Media Recipe to Plant
      </h2>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-moss-shadow">
          Select Plant
        </label>
        <select
          value={selected.plant_id}
          onChange={(e) =>
            setSelected({ ...selected, plant_id: e.target.value })
          }
          className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-psybeam-purple focus:outline-none"
        >
          <option value="">— Choose a plant —</option>
          {plants.map((p) => (
            <option key={p.id} value={p.id}>
              {p.species}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-moss-shadow">
          Select Media Recipe
        </label>
        <select
          value={selected.recipe_id}
          onChange={(e) =>
            setSelected({ ...selected, recipe_id: e.target.value })
          }
          className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-psybeam-purple focus:outline-none"
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
        className="w-full bg-psybeam-purple text-white font-semibold py-2.5 rounded-lg hover:bg-psybeam-purple/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Linking…" : "Link Recipe"}
      </button>
    </div>
  );
}
