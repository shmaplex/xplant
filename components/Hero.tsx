"use client";

import Stats from "./Stats";

export default function Hero() {
  return (
    <section className="space-y-12 text-center">
      <div className="space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          Grow Plants. Sustainably.
        </h1>
        <p className="text-base sm:text-xl text-moss-shadow max-w-2xl mx-auto">
          XPlant is pioneering organic tissue culture in Korea. We’re building a
          platform for natural plant growth mediums, training, and services that
          scale from hobbyists to industrial farms.
        </p>
      </div>

      {/* Stats */}
      <Stats variant="hero" />
    </section>
  );
}
