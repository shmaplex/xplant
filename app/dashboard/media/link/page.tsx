"use client";

import MediaRecipeLinker from "@/components/dashboard/media/MediaRecipeLinker";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Toaster } from "react-hot-toast";

const ACCENT_COLOR = "text-[#5b3fa8]";

export default function LinkMediaPage() {
  return (
    <div className="w-full p-8 bg-spore-gray">
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto min-h-screen bg-white/40 p-12 rounded-2xl">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Media Recipes", href: "/dashboard/media" },
            { label: "Link Media" },
          ]}
        />

        <header className="space-y-4 text-center sm:text-left mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-biochar-black">
            Link <span className={ACCENT_COLOR}>Media Recipes</span>
          </h1>
          <p className="text-base text-moss-shadow max-w-2xl">
            Link your existing media recipes to specific plants.
          </p>
        </header>

        <MediaRecipeLinker />
      </div>
    </div>
  );
}
