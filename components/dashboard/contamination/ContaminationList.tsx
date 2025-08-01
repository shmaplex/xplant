"use client";

import { useEffect, useState } from "react";
import { fetchContaminationLogs } from "@/lib/api/contamination";
import type { ContaminationLogWithRelations } from "@/lib/types";
import ContaminationMedia from "./ContaminationMedia"; // adjust the import path as needed
import { getMediaType } from "@/lib/media";

export default function ContaminationList() {
  const [logs, setLogs] = useState<ContaminationLogWithRelations[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchContaminationLogs();
        setLogs(data);
      } catch (err) {
        setError("Error fetching contamination logs.");
        console.error(err);
      }
    };
    loadLogs();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-milk-bio p-6 rounded-3xl shadow-xl">
      <h2 className="text-xl font-semibold text-moss-shadow mb-4">
        Contamination Reports
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {logs.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No contamination reports yet.
          </p>
        )}

        {logs.map((log) => (
          <div
            key={log.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <div className="mb-3">
              <p className="font-semibold text-moss-shadow">
                {log.plant_species || "Unknown Plant"}
              </p>
              <p className="text-sm text-gray-500">
                Logged by {log.user_email || "Unknown"} on{" "}
                {new Date(log.log_date || log.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="flex-1 space-y-2 text-biochar-black">
              <p className="text-sm">
                <span className="font-medium">Type:</span> {log.type}{" "}
                {log.issue && (
                  <span className="text-gray-600">– {log.issue}</span>
                )}
              </p>

              {log.description && (
                <p className="text-sm text-gray-700">{log.description}</p>
              )}

              {/* Use ContaminationMedia for photo/video */}
              {log.media_url && (
                <div className="mt-2">
                  <ContaminationMedia
                    src={log.media_url}
                    type={getMediaType(log.media_url)}
                    alt={`Contamination media for ${
                      log.plant_species || "plant"
                    }`}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
