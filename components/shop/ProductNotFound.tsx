"use client";

import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-8 text-center">
      <h1 className="text-5xl font-extrabold text-green-900 mb-4">
        Oops! Product Not Found 🌱
      </h1>
      <p className="text-lg text-green-800 max-w-md mb-6">
        The product you&apos;re looking for seems to have wandered off the
        shelves. But don&apos;t worry — there&apos;s plenty more to explore in
        our garden!
      </p>

      <Link
        href="/shop"
        className="inline-block px-8 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition"
        aria-label="Back to shop"
      >
        Browse Our Shop
      </Link>
    </div>
  );
}
