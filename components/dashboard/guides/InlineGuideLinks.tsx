"use client";

import { useEffect, useState } from "react";
import type { Guide } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

export default function InlineGuideLinks({ keywords }: { keywords: string[] }) {
  const [guides, setGuides] = useState<Guide[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const loadGuides = async () => {
      if (keywords.length === 0) {
        setGuides([]);
        return;
      }

      const { data, error } = await supabase
        .from("guides")
        .select("*")
        .contains("tags", keywords);

      if (error) {
        console.error("Error loading guides:", error);
        setGuides([]);
        return;
      }

      if (data) setGuides(data);
    };

    loadGuides();
  }, [keywords, supabase]);

  return (
    <div className="bg-psybeam-purple/10 border-l-4 border-psybeam-purple p-3 rounded text-sm">
      <strong>Related Guides:</strong>
      <ul className="list-disc pl-5 mt-2">
        {guides.map((guide) => (
          <li key={guide.id}>
            <a
              href={`/dashboard/guides/${guide.id}`}
              className="underline text-psybeam-purple"
            >
              {guide.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
