"use client";

import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export default function ContaminationActions() {
  return (
    <div className="fixed bottom-5 right-6 sm:right-24">
      <Link
        href="/dashboard/contamination/new"
        className="flex items-center space-x-2 bg-[#5b3fa8]/50 hover:bg-[#5b3fa8]
          text-white font-medium shadow-lg rounded-full
          px-6 py-3
          transition-colors duration-300"
      >
        <FiPlus className="w-5 h-5" />
        <span>Add Contamination</span>
      </Link>
    </div>
  );
}
