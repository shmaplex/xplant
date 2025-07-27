"use client";

import { Leaf, Package, FlaskConical } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "PhytoBase™ Organic Medium",
      desc: "Our plant‑focused, organic base medium replaces harsh synthetic formulas with a natural, balanced foundation for tissue culture.",
      icon: <Leaf className="w-7 h-7 text-future-lime" />,
    },
    {
      title: "Propagation Kits",
      desc: "Everything you need to start: pre‑mixed PhytoBase™, sterile tools, and instructions. No lab required.",
      icon: <Package className="w-7 h-7 text-future-lime" />,
    },
    {
      title: "Additives & Boosters",
      desc: "As you advance, fine‑tune growth with XBoost™, BioTone™, MycoLift™, and PureShield™ (coming soon).",
      icon: <FlaskConical className="w-7 h-7 text-future-lime" />,
    },
  ];

  return (
    <section className="rounded-2xl p-8 bg-white/90 backdrop-blur-sm border border-future-lime/20 shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
      {/* Radial organic background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full bg-future-lime/25 blur-3xl opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-milk-bio via-future-lime/10 to-moss-shadow/5" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-bold mb-14 text-moss-shadow">
          How It Works
        </h2>
        <div className="grid gap-10 sm:grid-cols-3">
          {steps.map(({ title, desc, icon }, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-8 bg-white/90 backdrop-blur-sm border border-future-lime/30 shadow-md hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-full border-2 border-future-lime/80 bg-milk-bio">
                {icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-biochar-black">
                {title}
              </h3>
              <p className="text-moss-shadow leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
