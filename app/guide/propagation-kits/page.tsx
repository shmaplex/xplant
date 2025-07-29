"use client";

import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { ShopCTA } from "@/components/ShopCTA";
import CommunityCallout from "@/components/CommunityCallout";
import { Suspense } from "react";

const kits = [
  {
    name: "Orchid Starter Kit",
    description:
      "Designed for Phalaenopsis and other epiphytic orchids. Includes nutrient-rich organic base media and additives optimized for root initiation and early growth.",
    ingredients: [
      "PhytoBase™ Organic Medium (pre-mixed)",
      "Natural Coconut Charcoal Powder",
      "Organic Sucrose (sterile)",
      "Hormone-free rooting supplement",
    ],
    tools: [
      "Scalpel & forceps (sterilized)",
      "Alcohol wipes",
      "Instruction guide",
    ],
  },
  {
    name: "Succulent & Cactus Kit",
    description:
      "Formulated for desert plants and slow-growing succulents, focusing on firm, compact growth and low moisture requirements.",
    ingredients: [
      "Low-sucrose PhytoBase™ Medium",
      "Biochar grit additive",
      "Aloe-enhanced gel mix",
    ],
    tools: [
      "Scalpel & forceps",
      "Sterile petri cups",
      "Beginner workshop access",
    ],
  },
  {
    name: "Houseplant & Aroid Kit",
    description:
      "Perfect for duplicating monstera, philodendron, pothos, and other popular houseplants. Balanced organic nutrients support rapid callus formation.",
    ingredients: [
      "PhytoBase™ Organic Medium",
      "Natural Banana Powder (growth booster)",
      "Kelp Extract",
    ],
    tools: ["Mini scissors", "Forceps", "Reusable glass jars"],
  },
  {
    name: "Rare & Exotic Collector’s Kit",
    description:
      "For collectors experimenting with rare species. Advanced mix with organic additives and micronutrients to support delicate plant material.",
    ingredients: [
      "Custom advanced culture blend",
      "Mycorrhizae inoculant",
      "Activated organic charcoal",
    ],
    tools: ["Sterile transfer kit", "Mini spray mister", "Comprehensive guide"],
  },
];

function PropagationKitsContent() {
  const params = useSearchParams();
  const fromIntro = params.get("fromIntro") === "1";

  return (
    <main className="flex-1 max-w-5xl mx-auto px-6 sm:px-10 py-12 space-y-20">
      {/* Page header */}
      <header className="text-left">
        {fromIntro && (
          <Link
            href="/guide/intro-to-tissue-culture"
            className="inline-flex items-center text-sm font-medium text-moss-shadow mb-6 hover:underline"
          >
            <FiArrowLeft className="mr-1" />
            Back to Intro to Tissue Culture
          </Link>
        )}

        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-moss-shadow">
          Propagation Kits
        </h1>
        <p className="text-lg sm:text-xl text-biochar-black">
          A practical, beginner-friendly way to start your plant tissue culture
          journey. These kits come with everything you need—no lab required.
        </p>
      </header>

      {/* Section: What's inside */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-moss-shadow">
          What&apos;s Inside a Kit?
        </h2>
        <p className="text-base sm:text-lg leading-relaxed text-biochar-black">
          Each kit is customized for the plant type you want to propagate, but
          all kits include the essentials:
        </p>
        <ul className="list-disc list-inside space-y-2 text-biochar-black">
          <li>Pre&ndash;mixed organic culture medium (sealed jars)</li>
          <li>Sterile tools for cutting and transferring plant tissue</li>
          <li>Clear instructions with photos and best practices</li>
          <li>Access to our online beginner&apos;s workshop</li>
        </ul>
      </section>

      {/* Dynamic Kits */}
      <section className="space-y-10">
        <h2 className="text-2xl font-bold text-moss-shadow">
          Choose a Kit for Your Plant
        </h2>
        <div className="grid gap-10 md:grid-cols-2">
          {kits.map((kit) => (
            <div
              key={kit.name}
              className="bg-milk-bio rounded-2xl shadow-md border border-spore-grey p-0 flex flex-col overflow-hidden hover:shadow-lg transition"
            >
              {/* accent stripe */}
              <div className="h-1 w-full bg-future-lime" />

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-2 text-moss-shadow">
                  {kit.name}
                </h3>
                <p className="text-biochar-black mb-4">{kit.description}</p>

                <div className="mb-3">
                  <h4 className="font-medium mb-1 text-biochar-black">
                    Includes:
                  </h4>
                  <ul className="list-disc list-inside text-sm text-biochar-black">
                    {kit.ingredients.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-1 text-biochar-black">
                    Tools:
                  </h4>
                  <ul className="list-disc list-inside text-sm text-biochar-black">
                    {kit.tools.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/shop"
                  className="mt-auto inline-flex items-center justify-center gap-2
             bg-moss-shadow text-milk-bio 
             px-5 py-2 rounded-lg
             shadow-sm hover:shadow-md
             hover:bg-biochar-black 
             transition-all duration-300 ease-out 
             text-sm font-semibold tracking-wide"
                >
                  Get This Kit
                  <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Why use a kit */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-moss-shadow">Why Use a Kit?</h2>
        <p className="text-base sm:text-lg leading-relaxed text-biochar-black">
          Kits are the fastest way to gain hands-on experience with plant
          propagation. You can skip the stress of sourcing materials and focus
          on learning the basics in a safe, structured way.
        </p>
        <ul className="list-disc list-inside space-y-2 text-biochar-black">
          <li>No need for specialized equipment to get started</li>
          <li>Everything is pre-measured and pre-sterilized</li>
          <li>Perfect for learning the basics before mixing your own media</li>
        </ul>
      </section>

      {/* Section: Next Steps */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-moss-shadow">Ready to Begin?</h2>
        <p className="text-base sm:text-lg leading-relaxed text-biochar-black">
          Start with a kit, follow the instructions, and watch your first
          plantlets take root. Once you&apos;re comfortable, you can explore
          advanced techniques like custom media blends, additives, and scaling
          up.
        </p>
        <Link
          href="/shop"
          className="inline-block mt-4 bg-moss-shadow text-milk-bio px-6 py-3 rounded-md hover:bg-biochar-black transition-colors text-base sm:text-lg"
        >
          Browse All Kits{" "}
          <FiArrowRight className="mt-[1px] inline-block -translate-y-[2px]" />
        </Link>
      </section>
    </main>
  );
}

export default function PropagationKitsPage() {
  return (
    <>
      <Suspense>
        <PropagationKitsContent />
      </Suspense>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <ShopCTA />
        <CommunityCallout />
      </div>
    </>
  );
}
