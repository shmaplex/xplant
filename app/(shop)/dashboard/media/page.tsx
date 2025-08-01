"use client";

import MediaRecipeList from "@/components/dashboard/media/MediaRecipeList";
import Link from "next/link";
import { FiLink, FiPlus } from "react-icons/fi";

const ACCENT_COLOR = "text-psybeam-purple-dark"; // darker purple

function MediaActions() {
  return (
    <div className="fixed bottom-5 right-6 sm:right-24">
      <div className="flex space-x-4">
        <Link
          href="/dashboard/media/link"
          className="flex items-center space-x-2 bg-psybeam-purple/50 hover:bg-psybeam-purple
            text-black font-medium shadow-lg rounded-full
            px-6 py-3
            transition-colors duration-300"
        >
          <FiLink className="w-5 h-5" />
          <span>Link Media</span>
        </Link>

        <Link
          href="/dashboard/media/new"
          className="flex items-center space-x-2 bg-psybeam-purple/50 hover:bg-psybeam-purple
            text-black font-medium shadow-lg rounded-full
            px-6 py-3
            transition-colors duration-300"
        >
          <FiPlus className="w-5 h-5" />
          <span>Add Media</span>
        </Link>
      </div>
    </div>
  );
}

export default function MediaPage() {
  return (
    <div className="w-full p-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 rounded-3xl bg-[radial-gradient(circle_at_top_right,rgba(211,168,249,0.3),transparent_70%)] blur-3xl pointer-events-none"
      />
      <div className="max-w-6xl mx-auto space-y-12 min-h-screen p-12 rounded-2xl">
        {/* Page Header */}
        <header className="space-y-4 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-biochar-black">
            Manage <span className={ACCENT_COLOR}>Media Recipes</span>
          </h1>
          <p className="text-base text-moss-shadow max-w-2xl">
            Review your media recipes, or add/link them using the navigation.
          </p>
        </header>

        <MediaRecipeList />
      </div>

      {/* Floating Add Media button */}
      <MediaActions />
    </div>
  );
}
