"use client";

import { useEffect, useState } from "react";
import type { Guide } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

export default function GuideSuggestionEngine({ tags }: { tags: string[] }) {
  const [suggestions, setSuggestions] = useState<Guide[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (tags.length === 0) {
        setSuggestions([]);
        return;
      }

      const { data, error } = await supabase
        .from("guides")
        .select("*")
        .contains("tags", tags);

      if (error) {
        console.error("Failed to fetch guide suggestions:", error);
        setSuggestions([]);
        return;
      }

      if (data) setSuggestions(data);
    };

    fetchSuggestions();
  }, [tags, supabase]);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Suggested Guides</h3>
      <ul className="grid gap-2">
        {suggestions.map((g) => (
          <li key={g.id} className="border-b pb-1">
            <a
              href={`/dashboard/guides/${g.id}`}
              className="text-moss-shadow underline"
            >
              {g.title}
            </a>
            {g.summary && <p className="text-sm text-gray-600">{g.summary}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
