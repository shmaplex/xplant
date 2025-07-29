"use client";

import { useEffect, useState } from "react";
import type { Guide } from "@/lib/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function GuideSuggestionEngine({ tags }: { tags: string[] }) {
  const [suggestions, setSuggestions] = useState<Guide[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (tags.length === 0) return;
      const { data } = await supabase
        .from("guides")
        .select("*")
        .contains("tags", tags);
      if (data) setSuggestions(data);
    };
    fetchSuggestions();
  }, [tags]);

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
