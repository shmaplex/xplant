"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const keyTerms = [
  {
    term: "PhytoBalance™ Organic Base",
    desc: "A natural alternative to synthetic MS salts. Made with coconut water, kelp extract, bioferments, and organic amino acids to provide a balanced foundation for plant tissue culture.",
  },
  {
    term: "ShootRise™ Organic Cytokinin Extract",
    desc: "A plant hormone blend from fermented coconut water, kelp extracts, and sprouted grain teas. Encourages shoot formation without synthetic BAP.",
  },
  {
    term: "RootFlow™ Natural Auxin Extract",
    desc: "Hormones from willow bark and alfalfa extracts to stimulate rooting and callus formation naturally, replacing synthetic IBA/NAA.",
  },
  {
    term: "PhytoAmino™ Plant Hydrolysate",
    desc: "Amino acids and peptides derived from plant matter—provides organic nitrogen and growth signals.",
  },
  {
    term: "Seaweed / Kelp Extract",
    desc: "A natural source of plant hormones and trace minerals that gently boost growth and stress resilience.",
  },
  {
    term: "ChitoShield™ Chitosan Solution",
    desc: "A natural polymer derived from fungal cell walls or shells that primes plants’ immune systems and improves rooting.",
  },
  {
    term: "BioBuffer™ Natural pH Kit",
    desc: "Citrus-derived citric acid buffers for gentle pH balancing of organic culture media.",
  },
  {
    term: "VitaBurst™ Organic Vitamin Complex",
    desc: "Fermentation-derived vitamins (B-complex, inositol, etc.) made from plant and yeast extracts. Simplifies vitamin supplementation for plant tissue culture.",
  },
  {
    term: "PhytoGel™ Organic Gelling Kit",
    desc: "Plant-based agar, carrageenan, or pectin to solidify culture media without synthetic gels.",
  },
  {
    term: "Organic Carbohydrates",
    desc: "Sterilized organic cane sugar or beet sugar as an energy source for plantlets.",
  },
  {
    term: "No Hormones (Resting Phase)",
    desc: "Some phases deliberately omit hormones to allow natural development during dormancy or hardening.",
  },
  {
    term: "BioTea™ Compost Extract",
    desc: "Gentle, filtered liquid extracts from worm castings and compost that add trace nutrients and biological signals.",
  },
];

export default function KeyTerms() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (i: number) => {
    setOpenItems((prev) =>
      prev.includes(i) ? prev.filter((id) => id !== i) : [...prev, i]
    );
  };

  return (
    <section className="mb-16 bg-spore-grey/40 p-8 rounded-2xl">
      <h2 className="text-3xl font-extrabold mb-4">Key Terms to Know</h2>
      <p className="mb-8 text-moss-shadow max-w-prose">
        These are the natural building blocks behind our plant tissue culture
        recipes. Instead of relying on synthetic lab reagents, we emphasize
        organic and minimally processed inputs wherever possible.
      </p>

      <div
        style={{ columnCount: 2, columnGap: "1.5rem" }}
        className="max-w-6xl mx-auto"
      >
        {keyTerms.map((item, i) => {
          const isOpen = openItems.includes(i);
          return (
            <div
              key={i}
              style={{ breakInside: "avoid" }}
              className="mb-6 bg-white rounded-xl shadow-sm border border-spore-grey hover:shadow-md transition-shadow overflow-hidden"
            >
              <button
                onClick={() => toggleItem(i)}
                className="w-full flex items-center justify-between px-5 py-4 bg-spore-grey rounded-t-xl text-left text-lg font-semibold"
                aria-expanded={isOpen}
                aria-controls={`term-desc-${i}`}
                id={`term-btn-${i}`}
              >
                <span>{item.term}</span>
                <FaChevronDown
                  className={`ml-3 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <div
                id={`term-desc-${i}`}
                role="region"
                aria-labelledby={`term-btn-${i}`}
                className={`px-5 text-moss-shadow transition-all duration-300 ${
                  isOpen ? "py-4 max-h-screen" : "max-h-0 py-0"
                }`}
                style={{ overflow: "hidden" }}
              >
                <p className="text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
