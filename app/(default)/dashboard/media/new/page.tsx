"use client";

import MediaRecipeForm from "@/components/dashboard/media/MediaRecipeForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const ACCENT_COLOR = "text-psybeam-purple-dark";

export default function NewMediaRecipePage() {
  return (
    <div className="w-full p-8 bg-psybeam-purple/20">
      <div className="max-w-4xl mx-auto min-h-screen bg-white/40 p-12 rounded-2xl">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Media Recipes", href: "/dashboard/media" },
            { label: "Add New" },
          ]}
        />

        <header className="space-y-4 text-center sm:text-left mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-biochar-black">
            Add <span className={ACCENT_COLOR}>New Media Recipe</span>
          </h1>
          <p className="text-base text-moss-shadow max-w-2xl">
            Create a new media recipe entry for your cultured plants.
          </p>
        </header>

        <section className="relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-milk-bio via-spore-grey/10 to-milk-bio">
          <div className="absolute inset-0 bg-[url('/png/asfalt-light.png')] bg-repeat opacity-5 pointer-events-none"></div>
          <div className="relative p-8">
            <MediaRecipeForm />
          </div>
        </section>
      </div>
    </div>
  );
}
