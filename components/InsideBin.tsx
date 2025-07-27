"use client";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function InsideBin() {
  return (
    <section className="space-y-6 text-center p-8">
      <h2 className="text-3xl font-bold text-white">Inside the Worm Bin</h2>
      <p className="max-w-xl mx-auto text-white text-base sm:text-xl">
        This isn&rsquo;t a how-to guide — it&rsquo;s a peek into the daily grime
        and small joys of running my own worm bin.
      </p>
      <p className="text-[#cfc2a3] font-semibold max-w-2xl mx-auto">
        From composting to castings, it&rsquo;s all part of the journey. And if
        you&rsquo;re into it — you can grab the good stuff directly from me.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="https://www.youtube.com/@ShmaplexPlant"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#cfc2a3] text-black px-6 py-3 rounded-md hover:bg-[#e9dfc7] transition-colors"
        >
          Watch the Diaries{" "}
          <FiArrowRight className="mt-[1px] transition-transform group-hover:translate-x-1 inline-block -translate-y-[2px]" />
        </Link>
        <Link
          href="/shop#castings"
          className="bg-[#d4cab1] text-black px-6 py-3 rounded-md hover:bg-[#e9dfc7] transition-colors"
        >
          Shop Castings{" "}
          <FiArrowRight className="mt-[1px] transition-transform group-hover:translate-x-1 inline-block -translate-y-[2px]" />
        </Link>
      </div>
    </section>
  );
}
