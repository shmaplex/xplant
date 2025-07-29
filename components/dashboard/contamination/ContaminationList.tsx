"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type ContaminationLog = {
  id: string;
  plant_id: string;
  notes: string;
  photo_url?: string;
  created_at: string;
};

export default function ContaminationList() {
  const [logs, setLogs] = useState<ContaminationLog[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await supabase
        .from("contamination_logs")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setLogs(data);
    };

    fetchLogs();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-semibold text-moss-shadow">
        Contamination Reports
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {logs.map((log) => (
          <div key={log.id} className="border p-3 rounded space-y-2">
            <p className="text-sm font-medium">Plant ID: {log.plant_id}</p>
            <p className="text-sm text-gray-700">{log.notes}</p>
            {log.photo_url && (
              <img
                src={`https://your-supabase-project.supabase.co/storage/v1/object/public/contamination-photos/${log.photo_url}`}
                alt="Contamination"
                className="rounded max-h-40 object-cover"
              />
            )}
            <p className="text-xs text-gray-500">
              Logged on {new Date(log.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
