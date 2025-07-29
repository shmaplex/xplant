"use client";

import MediaRecipeForm from "@/components/dashboard/media/MediaRecipeForm";
import MediaRecipeList from "@/components/dashboard/media/MediaRecipeList";
import MediaRecipeLinker from "@/components/dashboard/media/MediaRecipeLinker";
import { Toaster } from "react-hot-toast";

const ACCENT_COLOR = "text-[#5b3fa8]"; // darker purple

export default function MediaPage() {
  return (
    <div className="w-full p-8 bg-spore-gray">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto space-y-12 min-h-screen bg-white/40 p-12 rounded-2xl">
        {/* Page Header */}
        <header className="space-y-4 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-biochar-black">
            Manage <span className={ACCENT_COLOR}>Media Recipes</span>
          </h1>
          <p className="text-base text-moss-shadow max-w-2xl">
            Add, review, and link media recipes for plants. Organized and styled
            for clarity.
          </p>
        </header>

        {/* Add New Recipe */}
        <section className="relative overflow-hidden rounded-3xl shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-milk-bio via-spore-grey/10 to-milk-bio">
          <div className="absolute inset-0 bg-[url('/png/asfalt-light.png')] bg-repeat opacity-5 pointer-events-none"></div>

          <div className="relative p-8">
            <h2 className={`text-2xl font-bold ${ACCENT_COLOR} mb-6`}>
              ➕ Add New Media Recipe
            </h2>
            <MediaRecipeForm />
          </div>
        </section>

        {/* Recipe List */}
        <section className="relative overflow-hidden rounded-3xl shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-milk-bio via-spore-grey/10 to-milk-bio">
          <div className="absolute inset-0 bg-[url('/png/asfalt-light.png')] bg-repeat opacity-5 pointer-events-none"></div>

          <div className="relative p-8">
            <h2 className={`text-2xl font-bold ${ACCENT_COLOR} mb-6`}>
              📋 Media Recipe List
            </h2>
            <MediaRecipeList />
          </div>
        </section>

        {/* Link Media to Plants */}
        <section className="relative overflow-hidden rounded-3xl shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-milk-bio via-spore-grey/10 to-milk-bio">
          <div className="absolute inset-0 bg-[url('/png/asfalt-light.png')] bg-repeat opacity-5 pointer-events-none"></div>

          <div className="relative p-8">
            <h2 className={`text-2xl font-bold ${ACCENT_COLOR} mb-6`}>
              🔗 Link Media to Plants
            </h2>
            <MediaRecipeLinker />
          </div>
        </section>
      </div>
    </div>
  );
}
