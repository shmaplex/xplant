"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import Loader from "@/components/ui/Loader";
import Image from "next/image";
import type { GuideSection } from "@/lib/types";

const SHOW_TITLE = false;

export default function UserGuidePage() {
  const [sections, setSections] = useState<GuideSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setCanEdit(false);
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setCanEdit(profile?.role === "admin");

      const { data, error: guideError } = await supabase
        .from("user_guides")
        .select("*")
        .order("sort_order", { ascending: true, nullsFirst: false })
        .order("section_id", { ascending: true });

      if (guideError) {
        setError("Unable to load the user guide at this time.");
        setSections([]);
      } else {
        // fallback sort if sort_order is null
        const sorted = (data ?? []).sort(
          (a, b) =>
            (a.sort_order ?? 9999) - (b.sort_order ?? 9999) ||
            a.section_id.localeCompare(b.section_id)
        );
        setSections(sorted);
      }
    } catch (err) {
      setError("An unexpected error occurred while loading the guide.");
      setSections([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <Loader
        message="Loading XPlant User Guide…"
        iconColor="text-psybeam-purple"
        mainBgColor="bg-milk-bio/10"
        bgColor="bg-psybeam-purple/40"
        textColor="text-moss-shadow"
      />
    );

  if (error || sections.length === 0)
    return (
      <main className="max-w-4xl mx-auto p-8 min-h-[60vh] flex justify-center flex-col">
        <h1 className="text-3xl font-bold mb-6 text-center">
          <Image
            src="/svg/shmaplexplant-logo.svg"
            alt="XPlant Logo"
            width={300}
            height={80}
          />
          User Guide
        </h1>
        <p className="text-center text-bio-red mb-6">
          {error ?? "The user guide is currently unavailable."}
        </p>
        <div className="text-center">
          <button
            onClick={() => fetchData()}
            className="px-4 py-2 bg-bio-red text-white rounded hover:bg-bio-red-dark transition duration-500 ease-in-out"
          >
            Retry
          </button>
        </div>
        {canEdit && (
          <Link
            href="/admin/user-guide/edit"
            className="fixed bottom-5 right-6 sm:right-24 bg-future-lime hover:bg-lime-500 text-black font-medium shadow-lg rounded-full px-6 py-3 transition-colors duration-300 z-50 flex justify-center items-center whitespace-nowrap"
          >
            <FiEdit className="w-5 h-5 mr-2" /> Edit User Guide
          </Link>
        )}
      </main>
    );

  return (
    <main className="relative min-h-screen bg-milk-bio">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(179,239,72,0.12),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(211,168,249,0.12),transparent_60%)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto flex gap-8 mt-6">
        {/* Floating Left Nav */}
        <nav className="w-64 sticky top-8 self-start bg-milk-bio/90 backdrop-blur rounded-xl shadow-lg border border-spore-grey p-6">
          <h2 className="text-lg font-semibold mb-4 text-moss-shadow tracking-wide">
            Guide Sections
          </h2>
          <ul className="space-y-1">
            {sections.map(({ section_id, title }) => (
              <li key={section_id}>
                <a
                  href={`#${section_id}`}
                  className="block px-3 py-2 rounded-lg text-moss-shadow hover:bg-psybeam-purple/20 hover:text-psybeam-purple-dark transition-all duration-200"
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-10 text-moss-shadow">
            XPlant User Guide
          </h1>

          {sections.map(({ section_id, title, content }) => (
            <section
              key={section_id}
              id={section_id}
              className="mb-16 scroll-mt-20"
            >
              {SHOW_TITLE && (
                <h2 className="text-2xl font-semibold mb-4">{title}</h2>
              )}
              <div className="prose max-w-none text-moss-shadow">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  rehypePlugins={[rehypeRaw]}
                  skipHtml={false}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </section>
          ))}
        </div>
      </div>

      {canEdit && (
        <Link
          href="/admin/user-guide/edit"
          className="fixed bottom-5 right-6 sm:right-24 bg-future-lime hover:bg-lime-500 text-black font-medium shadow-lg rounded-full px-6 py-3 transition-colors duration-300 z-50 flex justify-center items-center whitespace-nowrap"
        >
          <FiEdit className="w-5 h-5 mr-2" /> Edit User Guide
        </Link>
      )}
    </main>
  );
}
