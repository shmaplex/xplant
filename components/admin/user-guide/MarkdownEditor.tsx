"use client";
import React from "react";

export function MarkdownEditor({
  markdown,
  onChange,
  lastSavedAt,
}: {
  markdown: string;
  onChange: (v: string) => void;
  lastSavedAt: Date | null;
}) {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-xs text-spore-grey pb-2">Markdown Editor</h1>
      <textarea
        className="w-full flex-1 border rounded-lg p-4 font-mono text-lg resize-none"
        value={markdown}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing (including frontmatter)..."
      />
      {lastSavedAt && (
        <p className="text-xs text-gray-500 mt-2">
          Last saved at {lastSavedAt.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}
