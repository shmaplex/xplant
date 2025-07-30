"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const sections = [
  {
    title: "Propagation Kits",
    description:
      "Complete beginner and advanced tissue culture kits with everything you need to propagate plants at home or in the lab.",
    products: [
      "Propagation Kit",
      "Orchid Starter Kit",
      "Succulent & Cactus Kit",
      "Houseplant & Aroid Kit",
      "Rare & Exotic Collector’s Kit",
    ],
  },
  {
    title: "Organic Media",
    description:
      "Organic base media formulations derived from plant ingredients instead of synthetic chemical mixes.",
    products: ["PhytoBase™ Organic Culture Medium"],
  },
  {
    title: "Amino Acids",
    description:
      "Organic protein hydrolysates and natural nitrogen sources derived from plants.",
    products: ["PhytoAmino™ Plant Hydrolysate"],
  },
  {
    title: "Antimicrobials",
    description:
      "Natural anti-contamination additives and plant-based antimicrobials.",
    products: ["PureShield™", "ChitoShield™ Chitosan Solution"],
  },
  {
    title: "Buffers",
    description:
      "Natural pH stabilizers and buffering systems derived from citrus extracts.",
    products: ["BioBuffer™ Natural pH Kit", "BioTone™"],
  },
  {
    title: "Carbohydrates",
    description:
      "Natural plant-derived sugars used as an energy source in tissue culture.",
    products: ["Organic Cane Sugar (included in kits)"],
  },
  {
    title: "Gelling Agents",
    description:
      "Plant-based alternatives to synthetic gel media for solidifying culture media.",
    products: [
      "PhytoBase™ Organic Agar",
      "PhytoGelzan™ Plant-Based Gelling Agent",
    ],
  },
  {
    title: "Plant Defense",
    description:
      "Natural additives to improve plant immune response and resilience.",
    products: ["MycoLift™", "ChitoShield™ Chitosan Solution"],
  },
  {
    title: "Plant Growth Regulators",
    description:
      "Natural plant hormones and stimulants that guide growth and development.",
    products: [
      "ShootRise™ Organic Cytokinin Extract",
      "RootFlow™ Natural Auxin Extract",
      "XBoost™",
    ],
  },
  {
    title: "Vitamins",
    description:
      "Fermentation-derived vitamins for slow or difficult plant cultures.",
    products: ["VitaBurst™ Organic Vitamin Complex"],
  },
  {
    title: "Nutrients & Bioadditives",
    description: "Organic inputs to enrich plant media with natural nutrients.",
    products: ["BioTea™ Compost Extract"],
  },
];

export default function OrganicAlternativesPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (i: number) => {
    setOpenItems((prev) =>
      prev.includes(i) ? prev.filter((id) => id !== i) : [...prev, i]
    );
  };

  return (
    <main className="flex-1 max-w-5xl mx-auto px-6 sm:px-10 py-12 space-y-16">
      <h1 className="text-3xl sm:text-5xl font-extrabold mb-8 leading-tight max-w-3xl">
        Natural &amp; Organic Alternatives to Conventional Lab Inputs
      </h1>

      <p className="text-moss-shadow text-lg sm:text-xl leading-relaxed max-w-3xl mb-12">
        Many plant science tools rely on synthetic chemicals. Our approach is to
        provide natural and organic alternatives that achieve similar results
        while keeping the process accessible and sustainable.
      </p>

      <div
        style={{ columnCount: 2, columnGap: "1.5rem" }}
        className="max-w-6xl mx-auto"
      >
        {sections.map((section, i) => {
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
                aria-controls={`section-desc-${i}`}
                id={`section-btn-${i}`}
              >
                <span>{section.title}</span>
                <FaChevronDown
                  className={`ml-3 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <div
                id={`section-desc-${i}`}
                role="region"
                aria-labelledby={`section-btn-${i}`}
                className={`px-5 text-moss-shadow transition-all duration-300 ${
                  isOpen ? "py-4 max-h-screen" : "max-h-0 py-0"
                }`}
                style={{ overflow: "hidden" }}
              >
                <p className="mb-4">{section.description}</p>
                {section.products.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-moss-shadow/80 mb-4">
                    {section.products.map((product, idx) => (
                      <li key={idx}>{product}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* One-to-One Natural Substitutions Section */}
      <h2 className="text-2xl sm:text-3xl font-bold mt-16 mb-6">
        One-to-One Natural Substitutions
      </h2>
      <p className="text-moss-shadow mb-6">
        Many synthetic inputs can be replaced directly by natural alternatives:
      </p>

      {/* Responsive Table */}
      <div className="overflow-x-auto rounded-xl shadow-sm border border-spore-grey/30">
        <table className="min-w-full border-collapse bg-white/80">
          <thead className="bg-spore-grey/20 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold">Synthetic Input</th>
              <th className="px-4 py-3 font-semibold">Natural Alternative</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Amino acids", "Plant/animal hydrolysates"],
              ["Antimicrobials", "Neem, essential oils"],
              ["Buffers", "Citric acid, lime"],
              ["Carbohydrates", "Cane or beet sugar"],
              ["Gelling agents", "Agar"],
              ["Plant defense", "Seaweed extract, chitosan"],
              ["Growth regulators", "Natural hormones, biostimulants"],
              ["Vitamins", "Fermentation-derived mixes"],
              ["Nutrients", "Organic fertilizers & amendments"],
              ["Enzymes", "Naturally fermented enzymes"],
            ].map(([input, alt], idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-white/60" : "bg-white/40"}
              >
                <td className="px-4 py-3 font-medium">{input}</td>
                <td className="px-4 py-3 text-moss-shadow">{alt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sustainability Section */}
      <h2 className="text-2xl sm:text-3xl font-bold mt-16 mb-6">
        Building a More Sustainable Practice
      </h2>
      <p className="text-moss-shadow leading-relaxed">
        By focusing on natural inputs, growers can reduce their dependence on
        industrial synthetic chemistry while still accessing the tools needed to
        culture plants, regenerate ecosystems, and make propagation accessible
        to small growers everywhere.
      </p>
    </main>
  );
}
