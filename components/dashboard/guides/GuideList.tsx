"use client";

import { useEffect, useState } from "react";
import type { Guide } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

export default function GuideList() {
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

  const filtered = guides.filter((g) =>
    g.tags?.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Filter by tag (e.g., orchid)"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <ul className="grid gap-3">
        {filtered.map((guide) => (
          <li key={guide.id} className="p-4 border rounded-xl bg-white">
            <h3 className="font-semibold text-lg">{guide.title}</h3>
            <p className="text-sm text-gray-600">{guide.summary}</p>
            <div className="flex flex-wrap mt-2 gap-1">
              {guide.tags?.map((tag) => (
                <span
                  key={tag}
                  className="bg-spore-grey text-xs px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
