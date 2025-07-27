"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { GuideCTA } from "@/components/GuideCTA";
import { ShopCTA } from "@/components/ShopCTA";
import { Suspense } from "react";

function OrganicMediumsContent() {
  const params = useSearchParams();
  const fromIntro = params.get("fromIntro") === "1";

  return (
    <main className="flex-1 max-w-4xl mx-auto px-6 sm:px-10 py-12 space-y-16">
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
          Organic Culture Mediums
        </h1>
        <p className="text-lg sm:text-xl text-[#4A4A4A]">
          Discover natural, sustainable alternatives to synthetic media such as
          Murashige &amp; Skoog (MS). Organic culture mediums aim to work with
          nature&mdash;not against it.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Why Organic?</h2>
        <p className="text-base sm:text-lg leading-relaxed">
          Traditional MS medium, developed in the 1960s, revolutionized plant
          tissue culture with a synthetic blend of salts, industrial nutrients
          and vitamins. However, these formulas are optimized for speed and
          uniformity, not for sustainability. Organic mediums focus on:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Reducing chemical inputs</li>
          <li>Supporting beneficial microorganisms and natural compounds</li>
          <li>Encouraging slower, stronger growth rather than rapid forcing</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Key Ingredients</h2>
        <p className="text-base sm:text-lg leading-relaxed">
          An organic medium may incorporate:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>Natural sugars:</strong> Unrefined cane sugar or honey as an
            energy source.
          </li>
          <li>
            <strong>Plant&ndash;derived extracts:</strong> Coconut water, aloe
            vera, or kelp for micronutrients and natural hormones.
          </li>
          <li>
            <strong>Compost teas or bio&ndash;ferments:</strong> In small,
            well&ndash;filtered amounts, these can introduce beneficial
            compounds.
          </li>
        </ul>
        <p className="text-sm text-gray-600">
          Note: Organic formulations must still be sterilized to prevent
          contamination, and recipes may need fine&ndash;tuning for consistency.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Challenges &amp; Opportunities</h2>
        <p className="text-base sm:text-lg leading-relaxed">
          Working with organic components means greater variability in nutrients
          and slower growth compared to synthetic MS medium. The trade&ndash;off
          is healthier plantlets and a reduced ecological footprint. Many
          researchers and hobbyists are experimenting with blends that balance
          the best of both approaches.
        </p>
      </section>
    </main>
  );
}

export default function OrganicMediumsPage() {
  return (
    <div className="font-sans bg-[#F8F4EC] text-[#2F2F2F] min-h-screen flex flex-col">
      <Header />
      <Suspense>
        <OrganicMediumsContent />
      </Suspense>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <GuideCTA
          title="Ready to experiment with organic culture?"
          description="Learn to combine traditional knowledge with modern techniques to create sustainable, thriving plantlets."
        />
        <ShopCTA />
      </div>
      <Footer />
    </div>
  );
}
