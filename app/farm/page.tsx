// app/farm/industrial/page.tsx
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function IndustrialFarmPage() {
  return (
    <div className="font-sans bg-[#F8F4EC] text-[#2F2F2F] min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-6 sm:px-10 py-16 space-y-24">
        {/* Intro */}
        <section className="max-w-6xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold">
            We&rsquo;re Building Something Bigger
          </h1>
          <p className="text-lg sm:text-xl text-[#4A4A4A] max-w-2xl mx-auto">
            This isn&rsquo;t just a worm farm. It&rsquo;s a regenerative system
            built from the ground up — with shade, rhythm, and microbial life as
            its beating heart.
          </p>
          <Image
            src="/farm/industrial-1.png"
            alt="Worm wedge system photo"
            width={900}
            height={500}
            className="rounded-xl shadow-md mx-auto w-full"
          />
        </section>

        {/* Vision Statement */}
        <section className="max-w-5xl mx-auto space-y-10">
          <h2 className="text-2xl font-bold">The Vision</h2>
          <p className="text-lg text-[#3E3E3E] leading-relaxed">
            We&rsquo;re manifesting a living, breathing system that transforms
            food waste into fertile ground. What began in a single bin is
            scaling — thoughtfully — into a wedge-based vermicomposting flow
            built to serve not just gardens, but ecosystems.
          </p>
          <p className="text-base text-[#4A4A4A]">
            Shade is being stretched. Piles are forming. Food scraps are
            arriving from trusted hands. Red wigglers, once introduced, will
            guide the rhythm — feeding forward, transforming waste, leaving
            castings in their wake. The wedge moves. The microbes multiply.
          </p>
        </section>

        {/* Building In Real Time */}
        <section className="bg-[#ECE7DB] rounded-xl px-20 pt-12 pb-20 shadow-inner max-w-6xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold">Built by Rhythm</h2>
          <p className="text-base sm:text-lg leading-relaxed text-[#2F2F2F]">
            This system runs on cycles — not clock time. Every 60&ndash;90cm
            (2&ndash;3 feet) is a different phase: new food in the front,
            castings curing in the rear. We add carefully, water intuitively,
            and let the worms lead. Shade cloth drapes overhead. A breeze moves
            through the mesh.
          </p>
          <ul className="list-disc list-inside text-[#444] space-y-2 pl-4">
            <li>Greens and browns in equilibrium</li>
            <li>Worms moving, multiplying, self-sustaining</li>
            <li>Temperature and moisture monitored with care</li>
            <li>Castings screened and sold fresh — always alive</li>
          </ul>
        </section>

        {/* Materials + Flow */}
        <section className="max-w-5xl mx-auto space-y-10">
          <h2 className="text-2xl font-bold">The Flow</h2>
          <p className="text-base sm:text-lg text-[#444] leading-relaxed">
            Food comes in — rejected produce, local scraps, spent greens, manure
            from nearby stables. Nothing wasted. Everything intentional. What
            doesn&rsquo;t go into a landfill, goes into life.
          </p>
          <Image
            src="/farm/industrial-2.png"
            alt="Industrial worm pile"
            width={900}
            height={500}
            className="rounded-xl shadow-sm bg-cover bg-center mx-auto w-full"
          />
          <p className="text-sm italic text-[#666] text-center">
            Castings not bagged — but screened, sold, and spread while alive.
          </p>
        </section>
      </main>

      {/* Toward Regeneration */}
      <section className="bg-black/5 pt-12 pb-22 px-6 sm:px-12 rounded-t-[2rem] max-w-7xl mx-auto">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full lg:w-1/2 shadow-md rounded-xl overflow-hidden">
            <Image
              src="/farm/industrial-3.png"
              alt="Worm castings and soil"
              width={900}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="text-center lg:text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2F2F2F]">
                Toward Regeneration
              </h2>
              <p className="text-base sm:text-lg text-[#3E3E3E] leading-relaxed">
                This is our future: decentralized, regenerative infrastructure
                grounded in microbes and momentum.
              </p>
              <p className="text-base sm:text-lg text-[#3E3E3E] leading-relaxed">
                A place where waste becomes wealth, and biology is the guide.
                We&rsquo;re not just composting — we&rsquo;re regenerating.
              </p>
              <p className="text-base sm:text-sm text-[#7C7C70] italic">
                Built from shade, fed by rhythm, carried by life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-0 mt-[-2rem]">
        <div className="bg-[#deddd5] text-black px-6 sm:px-10 py-16 rounded-t-[2rem] text-center max-w-7xl mx-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Want to collaborate or contribute?
            </h2>
            <p className="text-base sm:text-lg opacity-90">
              We&rsquo;re building something beautiful — and bold. If
              you&rsquo;d like to be a part of it, let&rsquo;s connect.
            </p>
            <Link
              href="mailto:dirtmandiaries@gmail.com"
              className="inline-block bg-white text-[#5C5138] px-6 py-3 rounded-md font-medium hover:bg-[#ECE7DB] transition-colors text-base sm:text-lg"
            >
              Get in touch{" "}
              <FiArrowRight className="mt-[1px] transition-transform group-hover:translate-x-1 inline-block -translate-y-[2px]" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
