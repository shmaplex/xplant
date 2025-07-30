"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { GuideCTA } from "@/components/GuideCTA";
import { ShopCTA } from "@/components/ShopCTA";
import { Suspense } from "react";

// Import the full product list
import { shmaplexProducts } from "@/data/catalog"; // adjust the path

// Helper: split products into base media vs additives
const mediaProducts = shmaplexProducts.filter(
  (p) =>
    p.name.startsWith("PhytoBase") ||
    p.name.startsWith("PhytoGelzan") ||
    p.name.startsWith("BioBuffer") ||
    p.name.startsWith("BioTea")
);

const additiveProducts = shmaplexProducts.filter(
  (p) => !mediaProducts.includes(p)
);

function TissueCultureBasicsContent() {
  const params = useSearchParams();
  const fromIntro = params.get("fromIntro") === "1";

  return (
    <main className="flex-1 max-w-5xl mx-auto px-6 sm:px-10 py-12 space-y-16">
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
          Tissue Culture Basics
        </h1>
        <p className="text-lg sm:text-xl text-[#4A4A4A]">
          This guide covers the essential components of plant tissue culture:{" "}
          <strong>culture media</strong>, <strong>growth conditions</strong>,
          and <strong>organic additives</strong> that replace traditional
          synthetic chemicals.
        </p>
      </header>

      {/* Section: Media */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Culture Media</h2>
        <p className="text-base sm:text-lg leading-relaxed">
          The culture medium is the lifeblood of your plantlets. It provides
          water, nutrients, and energy for growth. Beginners often start with a
          pre&ndash;formulated base such as <strong>PhytoBase™</strong> (our
          organic, plant&ndash;focused blend) or the classic{" "}
          <strong>Murashige &amp; Skoog (MS) medium</strong>.
        </p>
        <p className="text-base sm:text-lg leading-relaxed">
          MS medium is a <em>synthetic laboratory formula</em> developed in the
          1960s to standardize plant tissue culture. It&apos;s fast and
          predictable, but relies on industrial chemicals. Our approach focuses
          on
          <strong> organic, low&ndash;impact alternatives</strong> that support
          sustainable growth and a more natural ecosystem in the jar.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Use distilled water to prepare your medium.</li>
          <li>Add sugar (often sucrose) as an energy source.</li>
          <li>Adjust pH before sterilization (around 5.6&mdash;5.8).</li>
          <li>
            Seal jars tightly and sterilize in a pressure cooker or autoclave.
          </li>
        </ul>
      </section>

      {/* Section: Organic Medium Components */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Organic Medium Components</h2>
        <p className="text-base sm:text-lg leading-relaxed">
          These core components replace synthetic lab chemicals with organic,
          plant-friendly inputs:
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {mediaProducts.map((product) => (
            <div
              key={product.name}
              className="rounded-xl p-5 shadow-md bg-white border border-gray-200 flex flex-col"
            >
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700 flex-1 mb-2">{product.description}</p>
              <p className="text-sm text-gray-600">
                <strong>Replaces:</strong> {product.replaces}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Use:</strong> {product.use}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Conditions */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Growth Conditions</h2>
        <p className="text-base sm:text-lg leading-relaxed">
          Once sealed, your plantlets will grow best in stable, low-stress
          conditions. Most species prefer:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Room temperature (20&mdash;25&nbsp;°C)</li>
          <li>Indirect, bright light (avoid direct sun)</li>
          <li>Low air disturbance (no strong drafts)</li>
        </ul>
      </section>

      {/* Section: Additives */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Additives & Boosters</h2>
        <p className="text-base sm:text-lg leading-relaxed">
          These optional additives fine&ndash;tune culture performance by
          replacing harsh synthetic growth regulators with natural extracts and
          compounds:
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {additiveProducts.map((product) => (
            <div
              key={product.name}
              className="rounded-xl p-5 shadow-md bg-white border border-gray-200 flex flex-col"
            >
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700 flex-1 mb-2">{product.description}</p>
              <p className="text-sm text-gray-600">
                <strong>Replaces:</strong> {product.replaces}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Use:</strong> {product.use}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function TissueCultureBasicsPage() {
  return (
    <>
      <Suspense>
        <TissueCultureBasicsContent />
      </Suspense>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <GuideCTA />
        <ShopCTA />
      </div>
    </>
  );
}
