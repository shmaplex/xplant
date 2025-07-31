// components/dashboard/transfers/TransferNotFound.tsx
"use client";

import Link from "next/link";
import { FiSearch } from "react-icons/fi";

export default function TransferNotFound() {
  return (
    <div className="max-w-md mx-auto p-8 text-center bg-white rounded-2xl shadow-md">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-red-50 p-4 rounded-full">
          <FiSearch className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-red-600">Transfer Not Found</h2>
        <p className="text-gray-600 leading-relaxed">
          Oops! We couldn’t find the transfer you’re looking for. It might have
          been moved or doesn’t exist.
        </p>

        <Link
          href="/dashboard/transfers"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 
                     bg-future-lime text-moss-shadow font-semibold 
                     rounded-full shadow hover:bg-lime-500 
                     transition-colors"
        >
          Back to Transfers
        </Link>
      </div>
    </div>
  );
}
