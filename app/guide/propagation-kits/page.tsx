"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { ShopCTA } from "@/components/ShopCTA";
import CommunityCallout from "@/components/CommunityCallout";
import { Suspense } from "react";

function PropagationKitsContent() {
  const params = useSearchParams();
  const fromIntro = params.get("fromIntro") === "1";

  return (
    <main className="flex-1 max-w-4xl mx-auto px-6 sm:px-10 py-12 space-y-16">
      {/* Page header */}
      <header className="text-left">
        {fromIntro && (
          <Link
            href="/guide/intro-to-tissue-culture"
            className="inline-flex items-center text-sm font-medium text-[#5C5138] mb-6 hover:underline"
          >
            <FiArrowLeft className="mr-1" />
            Back to Intro to Tissue Culture
          </Link>
        )}

        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Propagation Kits
        </h1>
        <p className="text-lg sm:text-xl text-[#4A4A4A]">
          A practical, beginner-friendly way to start your plant tissue culture
          journey. These kits come with everything you need—no lab required.
        </p>
      </header>

      {/* Section: What's inside */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">What&apos;s Inside a Kit?</h2>
        <p className="text-base sm:text-lg leading-relaxed">
          Our propagation kits are designed for home growers and small-scale
          enthusiasts. They include all of the essentials:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Pre&ndash;mixed organic culture medium (sealed jars)</li>
          <li>Sterile tools for cutting and transferring plant tissue</li>
          <li>Clear instructions with photos and best practices</li>
          <li>Access to our online beginner&apos;s workshop</li>
        </ul>
      </section>

      {/* Section: Why use a kit */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Why Use a Kit?</h2>
        <p className="text-base sm:text-lg leading-relaxed">
          Kits are the fastest way to gain hands-on experience with plant
          propagation. You can skip the stress of sourcing materials and focus
          on learning the basics in a safe, structured way.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>No need for specialized equipment to get started</li>
          <li>Everything is pre-measured and pre-sterilized</li>
          <li>Perfect for learning the basics before mixing your own media</li>
        </ul>
      </section>

      {/* Section: Next Steps */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Ready to Begin?</h2>
        <p className="text-base sm:text-lg leading-relaxed">
          Start with a kit, follow the instructions, and watch your first
          plantlets take root. Once you&apos;re comfortable, you can explore
          advanced techniques like custom media blends, additives, and scaling
          up.
        </p>
        <Link
          href="/shop/tissue-culture"
          className="inline-block mt-4 bg-[#5C5138] text-white px-6 py-3 rounded-md hover:bg-[#403a2b] transition-colors text-base sm:text-lg"
        >
          Browse Kits{" "}
          <FiArrowRight className="mt-[1px] inline-block -translate-y-[2px]" />
        </Link>
      </section>
    </main>
  );
}

export default function PropagationKitsPage() {
  return (
    <div className="font-sans bg-[#F8F4EC] text-[#2F2F2F] min-h-screen flex flex-col">
      <Header />
      <Suspense>
        <PropagationKitsContent />
      </Suspense>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        {/* Shop CTA */}
        <ShopCTA />

        {/* Community CTA */}
        <CommunityCallout />
      </div>

      <Footer />
    </div>
  );
}
