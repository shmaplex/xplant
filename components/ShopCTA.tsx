"use client";

import Link from "next/link";

export function ShopCTA() {
  return (
    <section
      className="relative overflow-hidden py-20 px-8 sm:px-16 rounded-3xl shadow-2xl isolate
             transition-transform duration-500 ease-in-out hover:shadow-3xl hover:-translate-y-2
             bg-gradient-to-b from-milk-bio via-spore-grey/10 to-milk-bio my-20"
    >
      {/* Texture overlay */}
      <div
        className="absolute inset-0 z-0 bg-[url('/png/asfalt-light.png')] bg-repeat opacity-15 pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 px-6 sm:px-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-biochar-black">
          Get Your Organic Tissue Culture Kit
        </h2>
        <p className="text-lg sm:text-xl text-moss-shadow leading-relaxed">
          Shop for plant tissue culture mediums, jars, and everything you need
          to start growing sustainably at home.
        </p>

        <div className="inline-block rounded-xl p-[3px] bg-gradient-to-r from-future-lime/70 via-psybeam-purple/70 to-future-lime/70 shadow-md group hover:shadow-lg transition-shadow">
          <Link
            href="/shop"
            className="flex items-center gap-4 bg-milk-bio group-hover:bg-white text-biochar-black px-10 py-4 rounded-xl text-lg font-semibold tracking-wide transition-colors"
          >
            Visit the Shop
            <svg
              className="w-5 h-5 text-psybeam-purple group-hover:text-future-lime transition-colors"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
