"use client";

import Link from "next/link";
import { ContaminationLog } from "@/lib/types";
import { formatDate } from "@/lib/date";
import { MdWarning } from "react-icons/md";

export default function ContaminationLogs({
  logs,
}: {
  logs: ContaminationLog[];
}) {
  const hasLogs = logs.length > 0;

  return (
    <section className="bg-white rounded-2xl p-6 shadow max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-red-600 mb-6">
        Contamination Logs
      </h2>

      {!hasLogs ? (
        <div className="flex flex-col items-center justify-center py-16 bg-red-50 rounded-xl text-center">
          <MdWarning className="w-12 h-12 text-red-400 mb-4" />
          <p className="text-red-500 text-lg font-medium">
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
              <Link
                href={`/dashboard/contamination/${log.id}`}
                className="block bg-red-50 border border-red-200 rounded-2xl p-5 shadow hover:shadow-lg transition cursor-pointer"
              >
                <p className="font-semibold text-red-700 mb-1">
                  {formatDate(log.log_date)}
                </p>
                <p className="text-sm text-red-900 leading-relaxed">
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
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
