"use client";

import NewsletterForm from "@/components/NewsletterForm";
import Image from "next/image";

export default function EarlyAccessPage() {
  return (
    <main className="flex-1 w-full flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full space-y-10 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold flex flex-col items-center gap-4">
          <span>Thanks for Your Interest in</span>
          <Image
            src="/svg/shmaplexplant-logo.svg"
            alt="ShmaplexPlant"
            width={220}
            height={60}
            className="h-auto w-auto"
            priority
          />
        </h1>

        <p className="text-moss-shadow text-base sm:text-lg leading-relaxed">
          We&rsquo;re building a new way to grow&mdash;small‑scale, sustainable
          tissue culture kits and resources that put plant propagation back in
          the hands of growers.
          <br />
          <br />
          We appreciate you being early! By joining below, you&rsquo;ll receive
          updates, behind‑the‑scenes progress, and first access to our kits as
          soon as they&rsquo;re ready.
        </p>

        <div className="bg-white/80 backdrop-blur-sm border border-spore-grey/30 rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Get Early Updates</h2>
          <NewsletterForm />
        </div>

        <p className="text-sm text-moss-shadow">
          No spam. Just occasional updates as we grow&nbsp;together.
        </p>
      </div>
    </main>
  );
}
