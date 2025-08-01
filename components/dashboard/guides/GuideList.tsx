"use client";

import { useEffect, useState } from "react";
import type { Guide } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function GuideList({ limit }: { limit?: number }) {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [filter, setFilter] = useState("");

  const supabase = createClient();

  useEffect(() => {
    const loadGuides = async () => {
      const { data, error } = await supabase.from("guides").select("*");
      if (error) {
        console.error("Failed to load guides:", error);
        return;
      }
      if (data) setGuides(data);
    };
    loadGuides();
  }, [supabase]);

  // Apply filter
  let filtered = guides.filter((g) =>
    filter.trim() === ""
      ? true
      : g.tags?.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
  );

  // Apply limit if provided
  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  return (
    <div className="relative space-y-8">
      {/* Filter */}
      <div>
        <label
          htmlFor="filter"
          className="block text-moss-shadow font-semibold mb-2"
        >
          Filter by tag
        </label>
        <input
          id="filter"
          type="text"
          placeholder="e.g., orchid"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full border border-spore-grey rounded-lg px-4 py-3 text-biochar-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-future-lime"
        />
      </div>

      {/* Guides grid */}
      {filtered.length > 0 ? (
        <ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-h-[45vh] overflow-auto py-10"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          {filtered.map((guide) => (
            <Link key={guide.id} href={guide.url} target="_blank">
              <li className="bg-white rounded-2xl shadow border border-spore-grey/30 p-5 hover:shadow-md transition hover:border-future-lime">
                <h3 className="font-bold text-lg text-biochar-black mb-2">
                  {guide.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{guide.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {guide.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-spore-grey/20 text-moss-shadow text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="italic text-moss-shadow">
          {filter
            ? "No guides found matching that tag."
            : "No guides available yet."}
        </p>
      )}
    </div>
  );
}
