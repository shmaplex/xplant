"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ContaminationLogWithRelations } from "@/lib/types";

export default function ContaminationList() {
  const [logs, setLogs] = useState<ContaminationLogWithRelations[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchLogs = async () => {
      const { data, error } = await supabase
        .from("contamination_logs_with_user")
        .select("*")
        .order("log_date", { ascending: false });

      if (error) {
        console.error("Error fetching contamination logs:", error);
        return;
      }

      if (data) setLogs(data);
    };

    fetchLogs();
  }, [supabase]);

  return (
    <div className="bg-milk-bio p-6 rounded-3xl shadow-xl">
      <h2 className="text-xl font-semibold text-moss-shadow mb-4">
        Contamination Reports
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
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

              {log.photo_url && (
                <div className="mt-2">
                  <img
                    src={`https://your-supabase-project.supabase.co/storage/v1/object/public/contamination-photos/${log.photo_url}`}
                    alt="Contamination"
                    className="rounded-xl max-h-48 w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {logs.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No contamination reports yet.
        </p>
      )}
    </div>
  );
}
