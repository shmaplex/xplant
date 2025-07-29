// layouts/LegalPage.tsx
import React from "react";

export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-6 py-16 sm:px-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
          {title}
        </h1>
        <div className="prose prose-neutral prose-lg max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
}
