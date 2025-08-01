"use client";

import React from "react";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

interface YouTubeEmbedProps {
  videoId?: string;
}

export default function YouTubeEmbed({
  videoId = "zr-g5pm39jc",
}: YouTubeEmbedProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <section className="grid items-center grid-cols-1 gap-10 md:grid-cols-2 sm:py-12 lg:py-0">
      {/* Left: Video */}
      <div className="relative w-full pt-[56.25%]">
        {/* 16:9 aspect ratio */}
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={embedUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {/* Right: Text */}
      <div className="space-y-4 px-12">
        <h3 className="text-xl font-bold sm:text-2xl">
          Watch the Latest ShmaplexPlant Episode
        </h3>
        <p className="text-[#444] text-base sm:text-lg">
          Dive into our plant-focused tissue culture tutorials, propagation
          tips, and sustainable growth stories. Pure, natural, and unfiltered.
        </p>
        <Link
          href="https://www.youtube.com/@ShmaplexPlant"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center bg-[#5C5138] text-white px-5 py-2 rounded-md hover:bg-[#403a2b] transition-colors text-sm sm:text-base"
        >
          Visit YouTube Channel{" "}
          <FiArrowRight className="ml-2 mt-[1px] transition-transform group-hover:translate-x-1 -translate-y-[2px]" />
        </Link>
      </div>
    </section>
  );
}
