"use client";

import { useEffect, useState } from "react";
import { fetchContaminationLogs } from "@/lib/api/contamination";
import type { ContaminationLogWithRelations } from "@/lib/types";
import ContaminationCard from "./ContaminationCard";

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
    <div className="bg-white/80 backdrop-blur rounded-3xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-bio-red mb-6">
        Contamination Reports
      </h2>

      {logs.length === 0 ? (
        <p className="text-center text-gray-500">
          No contamination reports yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {logs.map((log) => (
            <ContaminationCard key={log.id} log={log} />
          ))}
        </div>
      )}
    </div>
  );
}
