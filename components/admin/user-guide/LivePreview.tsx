"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import matter from "gray-matter";

export function LivePreview({ markdown }: { markdown: string }) {
  let content = "";
  try {
    const parsed = matter(markdown);
    content = parsed.content.trim();
    if (!content) {
      content = markdown; // fallback to full markdown (including frontmatter)
    }
  } catch {
    content = markdown;
  }

  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        skipHtml={false}
      >
        {content || "No content to preview"}
      </ReactMarkdown>
    </div>
  );
}
