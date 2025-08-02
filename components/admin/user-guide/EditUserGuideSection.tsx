"use client";

import Loader from "@/components/ui/Loader";
import { useUserGuideSection } from "@/hooks/useUserGuideSection";
import { MarkdownEditor } from "./MarkdownEditor";
import { LivePreview } from "./LivePreview";

export default function EditUserGuideSection({
  sectionId,
  isFullscreen = false,
  useFrontmatter = false,
}: {
  sectionId: string;
  isFullscreen?: boolean;
  useFrontmatter?: boolean;
}) {
  const {
    section,
    title,
    markdown,
    setTitle,
    setMarkdown,
    saving,
    loading,
    accessDenied,
    error,
    lastSavedAt,
    loadData,
    save,
    deleteSection,
  } = useUserGuideSection(sectionId, { useFrontmatter });

  if (loading)
    return (
      <Loader
        message="Loading guide section for editing…"
        iconColor="text-future-lime"
        mainBgColor="bg-milk-bio/10"
        bgColor="bg-future-lime/40"
        textColor="text-gray-700"
      />
    );

  if (accessDenied)
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600">
          You don&apos;t have permission to edit this guide section.
        </p>
      </div>
    );

  if (error)
    return (
      <div className="max-w-2xl mx-auto p-8 text-center min-h-[60vh] flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-bio-red mb-6">{error}</p>
        <button
          onClick={loadData}
          className="px-4 py-2 bg-bio-red text-white rounded hover:bg-bio-red-dark transition"
        >
          Retry
        </button>
      </div>
    );

  if (!section)
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Section Deleted</h1>
        <p className="text-gray-600">
          This section was deleted. You can create a new one by reloading.
        </p>
      </div>
    );

  if (isFullscreen) {
    return (
      <div className="flex h-full w-full">
        <div className="w-1/2 h-full p-6">
          <MarkdownEditor
            markdown={markdown}
            onChange={setMarkdown}
            lastSavedAt={lastSavedAt}
          />
        </div>
        <div className="w-1/2 h-full p-6 overflow-auto bg-white">
          <h1 className="text-xs text-spore-grey pb-2">Live Preview</h1>
          <LivePreview markdown={markdown} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">
          Edit Guide Section: {section.section_id}
        </h1>
        <input
          type="text"
          className="w-full border rounded p-2 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Section Title"
        />
        <textarea
          className="w-full h-[400px] border rounded p-2 mb-2 font-mono"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Section Content (Markdown with frontmatter supported)"
        />
        {lastSavedAt && (
          <p className="text-xs text-gray-500 mt-2">
            Last saved at {lastSavedAt.toLocaleTimeString()}
          </p>
        )}

        <div className="flex gap-4 mt-4">
          <button
            onClick={save}
            disabled={saving}
            className={`font-semibold px-6 py-3 rounded-lg w-full transition-colors duration-300
            ${
              saving
                ? "bg-lichen-blue-light cursor-not-allowed text-lichen-blue-dark"
                : "bg-lichen-blue-dark hover:bg-lichen-blue text-white shadow-md"
            }`}
          >
            {saving ? "Saving..." : "Save"}
          </button>

          <button
            onClick={deleteSection}
            disabled={saving}
            className={`font-semibold px-6 py-3 rounded-lg w-full transition-colors duration-300
            ${
              saving
                ? "bg-bio-red-light cursor-not-allowed text-bio-red"
                : "bg-bio-red hover:bg-bio-red-dark text-white shadow-md"
            }`}
          >
            Delete
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
        <div className="prose border rounded p-4 h-full overflow-auto bg-white">
          <LivePreview markdown={markdown} />
        </div>
      </div>
    </div>
  );
}
