import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function BinSetupCTA() {
  return (
    <section className="bg-[#F0ECE4] text-[#2F2F2F] p-16 md:p-20 rounded-xl shadow-sm hover:shadow-lg transition-shadow ease-in-out duration-500">
      <h2 className="text-2xl font-semibold mb-2">
        Need help setting up your bin?
      </h2>
      <p className="mb-4 text-base leading-relaxed">
        Our step-by-step bin setup guide will get you started in no time.
      </p>
      <Link
        href="/guide/worm-bin"
        className="text-[#4B3F2A] underline hover:text-[#2F2F2F] transition"
      >
        Go to Bin Setup Guide{" "}
        <FiArrowRight className="mt-[1px] transition-transform group-hover:translate-x-1 inline-block -translate-y-[2px]" />
      </Link>
    </section>
  );
}
