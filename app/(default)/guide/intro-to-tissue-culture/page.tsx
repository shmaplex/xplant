"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import TissueCultureDiagram from "@/components/TissueCultureDiagram";
import CommunityCallout from "@/components/CommunityCallout";
import { ShopCTA } from "@/components/ShopCTA";

// Same stage data (colors) as the diagram to ensure cohesion
const coreStages = [
  {
    key: "clean",
    label: "Create a clean workspace",
    description:
      "Use a simple table in a draft-free area. Wipe all surfaces with diluted alcohol or vinegar.",
    color: "from-green-100/70 to-green-50/50",
  },
  {
    key: "medium",
    label: "Prepare your growth medium",
    description:
      "Use a natural, organic culture medium suited for your plant species. Sterilize it properly in jars.",
    color: "from-lime-100/70 to-lime-50/50",
  },
  {
    key: "explants",
    label: "Select a healthy plant",
    description:
      "Choose disease-free mother plants. Young shoots and buds work best for beginners.",
    color: "from-yellow-100/70 to-yellow-50/50",
  },
  {
    key: "take",
    label: "Take your explant",
    description:
      "Cut a small shoot tip, leaf, or node using sterilized scissors. Minimize exposure to open air.",
    color: "from-yellow-100/70 to-yellow-50/50",
  },
  {
    key: "transfer",
    label: "Transfer to the medium",
    description:
      "Gently place the plant tissue on the surface of the medium in a clean jar. Seal the jar.",
    color: "from-sky-100/70 to-sky-50/50",
  },
  {
    key: "conditions",
    label: "Provide the right conditions",
    description:
      "Keep jars at room temperature with indirect light. Avoid direct sun and temperature extremes.",
    color: "from-blue-100/70 to-blue-50/50",
  },
  {
    key: "observe",
    label: "Observe and wait",
    description:
      "Within a few weeks you’ll see callus or tiny shoots forming. Patience is key!",
    color: "from-blue-100/70 to-blue-50/50",
  },
  {
    key: "acclimate",
    label: "Acclimate your plantlets",
    description:
      "Once plantlets have roots, open jars gradually to let them adjust to normal air before planting in soil.",
    color: "from-purple-100/70 to-purple-50/50",
  },
];

// Map gradient to a single soft solid color
const colorMap: Record<string, string> = {
  "from-green-100/70": "#BBF7D0",
  "from-lime-100/70": "#D9F99D",
  "from-yellow-100/70": "#FEF08A",
  "from-sky-100/70": "#BAE6FD",
  "from-blue-100/70": "#BFDBFE",
  "from-purple-100/70": "#C4B5FD",
};

function extractBaseColor(color: string) {
  const fromMatch = color.match(/from-[\w-\/]+/);
  return fromMatch ? colorMap[fromMatch[0]] || "#ccc" : "#ccc";
}

export default function TissueCultureIntroPage() {
  return (
    <>
      <main className="flex-1 max-w-5xl mx-auto px-6 sm:px-10 py-12 space-y-16">
        <header className="text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Intro to Plant Tissue Culture
          </h1>
          <p className="text-lg sm:text-xl text-[#4A4A4A]">
            A beginner-friendly guide to starting your journey with{" "}
            <strong>organic plant tissue culture</strong>. Learn how to
            propagate plants in a clean, sustainable way—from setting up a
            workstation to seeing your first plantlets grow.
          </p>
        </header>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 mx-auto">
          {/* Diagram first on mobile */}
          <div className="w-full h-full flex items-center justify-center order-1 lg:order-2">
            <TissueCultureDiagram />
          </div>

          {/* Guide Content */}
          <div className="space-y-16 order-2 lg:order-1">
            <section className="space-y-10">
              <h2 className="text-2xl font-bold">Step-by-Step Starter Guide</h2>
              <ol className="space-y-6 list-none">
                {coreStages.map((stage, idx) => {
                  const bgColor = extractBaseColor(stage.color);
                  return (
                    <li key={stage.key} className="flex items-start gap-4">
                      <span
                        className="flex-shrink-0 rounded-full w-8 h-8 flex items-center justify-center font-bold text-white"
                        style={{ backgroundColor: bgColor }}
                      >
                        {idx + 1}
                      </span>
                      <div className="text-base sm:text-lg leading-relaxed">
                        <strong>{stage.label}:</strong> {stage.description}
                        {stage.key === "observe" && (
                          <div className="mt-2">
                            <Link
                              href="/guide/tissue-culture-basics?fromIntro=1"
                              className="inline-block text-sm font-medium text-[#5C5138] bg-[#ECE7DB] px-3 py-1 rounded-md hover:bg-[#e0d9c6] transition-colors"
                            >
                              <FiArrowRight className="mt-[1px] inline-block -translate-y-[2px]" />{" "}
                              Learn more about culture media & conditions
                            </Link>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section className="p-6 bg-lime-100 border-l-4 border-future-lime rounded-md shadow-sm">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                🌱 Pro Tip
              </h3>
              <p className="text-green-800 text-base leading-relaxed">
                <strong>Small, clean, and patient:</strong> Start with just a
                few jars, keep everything clean, and avoid overhandling your
                cultures. Simplicity and hygiene are more important than fancy
                equipment.
              </p>
            </section>
          </div>
        </div>
      </main>

      <div className="max-w-5xl mx-auto">
        <CommunityCallout />

        <ShopCTA />
      </div>
    </>
  );
}
