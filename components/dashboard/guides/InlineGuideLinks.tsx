"use client";

import { useEffect, useState } from "react";
import type { Guide } from "@/lib/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function InlineGuideLinks({ keywords }: { keywords: string[] }) {
  const [guides, setGuides] = useState<Guide[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const loadGuides = async () => {
      if (keywords.length === 0) return;
      const { data } = await supabase
        .from("guides")
        .select("*")
        .contains("tags", keywords);
      if (data) setGuides(data);
    };
    loadGuides();
  }, [keywords]);

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
