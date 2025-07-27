"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface GuideCTAProps {
  title?: string;
  description?: string;
}

export function GuideCTA({
  title = "Ready to experiment with organic culture?",
  description = "Learn to combine traditional knowledge with modern techniques to create sustainable, thriving plantlets.",
}: GuideCTAProps) {
  return (
    <section className="bg-gradient-to-tr from-milk-bio via-psybeam-purple/20 to-spore-grey/20 rounded-2xl p-10 max-w-4xl mx-auto text-center shadow-lg border border-psybeam-purple/30">
      <h3 className="text-2xl font-bold mb-4 text-moss-shadow">{title}</h3>
      <p className="mb-6 text-moss-shadow max-w-xl mx-auto">{description}</p>
      <Link
        href="/guide/intro-to-tissue-culture"
        className="inline-block bg-psybeam-purple text-white px-8 py-3 rounded-md hover:bg-psybeam-purple/90 transition-colors font-semibold"
      >
        Back to Main Guide <FiArrowRight className="inline ml-2 -mt-1" />
      </Link>
    </section>
  );
}
