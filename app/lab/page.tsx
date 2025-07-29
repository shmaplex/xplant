"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function FutureFarmPage() {
  return (
    <>
      <main className="flex-1 px-6 sm:px-10 py-16 space-y-24">
        {/* Intro */}
        <section className="max-w-6xl mx-auto text-center space-y-6">
          <div className="flex flex-col space-y-2 items-center justify-center">
            <Image
              src="/svg/shmaplexplant-logo.svg"
              alt="Shmaplex Plant Logo"
              width={500}
              height={250}
            />
            <h1 className="text-4xl sm:text-5xl font-extrabold uppercase">
              Future Lab
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-[#4A4A4A] max-w-2xl mx-auto">
            A next-generation propagation facility. Built for clean starts,
            resilient plants, and a new era of regenerative agriculture.
          </p>
          <Image
            src="/farm/future-1.png"
            alt="Modern plant tissue culture lab"
            width={900}
            height={500}
            className="rounded-xl shadow-md mx-auto w-full"
          />
        </section>

        {/* Vision Statement */}
        <section className="max-w-5xl mx-auto space-y-10">
          <h2 className="text-2xl font-bold">The Vision</h2>
          <p className="text-lg text-[#3E3E3E] leading-relaxed">
            ShmaplexPlant is building a clean, modern facility that combines
            plant science, sustainability, and careful process design. Our goal:
            to supply the world with healthy, genetically stable plant material
            while creating systems that scale without compromise.
          </p>
          <p className="text-base text-[#4A4A4A]">
            By focusing on juvenile plant cells and direct growth cycles, our
            approach avoids unnecessary variation and accelerates the path from
            lab to greenhouse.
          </p>
        </section>

        {/* Mother Block */}
        <section className="bg-[#ECE7DB] rounded-xl px-8 sm:px-20 pt-12 pb-20 shadow-inner max-w-6xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold">Mother Block Precision</h2>
          <p className="text-base sm:text-lg leading-relaxed text-[#2F2F2F]">
            The heart of our system is the mother block, where clean source
            plants are maintained indefinitely. Only the **apical meristem** is
            taken, ensuring plants remain true-to-type and free of unwanted
            mutations. This precision keeps each new generation as close as
            possible to the plant&rsquo;s original form.
          </p>
          <ul className="list-disc list-inside text-[#444] space-y-2 pl-4">
            <li>Direct explant culture — no indirect multiplication</li>
            <li>Strict cycle tracking (12 transfer limit)</li>
            <li>Extended acclimation phase for plant stability</li>
          </ul>
        </section>

        {/* Production Rooms */}
        <section className="max-w-5xl mx-auto space-y-10">
          <h2 className="text-2xl font-bold">Production Flow</h2>
          <p className="text-base sm:text-lg text-[#444] leading-relaxed">
            Once introduced into culture, plants are multiplied in clean,
            climate-controlled rooms. Each cycle runs on a four-week schedule.
            By the end of the 12th cycle, plants are ready to transition into
            acclimation and greenhouse growth.
          </p>
          <Image
            src="/farm/future-2.png"
            alt="Plantlets growing in production rooms"
            width={900}
            height={500}
            className="rounded-xl shadow-sm bg-cover bg-center mx-auto w-full"
          />
          <p className="text-sm italic text-[#666] text-center">
            Clean materials, careful timing, and steady growth.
          </p>
        </section>

        {/* Greenhouse */}
        <section className="max-w-5xl mx-auto space-y-10">
          <h2 className="text-2xl font-bold">Greenhouse Transition</h2>
          <p className="text-base sm:text-lg text-[#444] leading-relaxed">
            After a careful acclimation period, plants are moved to advanced
            greenhouses with rolling benches and closed-loop water systems.
            Here, lab precision meets natural sunlight, preparing young plants
            for commercial production or conservation projects.
          </p>
          <Image
            src="/farm/future-3.png"
            alt="Modern greenhouse interior"
            width={900}
            height={500}
            className="rounded-xl shadow-sm bg-cover bg-center mx-auto w-full"
          />
          <p className="text-sm italic text-[#666] text-center">
            Smart greenhouses: sustainable, modular, and scalable.
          </p>
        </section>
      </main>

      {/* Toward Regeneration */}
      <section className="bg-black/5 pt-12 pb-22 px-6 sm:px-12 rounded-t-[2rem] max-w-7xl mx-auto">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full lg:w-1/2 shadow-md rounded-xl overflow-hidden">
            <Image
              src="/farm/future-4.png"
              alt="Healthy propagated plants"
              width={900}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="text-center lg:text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2F2F2F]">
                Toward a New Standard
              </h2>
              <p className="text-base sm:text-lg text-[#3E3E3E] leading-relaxed">
                This future farm is designed for **scale and impact**. It
                bridges science and soil, producing plants that are clean,
                consistent, and ready for the challenges ahead.
              </p>
              <p className="text-base sm:text-lg text-[#3E3E3E] leading-relaxed">
                Our model connects lab innovation with regenerative agriculture,
                building a supply chain that prioritizes biodiversity,
                resilience, and sustainability.
              </p>
              <p className="text-base sm:text-sm text-[#7C7C70] italic">
                Clean starts. Strong finishes. Built for scale.
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
              Interested in partnering?
            </h2>
            <p className="text-base sm:text-lg opacity-90">
              We&rsquo;re looking for collaborators, scientists, and investors
              who believe in the next chapter of plant propagation.
            </p>
            <Link
              href="mailto:hello@shmaplex.com"
              className="inline-block bg-white text-[#5C5138] px-6 py-3 rounded-md font-medium hover:bg-[#ECE7DB] transition-colors text-base sm:text-lg"
            >
              Get in touch{" "}
              <FiArrowRight className="mt-[1px] transition-transform group-hover:translate-x-1 inline-block -translate-y-[2px]" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
