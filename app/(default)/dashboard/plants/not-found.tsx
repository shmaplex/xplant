"use client";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-future-lime/20 p-8">
      <div className="bg-white/90 rounded-3xl shadow-lg p-12 text-center">
        <h1 className="text-5xl font-extrabold text-biochar-black">404</h1>
        <p className="mt-4 text-xl text-spore-grey">
          Sorry, we couldn&apos;t find that plant.
        </p>
        <a
          href="/dashboard/plants"
          className="mt-8 inline-block bg-future-lime text-biochar-black px-6 py-3 rounded-xl font-semibold hover:bg-future-lime/80 transition"
        >
          Back to Plants
        </a>
      </div>
    </div>
  );
}
