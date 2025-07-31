"use client";

import React from "react";
import { FiUpload } from "react-icons/fi";

export default function PlantMediaSection({
  title,
  children,
  showUploader = false,
  plantId,
}: {
  title?: string;
  children: React.ReactNode;
  showUploader?: boolean;
  plantId?: string;
}) {
  return (
    <section className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 sm:p-8 max-w-6xl mx-auto space-y-8">
      {title && (
        <h2
          className={`text-2xl font-extrabold text-biochar-black dark:text-white flex items-center gap-3 ${
            showUploader ? "mb-4" : ""
          }`}
        >
          {showUploader && <FiUpload className="text-3xl text-future-lime" />}
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
