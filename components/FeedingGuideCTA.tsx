import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function FeedingGuideCTA() {
  return (
    <section className="bg-[#F0ECE4] text-[#2F2F2F] p-16 md:p-20 rounded-xl shadow-sm hover:shadow-lg transition-shadow ease-in-out duration-500">
      <h2 className="text-2xl font-semibold mb-2">New to worm farming?</h2>
      <p className="mb-4 text-base leading-relaxed">
        Check out our feeding guide to learn how to keep your worms thriving.
      </p>
      <Link
        href="/guide/worm-feeding"
        className="text-[#4B3F2A] underline hover:text-[#2F2F2F] transition"
      >
        Go to Feeding Guide{" "}
        <FiArrowRight className="mt-[1px] transition-transform group-hover:translate-x-1 inline-block -translate-y-[2px]" />
      </Link>
    </section>
  );
}
