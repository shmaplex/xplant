"use client";

import Link from "next/link";

export default function ProfileNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md w-full backdrop-blur-md rounded-2xl p-8 text-center border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-semibold text-biochar-black mb-4">
          User Profile Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          We couldn&apos;t find a profile with that username. Please check the
          URL or explore other users.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg px-6 py-2 text-sm font-medium transition-colors duration-200"
          style={{
            backgroundColor: "var(--color-future-lime)",
            color: "var(--color-biochar-black)",
          }}
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
