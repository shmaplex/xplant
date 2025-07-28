"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { shmaplexProducts } from "@/data/catalog";
import Image from "next/image";

const accentColors = [
  {
    badge: "bg-[#6ea420]",
    light: "bg-[#c7e6a4]/50",
    header: "bg-[#b7ef48]/30",
    title: "text-[#6ea420]",
  },
  {
    badge: "bg-[#8752c8]",
    light: "bg-[#d3b8f0]/50",
    header: "bg-psybeam-purple/30",
    title: "text-[#3e2b53]", // darker override for readability
  },
  {
    badge: "bg-[#2e3f36]",
    light: "bg-[#a8bcb2]/50",
    header: "bg-moss-shadow/30",
    title: "text-moss-shadow",
  },
  {
    badge: "bg-[#9a978f]",
    light: "bg-[#e0dfdb]/50",
    header: "bg-spore-grey/40",
    title: "text-biochar-black",
  },
  {
    badge: "bg-[#333333]",
    light: "bg-[#777777]/50",
    header: "bg-biochar-black/20",
    title: "text-biochar-black",
  },
  {
    badge: "bg-[#593380]",
    light: "bg-[#b39ad0]/50",
    header: "bg-psybeam-purple/40",
    title: "text-[#3e2b53]", // darker for readability
  },
  {
    badge: "bg-[#5a7c1f]",
    light: "bg-[#bcd68f]/50",
    header: "bg-[#b7ef48]/40",
    title: "text-[#5a7c1f]",
  },
  {
    badge: "bg-[#3b4a42]",
    light: "bg-[#9cac9f]/50",
    header: "bg-moss-shadow/40",
    title: "text-moss-shadow",
  },
  {
    badge: "bg-[#7f7567]",
    light: "bg-[#d6d2cc]/50",
    header: "bg-spore-grey/50",
    title: "text-biochar-black",
  },
  {
    badge: "bg-[#1f1f1f]",
    light: "bg-[#666666]/50",
    header: "bg-biochar-black/30",
    title: "text-biochar-black",
  },
  {
    badge: "bg-[#6c3ebf]",
    light: "bg-[#c5afea]/50",
    header: "bg-psybeam-purple/50",
    title: "text-[#3e2b53]", // darker
  },
  {
    badge: "bg-[#46641e]",
    light: "bg-[#aec492]/50",
    header: "bg-[#b7ef48]/50",
    title: "text-[#46641e]",
  },
  {
    badge: "bg-[#26332b]",
    light: "bg-[#96a49b]/50",
    header: "bg-moss-shadow/50",
    title: "text-moss-shadow",
  },
  {
    badge: "bg-[#80786d]",
    light: "bg-[#d7d3cd]/50",
    header: "bg-spore-grey/60",
    title: "text-biochar-black",
  },
  {
    badge: "bg-[#121212]",
    light: "bg-[#555555]/50",
    header: "bg-biochar-black/40",
    title: "text-biochar-black",
  },
];

export default function ProductsListPage() {
  return (
    <div className="bg-milk-bio text-biochar-black min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col space-y-4 items-center justify-center mb-12">
          <Image
            src="/svg/shmaplexplant-logo.svg"
            alt="Shmaplex Plant Logo"
            width={500}
            height={250}
            priority
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold uppercase text-center">
            Product Catalog
          </h1>
          <p className="max-w-3xl text-center text-moss-shadow leading-relaxed text-lg px-4 sm:px-0">
            Our mission is to replace synthetic agricultural and lab products
            with natural, organic alternatives that promote healthier, more
            sustainable plant growth. Each product below has been carefully
            crafted to offer superior performance while aligning with our
            commitment to environmental responsibility and purity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {shmaplexProducts.map((product, idx) => {
            const color = accentColors[idx % accentColors.length];

            return (
              <section
                key={product.name}
                className="relative rounded-2xl overflow-hidden shadow-md border border-spore-grey/50 hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 flex flex-col"
              >
                {/* Top left number badge */}
                <div
                  className={`absolute top-0 left-0 ${color.badge} text-white text-xs font-bold px-3 py-1 rounded-br-lg`}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Header */}
                <div className={`${color.header} px-6 pt-10 pb-4`}>
                  <h2 className={`text-xl font-bold mb-1 ${color.title}`}>
                    {product.name}
                  </h2>
                </div>

                {/* Body */}
                <div className="bg-white flex-1 px-6 py-6 flex flex-col">
                  <p className="text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>

                  <p className="mb-6 py-2 px-3 border border-black/4 rounded-2xl">
                    <strong className="text-xs uppercase text-black/50">
                      Use Case:
                    </strong>{" "}
                    <span className="font-light text-sm text-black/60">
                      {product.use}
                    </span>
                  </p>
                </div>

                {/* Bottom "Replaces" bar */}
                <div
                  className={`${color.light} text-biochar-black/70 text-xs font-semibold px-4 py-2 flex items-center`}
                >
                  <div className="font-bold pr-2 border-r border-biochar-black/20">
                    Replaces
                  </div>
                  <div className="pl-3">
                    <em className="not-italic">{product.replaces}</em>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
