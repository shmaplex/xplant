"use client";

import Link from "next/link";
import { ContaminationLog } from "@/lib/types";
import { formatDate } from "@/lib/date";

export default function ContaminationCard({ log }: { log: ContaminationLog }) {
  return (
    <Link
      href={`/dashboard/contamination/${log.id}`}
      className="block bg-bio-red-light border border-bio-red/40 rounded-2xl p-5 hover:border-bio-red-dark/70 duration-500 ease-in-out transition cursor-pointer"
    >
      <p className="font-semibold text-bio-red mb-1">
        {formatDate(log.log_date)}
      </p>
      <p className="text-sm text-bio-red-dark leading-relaxed">
        <span className="font-semibold">Type:</span> {log.type}
        {log.description && (
          <>
            <br />
            <span className="font-semibold">Description:</span>{" "}
            {log.description}
          </>
        )}
      </p>
    </Link>
  );
}
