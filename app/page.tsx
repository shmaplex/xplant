import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Hero from "@/components/Hero";
import Vision from "@/components/Vision";
import HowItWorks from "@/components/HowItWorks";
import Impact from "@/components/Impact";
import Stats from "@/components/Stats";
import CommunityCallout from "@/components/CommunityCallout";
import Testimonials from "@/components/Testimonials";

export default async function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center w-full">
      {/* Hero – full bleed and very spacious */}
      <section className="relative w-full bg-gradient-to-br from-future-lime/20 via-milk-bio to-spore-grey/40 py-20 sm:py-40">
        <div className="absolute inset-0">
          {/* Soft radial spotlight */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80%] h-[80%] rounded-full bg-future-lime/20 blur-3xl opacity-50" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-10 pt-24 sm:pt-40 pb-20 sm:pb-32 min-h-[60vh] flex flex-col justify-center">
          <Hero />
        </div>
      </section>

      {/* Vision – contained */}
      <section className="max-w-6xl mx-auto px-4 sm:px-10 py-16 sm:py-20">
        <div className="bg-spore-grey/30 rounded-2xl p-8 sm:p-10">
          <Vision />
        </div>
      </section>

      {/* How It Works – full bleed but lighter */}
      <section className="w-full bg-milk-bio py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-10">
          <HowItWorks />
        </div>
      </section>

      {/* Impact – contained */}
      <section className="max-w-7xl mx-auto px-4 sm:px-10 py-10 sm:py-16">
        <div className="rounded-2xl shadow-sm border border-spore-grey/10">
          <Impact />
        </div>
      </section>

      {/* Community Callout – contained */}
      <section className="max-w-6xl mx-auto px-4 sm:px-10 pb-20 mt-12 sm:mt-16">
        <div className="border border-spore-grey/30 rounded-2xl p-8 sm:p-10">
          <CommunityCallout />
        </div>
      </section>

      {/* Testimonials – full bleed */}
      <section className="relative w-full bg-gradient-to-tr from-spore-grey via-moss-shadow/20 to-spore-grey py-24 sm:py-32 mt-8 sm:mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-10">
          <Testimonials />
        </div>
      </section>
    </main>
  );
}
