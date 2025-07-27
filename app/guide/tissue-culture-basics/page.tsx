"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { GuideCTA } from "@/components/GuideCTA"; // adjust path if needed
import { ShopCTA } from "@/components/ShopCTA"; // adjust path if needed

const additives = [
  {
    label: "XBoost™",
    description:
      "Accelerates rooting and shoot multiplication. Use in small amounts for faster results.",
    status: "available",
  },
  {
    label: "BioTone™",
    description:
      "Balances pH and adds organic micronutrients to support plant growth.",
    status: "available",
  },
  {
    label: "MycoLift™",
    description:
      "Fungal/mycorrhizal booster for advanced users. Use cautiously.",
    status: "available",
  },
  {
    label: "PureShield™",
    description: "Anti-contamination additive (coming soon).",
    status: "coming",
  },
];

export default function TissueCultureBasicsPage() {
  const params = useSearchParams();
  const fromIntro = params.get("fromIntro") === "1";

  return (
    <div className="font-sans bg-[#F8F4EC] text-[#2F2F2F] min-h-screen flex flex-col">
      <Header />

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
            Tissue Culture Basics
          </h1>
          <p className="text-lg sm:text-xl text-[#4A4A4A]">
            This guide covers the essential components of plant tissue culture:{" "}
            <strong>culture media</strong>, <strong>growth conditions</strong>,
            and <strong>optional additives</strong> to help your plants thrive.
          </p>
        </header>

        {/* Section: Media */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Culture Media</h2>
          <p className="text-base sm:text-lg leading-relaxed">
            The culture medium is the lifeblood of your plantlets. It provides
            water, nutrients, and energy for growth. Beginners often start with
            a pre‑formulated base such as <strong>PhytoBase&trade;</strong> (our
            organic, plant‑focused blend) or the classic{" "}
            <strong>Murashige &amp; Skoog (MS) medium</strong>.
          </p>
          <p className="text-base sm:text-lg leading-relaxed">
            MS medium is a <em>synthetic laboratory formula</em> developed in
            the 1960s to standardize plant tissue culture. It&apos;s widely used
            because it&apos;s predictable and fast‑acting, but it relies on
            chemical salts and industrial nutrients. Our approach focuses on
            organic, low‑impact alternatives that support sustainable growth and
            a more natural ecosystem around your cultures.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Use distilled water to prepare your medium.</li>
            <li>Add sugar (often sucrose) as an energy source.</li>
            <li>Adjust pH before sterilization (around 5.6&ndash;5.8).</li>
            <li>
              Seal jars tightly and sterilize in a pressure cooker or autoclave.
            </li>
          </ul>
        </section>

        {/* Section: Conditions */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Growth Conditions</h2>
          <p className="text-base sm:text-lg leading-relaxed">
            Once sealed, your plantlets will grow best in stable, low-stress
            conditions. Most species prefer:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Room temperature (20&ndash;25&nbsp;&deg;C)</li>
            <li>Indirect, bright light (avoid direct sun)</li>
            <li>Low air disturbance (no strong drafts)</li>
          </ul>
        </section>

        {/* Section: Additives */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Additives &amp; Boosters</h2>
          <p className="text-base sm:text-lg leading-relaxed">
            Advanced hobbyists can introduce additives to fine-tune growth.
            These are optional but can improve results:
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {additives.map((add) => (
              <div
                key={add.label}
                className="rounded-xl p-4 shadow-md bg-white border border-gray-200 flex flex-col"
              >
                <h3 className="text-lg font-semibold mb-2">{add.label}</h3>
                <p className="text-gray-700 flex-1">{add.description}</p>
                {add.status === "coming" && (
                  <span className="mt-3 inline-block text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Guide CTA */}
        <GuideCTA />

        {/* Shop CTA */}
        <ShopCTA />
      </main>

      <Footer />
    </div>
  );
}
