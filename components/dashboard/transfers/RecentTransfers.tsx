"use client";

import Link from "next/link";
import type { PlantTransfer } from "@/lib/types";

type RecentTransfersProps = {
  transfers: PlantTransfer[];
};

export default function RecentTransfers({ transfers }: RecentTransfersProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 bg-white rounded-2xl shadow-sm border border-spore-grey/10 mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--moss-shadow)]">
          Recent Transfers
        </h2>
        <Link
          href="/dashboard/transfers"
          className="ease-in-out duration-500 transition text-moss-shadow hover:text-future-lime font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-future-lime rounded text-sm"
          aria-label="View all transfers"
        >
          View all →
        </Link>
      </div>

      {transfers.length === 0 ? (
        <p className="text-sm text-gray-500">No recent transfers found.</p>
      ) : (
        <ul className="divide-y divide-spore-grey/30">
          {transfers.map((t) => (
            <li key={t.id}>
              <Link
                href={`/dashboard/transfers/${t.id}`}
                className="block px-4 py-3 group hover:bg-future-lime/10 focus:outline-none focus:ring-2 focus:ring-future-lime rounded transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-moss-shadow">
                      {t.plant?.species || "Unknown Plant"}
                    </span>{" "}
                    <span className="text-sm text-gray-600">
                      (Cycle {t.transfer_cycle}) on{" "}
                      {new Date(t.transfer_date).toLocaleDateString()}
                    </span>
                  </div>
                  <svg
                    className="w-5 h-5 text-moss-shadow duration-500 ease-in-out group-hover:translate-x-1 group-hover:text-moss-shadow/50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
