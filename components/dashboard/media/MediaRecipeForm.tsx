"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MediaComponentRow from "./MediaComponentRow";

type ComponentItem = {
  id: string;
  name: string;
  qty: string;
};

export default function MediaRecipeForm() {
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [recipeComponents, setRecipeComponents] = useState<ComponentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [allComponentNames, setAllComponentNames] = useState<string[]>([]);

  // Add initial blank component only on client
  useEffect(() => {
    setRecipeComponents([{ id: crypto.randomUUID(), name: "", qty: "" }]);
  }, []);

  // Fetch existing component names for suggestions
  useEffect(() => {
    const fetchComponents = async () => {
      const { data, error } = await supabase
        .from("media_recipes")
        .select("components");
      if (error) {
        console.error(error);
        return;
      }

      const names = new Set<string>();
      data?.forEach((recipe) => {
        if (Array.isArray(recipe.components)) {
          recipe.components.forEach((c: any) => {
            if (c.name) names.add(c.name);
          });
        }
      });
      setAllComponentNames(Array.from(names).sort());
    };
    fetchComponents();
  }, [supabase]);

  const handleComponentChange = (
    id: string,
    field: "name" | "qty",
    value: string
  ) => {
    setRecipeComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, [field]: value } : comp))
    );
  };

  const addComponent = () => {
    setRecipeComponents((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", qty: "" },
    ]);
  };

  const removeComponent = (id: string) => {
    setRecipeComponents((prev) => prev.filter((comp) => comp.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.warning("Recipe title is required.");
      return;
    }

    const cleanComponents = recipeComponents.filter(
      (c) => c.name.trim() && c.qty.trim()
    );

    if (cleanComponents.length === 0) {
      toast.warning("At least one component is required.");
      return;
    }

    setLoading(true);

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user?.id) {
      toast.error("User session not found. Please log in.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("media_recipes").upsert(
      [
        {
          user_id: session.user.id,
          name: title,
          components: cleanComponents,
        },
      ],
      { onConflict: "unique_user_title" }
    );

    setLoading(false);

    if (error) {
      toast.error("Failed to save recipe.");
      console.error(error);
    } else {
      toast.success("Media recipe saved!");
      setTitle("");
      setRecipeComponents([{ id: crypto.randomUUID(), name: "", qty: "" }]);
    }
  };

  // Don't render anything until components are initialized on the client
  if (recipeComponents.length === 0) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-moss-shadow mb-1">
          Recipe Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input w-full rounded border border-spore-grey/50 focus:ring-2 focus:ring-psybeam-purple focus:outline-none p-2"
          placeholder="Enter recipe title"
          required
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-moss-shadow mb-2">
          Components
        </legend>
        {recipeComponents.map((comp) => (
          <MediaComponentRow
            key={comp.id}
            id={comp.id}
            name={comp.name}
            qty={comp.qty}
            onChange={handleComponentChange}
            onRemove={removeComponent}
            disableRemove={recipeComponents.length === 1}
            suggestions={allComponentNames}
          />
        ))}

        <button
          type="button"
          onClick={addComponent}
          className="text-sm text-psybeam-purple hover:underline mt-2"
        >
          + Add another component
        </button>
      </fieldset>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-psybeam-purple text-white font-semibold py-2 rounded hover:bg-psybeam-purple/90 transition disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Recipe"}
      </button>
    </form>
  );
}
