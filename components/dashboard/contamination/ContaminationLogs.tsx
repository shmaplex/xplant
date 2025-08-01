"use client";

import { ContaminationLog } from "@/lib/types";
import { MdWarning } from "react-icons/md";
import ContaminationCard from "./ContaminationCard";

export default function ContaminationLogs({
  logs,
}: {
  logs: ContaminationLog[];
}) {
  const hasLogs = logs.length > 0;

  return (
    <section className="bg-white rounded-2xl p-6 shadow max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-bio-red mb-6">
        Contamination Logs
      </h2>

      {!hasLogs ? (
        <div className="flex flex-col items-center justify-center py-16 bg-bio-red-light rounded-xl text-center">
          <MdWarning className="w-12 h-12 text-bio-red mb-4" />
          <p className="text-bio-red text-lg font-medium">
            No contamination logs
          </p>
          <p className="text-red-400 text-sm mt-1">
            This plant has no recorded contamination issues.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {logs.map((log) => (
            <li key={log.id}>
              <ContaminationCard log={log} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
