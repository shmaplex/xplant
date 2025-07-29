"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

export default function AboutPage() {
  return (
    <div className="font-sans bg-milk-bio text-moss-shadow min-h-screen flex flex-col">
      <Header />

      <main className="bg-milk-bio text-moss-shadow font-sans">
        {/* Hero Section */}
        <section className="relative h-[55vh] sm:h-[65vh] w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-future-lime via-milk-bio to-spore-grey" />
          <div className="relative z-10 flex flex-col items-center space-y-5 text-center px-6">
            <Image
              src="/svg/shmaplexplant-logo.svg"
              alt="XPlant Logo"
              width={340}
              height={90}
              className="drop-shadow-md"
            />
            <p className="text-base sm:text-xl font-medium max-w-lg">
              Growing cleaner, closer, and greener.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="max-w-3xl mx-auto py-16 px-6 space-y-8">
          <h2 className="text-3xl font-bold">The XPlant Story</h2>
          <p className="text-lg leading-relaxed">
            XPlant began with two people and a shared obsession: one a former
            computer scientist who loves clean systems, and the other a lifelong
            gardener, fascinated by plants and soil. Together, as a small
            husband&ndash;and&ndash;wife team, we wanted to bring the joy and
            science of plant tissue culture to everyone—without the intimidating
            lab coat.
          </p>
          <p className="text-lg leading-relaxed">
            Our work blends curiosity with cleanliness: simple kits, clear
            guides, and a belief that anyone can grow something incredible with
            just a bit of care. Every medium we mix, every culture jar we ship,
            and every guide we write comes from that partnership between science
            and soil.
          </p>
        </section>

        <section className="bg-spore-grey/30 py-16 px-6">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <h2 className="text-2xl font-semibold">Why We Do This</h2>
            <p className="text-base leading-relaxed">
              Plants connect us back to what is slow and alive. By making plant
              science approachable, we hope to grow a new culture: one that
              values nature, curiosity, and care.
            </p>
            <p className="text-base leading-relaxed">
              We&apos;re not a big company. We&apos;re a family business,
              working in Korea, trying to make sustainable propagation tools
              that are as clean and thoughtful as the plants they grow.
            </p>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
