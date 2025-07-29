"use client";

import { FaLeaf } from "react-icons/fa";

export default function ProductLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] w-full text-moss-shadow">
      {/* Animated spinning icon */}
      <div className="animate-spin-slow mb-4">
        <FaLeaf size={48} className="text-future-lime" />
      </div>

      <p className="text-xl font-semibold tracking-wide animate-pulse">
        Loading products…
      </p>
    </div>
  );
}
