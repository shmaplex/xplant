"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Loader from "@/components/ui/Loader";
import { FiEdit2, FiPlus } from "react-icons/fi";

type GuideSection = {
  section_id: string;
  title: string;
};

export default function EditGuideIndexPage() {
  const supabase = createClient();
  const [sections, setSections] = useState<GuideSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchSections() {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("user_guides")
      .select("section_id,title")
      .order("sort_order", { ascending: true })
      .order("section_id", { ascending: true });

    if (error) {
      console.error("Failed to load guide sections:", error);
      setError("Unable to load guide sections.");
      setSections([]);
    } else {
      setSections(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchSections();
  }, []);

  if (loading)
    return (
      <Loader
        message="Loading guide sections…"
        iconColor="text-future-lime"
        mainBgColor="bg-milk-bio/10"
        bgColor="bg-future-lime/40"
        textColor="text-gray-700"
      />
    );

  return (
    <main className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-moss-shadow">Edit User Guide</h1>
        <Link
          href="/admin/user-guide/edit/new-section"
          className="inline-flex items-center gap-2 bg-future-lime hover:bg-lime-500 text-black font-medium px-4 py-2 rounded-lg shadow transition-colors duration-200"
        >
          <FiPlus className="w-5 h-5" />
          New Section
        </Link>
      </div>

      {error && (
        <div className="bg-bio-red-light border border-bio-red-dark text-bio-red p-4 rounded-lg mb-6">
          <p className="mb-2">{error}</p>
          <button
            onClick={fetchSections}
            className="underline hover:text-bio-red-dark"
          >
            Retry
          </button>
        </div>
      )}

      {sections.length === 0 && !error && (
        <p className="text-gray-600">
          No guide sections yet. Create a new one using the button above or go
          directly to:
          <code className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded">
            /admin/user-guide/edit/getting-started
          </code>
        </p>
      )}

      {sections.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.section_id}
              href={`/admin/user-guide/edit/${s.section_id}`}
              className="group border border-spore-grey bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-semibold text-moss-shadow group-hover:text-psybeam-purple-dark transition-colors">
                  {s.title || s.section_id}
                </h2>
                <FiEdit2 className="text-spore-grey group-hover:text-psybeam-purple-dark transition-colors" />
              </div>
              <p className="mt-2 text-sm text-gray-500 truncate">
                {s.section_id}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
