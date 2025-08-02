import { useEffect, useState, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import matter from "gray-matter";
import { useAutosave } from "@/hooks/useAutosave";

export type GuideSection = {
  id?: string;
  section_id: string;
  title: string;
  content: string;
};

export function useUserGuideSection(
  sectionId: string,
  options: { useFrontmatter?: boolean } = {}
) {
  const { useFrontmatter = false } = options;
  const supabase = createClient();

  const [section, setSection] = useState<GuideSection | null>(null);
  const [markdown, setMarkdown] = useState(""); // full markdown (frontmatter + content)
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  const lastSavedMarkdown = useRef<string>("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setAccessDenied(false);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      setAccessDenied(true);
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
      setAccessDenied(true);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("user_guides")
      .select("*")
      .eq("section_id", sectionId)
      .maybeSingle();

    if (error) {
      console.error(error);
      setError("Unable to load this guide section right now.");
      setLoading(false);
      return;
    }

    if (!data) {
      const defaultTitle =
        sectionId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ||
        "Untitled Section";

      const defaultMarkdown = useFrontmatter
        ? matter.stringify("", {
            title: defaultTitle,
            section_id: sectionId,
          })
        : "";

      setSection({
        section_id: sectionId,
        title: defaultTitle,
        content: defaultMarkdown,
      });

      setMarkdown(defaultMarkdown);
      setTitle(defaultTitle);
      lastSavedMarkdown.current = defaultMarkdown;
    } else {
      setSection(data);
      setMarkdown(data.content);

      if (useFrontmatter) {
        try {
          const parsed = matter(data.content || "");
          setTitle(parsed.data.title || data.title || "");
        } catch {
          setTitle(data.title || "");
        }
      } else {
        setTitle(data.title || "");
      }

      lastSavedMarkdown.current = data.content;
    }

    setLoading(false);
  }, [sectionId, supabase, useFrontmatter]);

  // Sync title into frontmatter inside markdown
  const updateTitleInMarkdown = useCallback(
    (newTitle: string) => {
      try {
        const parsed = matter(markdown);
        const updatedMarkdown = matter.stringify(parsed.content ?? "", {
          ...parsed.data,
          title: newTitle,
        });
        setMarkdown(updatedMarkdown);
      } catch {
        // fallback if parsing fails
        const updatedMarkdown = matter.stringify(markdown, { title: newTitle });
        setMarkdown(updatedMarkdown);
      }
    },
    [markdown]
  );

  useEffect(() => {
    if (!useFrontmatter) return;
    if (title.trim()) {
      updateTitleInMarkdown(title.trim());
    }
  }, [title, updateTitleInMarkdown, useFrontmatter]);

  const save = useCallback(async () => {
    if (markdown.trim() === lastSavedMarkdown.current) return;
    if (!title.trim()) return;
    if (accessDenied) return;

    setSaving(true);

    const { error } = await supabase.from("user_guides").upsert(
      {
        section_id: sectionId,
        title,
        content: markdown,
        updated_at: new Date(),
      },
      { onConflict: "section_id" }
    );

    if (!error) {
      const trimmedMarkdown = markdown.trim();
      if (trimmedMarkdown === lastSavedMarkdown.current) return;
      lastSavedMarkdown.current = trimmedMarkdown;
      setLastSavedAt(new Date());

      // Update sidebar if available
      const event = new CustomEvent("userGuideSectionUpdated", {
        detail: { section_id: sectionId, title },
      });
      window.dispatchEvent(event);
    } else {
      console.error("Failed to save", error);
      alert("Failed to save section");
    }

    setSaving(false);
  }, [markdown, title, sectionId, supabase, accessDenied]);

  const deleteSection = useCallback(async () => {
    if (!confirm("Are you sure you want to delete this section?")) return;
    setSaving(true);
    const { error } = await supabase
      .from("user_guides")
      .delete()
      .eq("section_id", sectionId);
    setSaving(false);

    if (error) {
      alert("Failed to delete");
    } else {
      alert("Section deleted!");
      setSection(null);
    }
  }, [sectionId, supabase]);

  // Use new autosave hook (debounced + interval)
  useAutosave(save, [markdown, title], { debounceMs: 1500, intervalMs: 45000 });

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    section,
    markdown,
    setMarkdown,
    title,
    setTitle,
    saving,
    loading,
    accessDenied,
    error,
    lastSavedAt,
    loadData,
    save,
    deleteSection,
  };
}
