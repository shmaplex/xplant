"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { products } from "@/data/products";

export default function SeedAdminPanel() {
  const supabase = createClient();
  const [loading, setLoading] = useState<null | "user" | "products">(null);
  const [message, setMessage] = useState<string | null>(null);

  const seedUser = async () => {
    setLoading("user");
    setMessage(null);

    const { data, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !data.session?.user?.id) {
      setLoading(null);
      setMessage("Could not get user session.");
      return;
    }

    const { error } = await supabase.rpc("seed_new_user", {
      user_uuid: data.session.user.id,
    });

    if (error) {
      console.error(error);
      setMessage("Failed to seed user data.");
    } else {
      setMessage("User sample data seeded successfully!");
    }
    setLoading(null);
  };

  const seedProducts = async () => {
    setLoading("products");
    setMessage(null);

    for (const p of products) {
      const { error: prodError } = await supabase.from("products").upsert({
        id: p.id,
        title: p.title,
        image: p.image,
        category: p.category,
        subcategory: p.subcategory,
        tag: p.tag,
        description: p.description,
        images: p.images ?? [],
        features: p.features ?? [],
        specs: p.specs ?? {},
        youtube_video_id: p.youtubeVideoId ?? null,
      });

      if (prodError) {
        console.error("Error inserting product", p.id, prodError);
        continue;
      }

      for (const v of p.variants) {
        const { error: varError } = await supabase
          .from("product_variants")
          .upsert({
            id: v.id,
            product_id: p.id,
            title: v.title,
            price: v.price,
          });

        if (varError) {
          console.error("Error inserting variant", v.id, varError);
        }
      }
    }

    setMessage("Products and variants seeded successfully!");
    setLoading(null);
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12 space-y-8">
      <h1 className="text-2xl font-bold text-[var(--moss-shadow)]">
        🧪 Seed Admin Tools
      </h1>

      <div>
        <p className="mb-4 text-gray-700">
          Seed sample plants, tasks, transfers, and media recipes for the logged
          in user.
        </p>
        <button
          onClick={seedUser}
          disabled={loading !== null}
          className="bg-[var(--future-lime)] hover:bg-lime-500 text-black px-4 py-2 rounded-md font-medium disabled:opacity-50"
        >
          {loading === "user" ? "Seeding..." : "Seed User Data"}
        </button>
      </div>

      <div>
        <p className="mb-4 text-gray-700">
          Seed all products and variants from <code>data/products.ts</code> into
          Supabase.
        </p>
        <button
          onClick={seedProducts}
          disabled={loading !== null}
          className="bg-[var(--future-lime)] hover:bg-lime-500 text-black px-4 py-2 rounded-md font-medium disabled:opacity-50"
        >
          {loading === "products" ? "Seeding..." : "Seed Products"}
        </button>
      </div>

      {message && (
        <div className="mt-4 p-4 rounded-md bg-green-100 text-green-700">
          {message}
        </div>
      )}
    </div>
  );
}
