"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import EditUserGuideSection from "@/components/admin/user-guide/EditUserGuideSection";
import { FiBookOpen, FiMinimize, FiSave } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { UserGuideSidebar } from "@/components/admin/user-guide/UserGuideSidebar";
import type { GuideSection } from "@/lib/types";

export default function EditSectionPage() {
  const searchParams = useSearchParams();
  const sectionId = searchParams.get("sectionId") || "";
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sections, setSections] = useState<GuideSection[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const supabase = createClient();
  const router = useRouter();

  // Fetch all sections including content and sort_order
  async function fetchSections() {
    const { data, error } = await supabase
      .from("user_guides")
      .select("section_id,title,content,sort_order")
      .order("sort_order", { ascending: true })
      .order("section_id", { ascending: true }); // fallback ordering

    if (!error && data) {
      // Sort client-side just in case
      const sorted = data.sort((a, b) => {
        const aOrder = a.sort_order ?? 9999;
        const bOrder = b.sort_order ?? 9999;
        return aOrder - bOrder || a.section_id.localeCompare(b.section_id);
      });
      setSections(sorted);
    } else if (error) {
      console.error("Error fetching sections:", error);
    }
  }

  useEffect(() => {
    fetchSections();
  }, []);

  // Create a new section with default content and title
  const handleNewSection = async () => {
    const newId = prompt(
      "Enter a unique ID for the new section (use hyphens for spaces):"
    );
    if (!newId) return;

    if (sections.find((s) => s.section_id === newId)) {
      alert("Section ID already exists.");
      router.push(`/admin/user-guide/edit/${newId}`);
      return;
    }

    const maxSortOrder = sections.reduce((max, s) => {
      const current = s.sort_order ?? -1;
      return current > max ? current : max;
    }, -1);
    const nextSortOrder = maxSortOrder + 1;

    const { error } = await supabase.from("user_guides").insert([
      {
        section_id: newId,
        title: "Untitled",
        content: "", // cannot be null
        sort_order: nextSortOrder,
      },
    ]);

    if (error) {
      alert("Failed to create new section: " + error.message);
      return;
    }

    setSections((prev) => [
      ...prev,
      {
        section_id: newId,
        title: "Untitled",
        content: "",
        sort_order: nextSortOrder,
      },
    ]);
    router.push(`/admin/user-guide/edit/${newId}`);
  };

  // Reorder sections while preserving all required fields
  const handleReorder = async (newOrder: GuideSection[]) => {
    // Update only sort_order to avoid overwriting title/content
    const updates = newOrder.map((s, index) => ({
      section_id: s.section_id,
      sort_order: index,
    }));

    for (const u of updates) {
      const { error } = await supabase
        .from("user_guides")
        .update({ sort_order: u.sort_order })
        .eq("section_id", u.section_id);

      if (error) {
        console.error("Failed to reorder sections", error);
        fetchSections();
        return;
      }
    }

    const updatedSections = sections
      .map((sec) => ({
        ...sec,
        sort_order:
          updates.find((u) => u.section_id === sec.section_id)?.sort_order ??
          sec.sort_order,
      }))
      .sort((a, b) => {
        const aOrder = a.sort_order ?? 9999;
        const bOrder = b.sort_order ?? 9999;
        return aOrder - bOrder || a.section_id.localeCompare(b.section_id);
      });

    setSections(updatedSections);
  };

  useEffect(() => {
    const handler = (e: any) => {
      setSections((prev) =>
        prev.map((sec) =>
          sec.section_id === e.detail.section_id
            ? { ...sec, title: e.detail.title }
            : sec
        )
      );
    };

    window.addEventListener("userGuideSectionUpdated", handler);
    return () => window.removeEventListener("userGuideSectionUpdated", handler);
  }, []);

  return (
    <div
      className={`relative bg-milk-bio min-h-screen transition-all duration-300 ${
        isFullscreen ? "fixed inset-0 z-50 bg-white flex" : "flex p-0"
      } ${sidebarOpen && !isFullscreen ? "ml-64" : "ml-0"}`}
    >
      {!isFullscreen && (
        <UserGuideSidebar
          sections={sections}
          currentSectionId={sectionId}
          sidebarOpen={sidebarOpen}
          onNewSection={handleNewSection}
          onReorder={handleReorder}
          onToggleSidebar={() => setSidebarOpen((open) => !open)}
        />
      )}

      <div className="flex-1 flex flex-col">
        {/* Distraction-Free Button */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="relative group">
            <span
              className="absolute inset-0 rounded-full bg-biochar-black/60 animate-pulseBlur backdrop-blur"
              aria-hidden="true"
            />
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              aria-label={
                isFullscreen
                  ? "Exit Distraction-Free Mode"
                  : "Enter Distraction-Free Mode"
              }
              className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-biochar-black/80 hover:bg-biochar-black text-white transition-colors duration-300 border border-white/20"
            >
              {isFullscreen ? (
                <FiMinimize size={24} />
              ) : (
                <FiBookOpen size={24} />
              )}
            </button>

            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-black/80 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
              {isFullscreen
                ? "Exit Distraction-Free Mode"
                : "Enter Distraction-Free Mode"}
            </div>
          </div>
        </div>

        {isFullscreen && (
          <button
            aria-label="Save"
            className="fixed bottom-6 right-6 z-50 bg-lichen-blue-dark hover:bg-lichen-blue text-white rounded-full p-3 shadow-lg flex items-center gap-2 transition-colors duration-300"
          >
            <FiSave size={20} />
            <span className="hidden sm:inline">Save</span>
          </button>
        )}

        <div className="w-full p-6 overflow-auto">
          <EditUserGuideSection
            sectionId={sectionId}
            isFullscreen={isFullscreen}
            useFrontmatter={false}
          />
        </div>
      </div>
    </div>
  );
}
