"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ContaminationForm from "@/components/dashboard/contamination/ContaminationForm";
import { ContaminationLog } from "@/lib/types";

export default function EditContaminationPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [log, setLog] = useState<ContaminationLog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchLog = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("contamination_logs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching contamination log:", error);
      } else {
        setLog(data);
      }
      setLoading(false);
    };

    fetchLog();
  }, [id, supabase]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }

  if (!log) {
    return <div className="p-8 text-center text-gray-500">Log not found.</div>;
  }

  return (
    <div className="min-h-screen bg-milk-bio py-16 px-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-12">
        <h1 className="text-3xl font-semibold text-moss-shadow mb-6">
          Edit Contamination Log
        </h1>
        <ContaminationForm
          initial={log}
          onSuccess={() => router.push("/dashboard/contamination")}
        />
      </div>
    </div>
  );
}
