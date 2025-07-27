"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WormBinDiagram from "@/components/WormBinDiagram";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function WormGuidePage() {
  return (
    <div className="font-sans bg-[#F8F4EC] text-[#2F2F2F] min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Diagram should come first on mobile */}
        <div className="w-full h-full flex items-center justify-center order-1 lg:order-2">
          <WormBinDiagram />
        </div>

        {/* Guide Content */}
        <div className="max-w-prose space-y-16 px-6 sm:px-10 sm:py-12 order-2 lg:order-1">
          <header className="text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Worm Bin Setup Guide
            </h1>
            <p className="text-lg sm:text-xl text-[#4A4A4A]">
              Follow these simple steps to start your worm farm right. Whether
              you&rsquo;re composting in an apartment or garden shed,
              we&rsquo;ve got you.
            </p>
          </header>

          <section className="space-y-10">
            <h2 className="text-2xl font-bold">Step-by-Step Setup</h2>
            <ol className="space-y-6 text-base sm:text-lg leading-relaxed list-decimal list-inside">
              <li>
                <strong>Choose your bin:</strong> Use a multi-tier tray worm bin
                with good ventilation. Look for a design with legs and a bottom
                spout to collect leachate.
              </li>
              <li>
                <strong>Prepare the bedding:</strong> Shred cardboard,
                newspaper, and mix in coco coir. This acts as the worms&rsquo;
                initial bedding and habitat.
              </li>
              <li>
                <strong>Dampen the bedding:</strong> Add just enough water so it
                feels like a wrung-out sponge. Avoid soaking it.
              </li>
              <li>
                <strong>Add your worms:</strong> Gently place your red wigglers
                (Eisenia fetida) into the top layer. Let them burrow and
                acclimate.
              </li>
              <li>
                <strong>Begin feeding:</strong> Start small with soft food
                scraps like banana peels, coffee grounds, and veggie ends. Avoid
                citrus, onions, dairy, and meat.
                <div className="mt-2">
                  <Link
                    href="/guide/worm-feeding"
                    className="inline-block text-sm font-medium text-[#5C5138] bg-[#ECE7DB] px-3 py-1 rounded-md hover:bg-[#e0d9c6] transition-colors"
                  >
                    <FiArrowRight className="mt-[1px] transition-transform group-hover:translate-x-1 inline-block -translate-y-[2px]" />{" "}
                    See the full worm feeding guide
                  </Link>
                </div>
              </li>
              <li>
                <strong>Cover the surface:</strong> Use a damp sheet of
                newspaper or breathable burlap. This helps retain moisture and
                creates a dark environment for the worms.
              </li>
              <li>
                <strong>Stack trays as needed:</strong> Once the first tray is
                nearly full, add another layer of bedding to a new tray and
                place it on top. Worms will migrate upward naturally.
              </li>
              <li>
                <strong>Harvest castings:</strong> When a tray is dark, rich,
                and smells earthy, it&rsquo;s ready to harvest. Replace it with
                an empty tray to continue the cycle.
              </li>
            </ol>
          </section>

          <section className="p-6 bg-green-100 border-l-4 border-green-600 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              💡 Pro Tip
            </h3>
            <p className="text-green-800 text-base leading-relaxed">
              The <strong>bottom tray is for leachate</strong>, not compost. Be
              sure your spout is working and there&rsquo;s enough ventilation
              underneath to avoid anaerobic buildup.
            </p>
          </section>
        </div>
      </main>

      <section className="bg-[#ECE7DB] text-center px-6 sm:px-10 py-12 rounded-t-xl shadow-inner">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Want to see it in action?
          </h2>
          <p className="text-base sm:text-lg text-[#4A4A4A] mb-6">
            Watch how we build, feed, and harvest our worm bins in real time.
          </p>
          <Link
            href="https://www.youtube.com/@DirtmanDiaries"
            target="_blank"
            className="inline-block bg-[#5C5138] text-white px-6 py-3 rounded-md hover:bg-[#403a2b] transition-colors text-base sm:text-lg"
          >
            Watch Dirtman Diaries on YouTube{" "}
            <FiArrowRight className="mt-[1px] transition-transform group-hover:translate-x-1 inline-block -translate-y-[2px]" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
