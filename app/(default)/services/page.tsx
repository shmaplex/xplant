"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function ServicesPage() {
  return (
    <>
      <main className="flex-1 px-6 sm:px-10 py-16 space-y-24">
        {/* Intro */}
        <section className="max-w-5xl mx-auto text-center space-y-6">
          <div className="flex flex-row space-x-2 items-center justify-center">
            <Image
              src="/svg/shmaplex-x-logo.svg"
              alt="Shmaplex X Logo"
              width={500}
              height={250}
            />
            <h1 className="text-4xl sm:text-5xl font-extrabold uppercase">
              Services
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-[#4A4A4A] max-w-2xl mx-auto">
            From the lab bench to the greenhouse, we provide solutions for
            hobbyists, retail partners, and commercial growers.
          </p>
          <Image
            src="/services/overview.png"
            alt="Tissue culture lab and greenhouse"
            width={900}
            height={500}
            className="rounded-xl shadow-md mx-auto w-full"
          />
        </section>

        {/* Retail & Hobbyist Kits */}
        <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-[#2F2F2F]">
              Retail & Hobbyist Kits
            </h2>
            <p className="text-lg text-[#3E3E3E] leading-relaxed">
              We believe tissue culture belongs on every grower&apos;s bench.
              Our retail products are designed to make plant propagation
              approachable at home while maintaining professional quality.
            </p>
            <ul className="list-none text-[#444] space-y-3">
              {[
                "Organic medium base with balanced nutrients",
                "Proprietary additive blends for healthy growth",
                "Ready-to-use starter kits for home labs",
                "Hands-on workshops and guided courses",
              ].map((item) => (
                <li key={item} className="flex items-start space-x-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5B199] mt-2"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#F9F5F0] via-[#FFF5E8] to-[#FFD8B2] -z-10" />
            <Image
              src="/services/retail-kit.png"
              alt="Organic medium kits"
              width={700}
              height={500}
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
        </section>

        {/* Commercial Propagation */}
        <section className="bg-[#ECE7DB] rounded-xl px-8 sm:px-20 pt-12 pb-20 shadow-inner max-w-6xl mx-auto space-y-10">
          <h2 className="text-2xl font-bold">
            Commercial Propagation Services
          </h2>
          <p className="text-base sm:text-lg text-[#2F2F2F] leading-relaxed">
            For nurseries, research institutions, and growers seeking clean,
            high-volume plant material, ShmaplexPlant offers a range of custom
            services.
          </p>
          <ul className="list-disc list-inside text-[#444] space-y-2 pl-4">
            <li>Contract micropropagation and scaling</li>
            <li>Clean plant sourcing and disease indexing</li>
            <li>Mother block maintenance for elite cultivars</li>
            <li>Development of custom culture protocols</li>
            <li>Acclimation and greenhouse transition services</li>
          </ul>
          <p className="text-base text-[#444]">
            Located in South Korea, we serve domestic growers and collaborate
            internationally, bridging Asia’s demand for clean, resilient plant
            stock.
          </p>
        </section>

        {/* Mediums and Additives */}
        <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#F9F5F0] via-[#E9F3DF] to-[#C6E3B5] -z-10" />
            <Image
              src="/services/additives.png"
              alt="Nutrient additives and culture media"
              width={700}
              height={500}
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-3xl font-bold tracking-tight text-[#2F2F2F]">
              Organic Mediums & Additives
            </h2>
            <p className="text-lg text-[#3E3E3E] leading-relaxed">
              ShmaplexPlant has developed a base medium using natural organic
              components, combined with additive blends to address specific
              plant growth needs.
            </p>
            <p className="text-base text-[#4A4A4A]">
              These mixes are available to both hobbyists and commercial labs,
              allowing you to standardize on clean, reliable inputs.
            </p>
          </div>
        </section>
      </main>

      {/* CTA */}
      <section className="relative z-0">
        <div className="bg-[#deddd5] text-black px-6 sm:px-10 py-16 rounded-t-[2rem] text-center max-w-7xl mx-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Looking for a partner in plant propagation?
            </h2>
            <p className="text-base sm:text-lg opacity-90">
              Whether you are a grower, a hobbyist, or an international partner,
              ShmaplexPlant is building the next chapter of plant propagation.
            </p>
            <Link
              href="mailto:hello@shmaplex.com"
              className="inline-block bg-white text-[#5C5138] px-6 py-3 rounded-md font-medium hover:bg-[#ECE7DB] transition-colors text-base sm:text-lg"
            >
              Contact Us{" "}
              <FiArrowRight className="mt-[1px] transition-transform group-hover:translate-x-1 inline-block -translate-y-[2px]" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
