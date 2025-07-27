"use client";

import { LuVideoOff } from "react-icons/lu";

interface ProductVideoProps {
  videoId?: string;
  title?: string;
  description?: string;
}

export default function ProductVideo({
  videoId,
  title = "Watch the Product in Action",
  description = "Learn how to use and get the most out of your lab tools and culture mediums.",
}: ProductVideoProps) {
  return (
    <section className="w-full bg-milk-bio py-24 px-4 sm:px-8 lg:px-16 group">
      <div className="mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition ease-in-out duration-500 bg-white grid lg:grid-cols-2 gap-10 border border-spore-grey">
        {/* Left: Video or Placeholder */}
        <div
          className={`relative aspect-video w-full h-full flex items-center justify-center text-center rounded-tl-lg rounded-bl-lg transition-all duration-300 ${
            videoId ? "bg-black" : "bg-spore-grey/30"
          }`}
        >
          {videoId ? (
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Product video"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center px-6 w-full">
              <LuVideoOff className="w-10 h-10 text-moss-shadow/60" />
              <p className="mt-4 text-moss-shadow text-base font-medium">
                No video yet for this product.
              </p>
              <p className="text-moss-shadow/70 text-sm mt-1">
                We’re preparing something worth watching.
              </p>
            </div>
          )}
        </div>

        {/* Right: Textual Content */}
        <div className="flex flex-col justify-center p-6 space-y-6 text-moss-shadow">
          <div className="inline-block text-xs uppercase tracking-wide border border-spore-grey text-moss-shadow px-3 py-1 rounded-full w-fit bg-milk-bio">
            See It in Action
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-moss-shadow leading-relaxed">
            {description}
          </p>

          <ul className="text-sm text-moss-shadow list-disc pl-5 space-y-1">
            <li>Learn setup and handling</li>
            <li>Tips for best results</li>
            <li>Advanced techniques coming soon</li>
          </ul>

          <div>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-moss-shadow underline hover:text-future-lime transition-colors"
            >
              Visit our YouTube channel &rsaquo;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
