"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MediaComponentRow from "./MediaComponentRow";
import { useRouter } from "next/navigation";

type ComponentItem = {
  id: string;
  name: string;
  qty: string;
};

export default function MediaRecipeForm({ recipeId }: { recipeId?: string }) {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [recipeComponents, setRecipeComponents] = useState<ComponentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [allComponentNames, setAllComponentNames] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [linkedProductIds, setLinkedProductIds] = useState<string[]>([]);

  // Initialize empty components if creating new
  useEffect(() => {
    if (!recipeId) {
      setRecipeComponents([{ id: crypto.randomUUID(), name: "", qty: "" }]);
    }
  }, [recipeId]);

  // Fetch recipe details and linked products if editing
  useEffect(() => {
    if (!recipeId) return;

    const loadRecipe = async () => {
      // Fetch recipe
      const { data, error } = await supabase
        .from("media_recipes")
        .select("title, components")
        .eq("id", recipeId)
        .maybeSingle();

      if (error) {
        console.error("Failed to fetch recipe:", error);
        return;
      }

      if (data) {
        setTitle(data.title || "");
        setRecipeComponents(
          (data.components || []).map((c: any) => ({
            id: crypto.randomUUID(),
            name: c.name,
            qty: c.qty,
          }))
        );
      }

      // Fetch linked product IDs
      const { data: links, error: linkErr } = await supabase
        .from("media_recipe_products")
        .select("product_id")
        .eq("recipe_id", recipeId);

      if (linkErr) {
        console.error("Failed to fetch linked products:", linkErr);
      } else {
        setLinkedProductIds(links.map((row) => row.product_id));
      }
    };

    loadRecipe();
  }, [recipeId, supabase]);

  // Fetch all unique component names for suggestions
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

  // Fetch product list
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("id,title")
        .order("title");

      if (error) {
        console.error("Error loading products:", error);
        return;
      }
      setProducts(data || []);
    }
    fetchProducts();
  }, [supabase]);

  const toggleLinkedProduct = (id: string) => {
    setLinkedProductIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

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

    // Step 1: Upsert the recipe (without linked_product_ids)
    const { data: saved, error } = await supabase
      .from("media_recipes")
      .upsert(
        [
          {
            id: recipeId,
            user_id: session.user.id,
            title,
            components: cleanComponents,
          },
        ],
        { onConflict: "id" }
      )
      .select("id")
      .single();

    if (error || !saved?.id) {
      setLoading(false);
      toast.error("Failed to save recipe.");
      console.error(error);
      return;
    }

    const recipe_id = saved.id;

    // Step 2: Update the join table
    // Remove old links
    const { error: delError } = await supabase
      .from("media_recipe_products")
      .delete()
      .eq("recipe_id", recipe_id);

    if (delError) {
      console.error("Failed to clear old product links:", delError);
    }

    // Insert new links
    if (linkedProductIds.length > 0) {
      const { error: insertError } = await supabase
        .from("media_recipe_products")
        .insert(
          linkedProductIds.map((product_id) => ({
            recipe_id,
            product_id,
          }))
        );

      if (insertError) {
        console.error("Failed to insert product links:", insertError);
      }
    }

    setLoading(false);
    toast.success("Media recipe saved!");

    // Redirect after save
    setTimeout(() => {
      router.push(`/dashboard/media/${recipe_id}`);
    }, 1000);
  };

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

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-moss-shadow mb-2">
          Link to Products
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
          {products.map((p) => {
            const selected = linkedProductIds.includes(p.id);
            return (
              <div
                key={p.id}
                onClick={() => toggleLinkedProduct(p.id)}
                className={`
                  cursor-pointer border rounded-lg p-3 text-sm transition
                  ${
                    selected
                      ? "border-psybeam-purple bg-psybeam-purple/10 shadow-sm"
                      : "border-gray-200 hover:border-psybeam-purple"
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleLinkedProduct(p.id)}
                    className="accent-psybeam-purple cursor-pointer"
                  />
                  <span className="font-medium">{p.title}</span>
                </div>
              </div>
            );
          })}
        </div>
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
