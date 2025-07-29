import { ContaminationLog } from "@/lib/types";
import { formatDate } from "@/lib/date";

export default function ContaminationLogs({
  logs,
}: {
  logs: ContaminationLog[];
}) {
  return (
    <section className="bg-white rounded-2xl p-6 shadow max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-red-600 mb-4">
        Contamination Logs
      </h2>
      {logs.length === 0 ? (
        <p className="text-gray-600">No contamination logs.</p>
      ) : (
        <ul className="space-y-3">
          {logs.map((log) => (
            <li
              key={log.id}
              className="bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <p className="font-medium">{formatDate(log.log_date)}</p>
              <p className="text-sm">
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
