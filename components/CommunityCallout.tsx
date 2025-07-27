"use client";

export default function CommunityCallout() {
  return (
    <section className="relative overflow-hidden py-16 px-6 sm:py-28 sm:px-16 rounded-3xl shadow-2xl isolate transition-transform duration-500 ease-in-out hover:shadow-3xl hover:-translate-y-2 bg-gradient-to-br from-spore-grey via-milk-bio to-spore-grey">
      {/* Texture overlay */}
      <div
        className="absolute inset-0 z-0 bg-[url('/png/asfalt-light.png')] bg-repeat opacity-20 pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center space-y-8 px-2 sm:px-16">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-biochar-black">
          Join the <span className="text-moss-shadow">XPlant</span> Community
        </h2>
        <p className="text-base sm:text-xl text-moss-shadow leading-relaxed max-w-xl sm:max-w-3xl mx-auto">
          Be part of the future of sustainable plant growth. Sign up to get
          early access to XPlant kits, workshops, and resources as we grow.
        </p>

        <div className="inline-block rounded-xl p-[3px] bg-gradient-to-r from-future-lime/70 via-psybeam-purple/70 to-future-lime/70 shadow-md group hover:shadow-lg transition-shadow">
          <a
            href="/early-access"
            className="flex items-center gap-3 sm:gap-4 bg-milk-bio group-hover:bg-white text-biochar-black px-6 py-3 sm:px-10 sm:py-4 rounded-xl text-base sm:text-lg font-semibold tracking-wide transition-colors"
          >
            Get Early Access
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
          </a>
        </div>
      </div>
    </section>
  );
}
