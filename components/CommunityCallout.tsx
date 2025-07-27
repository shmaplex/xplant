"use client";

import { FaYoutube } from "react-icons/fa";

export default function CommunityCallout() {
  return (
    <section className="relative overflow-hidden bg-[#E2D9C4] text-center py-20 hover:shadow-xl hover:-translate-y-1 tranistion-all duration-500 ease-in-out px-6 sm:px-10 rounded-xl shadow-lg isolate">
      {/* Grit overlay */}
      <div className="absolute inset-0 z-0 bg-[url(/png/asfalt-light.png)] mix-blend-multiply bg-repeat bg-auto opacity-50 invert pointer-events-none mask-fade-top"></div>
      <div className="relative z-10 space-y-6">
        <h2 className="text-4xl font-bold tracking-tight text-[#2F2F2F] sm:text-5xl">
          Join the Worm Wranglers
        </h2>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[#3E3E3E]">
          Get behind-the-scenes updates, bin tips, gear reviews, and early
          access to our wildest compost experiments.
        </p>

        {/* Gradient border button */}
        <div className="relative inline-block transition-all duration-500 ease-in-out group rounded-md p-[2px] bg-gradient-to-r hover:from-[#FF4E50] hover:via-[#F9D423] hover:to-[#FF6E7F]">
          <a
            href="https://www.youtube.com/@DirtmanDiaries"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#d4cab1] group-hover:bg-white text-black px-6 py-3 rounded-md text-lg font-medium transition-all"
          >
            <FaYoutube className="w-5 h-5" />
            Subscribe on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
