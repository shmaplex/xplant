import { ContaminationLog } from "@/lib/types";
import { formatDate } from "@/lib/date";
import { AlertTriangle } from "lucide-react";

export default function ContaminationLogs({
  logs,
}: {
  logs: ContaminationLog[];
}) {
  const hasLogs = logs.length > 0;

  return (
    <section className="bg-white rounded-2xl p-6 shadow max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-red-600 mb-4">
        Contamination Logs
      </h2>

      {!hasLogs ? (
        <div className="flex flex-col items-center justify-center py-16 bg-red-50 rounded-xl text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
          <p className="text-red-500 text-lg font-medium">
            No contamination logs
          </p>
          <p className="text-red-400 text-sm mt-1">
            This plant has no recorded contamination issues.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {logs.map((log) => (
            <li
              key={log.id}
              className="bg-red-50 border border-red-200 rounded-lg p-4 hover:bg-red-100 transition"
            >
              <p className="font-medium">{formatDate(log.log_date)}</p>
              <p className="text-sm text-red-900">
                Issue: {log.issue}
                {log.description && (
                  <>
                    <br />
                    Description: {log.description}
                  </>
                )}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
