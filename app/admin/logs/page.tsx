"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import type {
  ContaminationLogWithRelations,
  PlantTransferWithRelations,
} from "@/lib/types";
import { formatDate } from "@/lib/date";

const PAGE_SIZE = 20;

function isContamLogArray(d: any): d is ContaminationLogWithRelations[] {
  return Array.isArray(d);
}

export default function AdminLogsPage() {
  const supabase = createClient();
  const [tab, setTab] = useState<"contamination" | "transfer">("contamination");
  const [loading, setLoading] = useState(false);

  const [contaminationLogs, setContaminationLogs] = useState<
    ContaminationLogWithRelations[]
  >([]);
  const [transferLogs, setTransferLogs] = useState<
    PlantTransferWithRelations[]
  >([]);

  const [contamPage, setContamPage] = useState(0);
  const [transferPage, setTransferPage] = useState(0);

  async function fetchContaminationLogs(page: number) {
    setLoading(true);
    const { data, error } = await supabase
      .from("contamination_logs_with_user")
      .select("*")
      .order("log_date", { ascending: false })
      .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

    setContaminationLogs((prev) =>
      page === 0
        ? (data as any as ContaminationLogWithRelations[])
        : [...prev, ...(data as any as ContaminationLogWithRelations[])]
    );

    setLoading(false);
    if (error) return console.error(error);
  }

  async function fetchTransferLogs(page: number) {
    setLoading(true);

    const { data, error } = await supabase
      .from("plant_transfers_with_user")
      .select("*")
      .order("transfer_date", { ascending: false })
      .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

    setLoading(false);

    if (error) {
      console.error(error);
      return;
    }

    // Explicitly cast to the type you expect
    const safeData = (data ?? []) as unknown as PlantTransferWithRelations[];

    setTransferLogs((prev) => (page === 0 ? safeData : [...prev, ...safeData]));
  }

  useEffect(() => {
    if (tab === "contamination") fetchContaminationLogs(contamPage);
    else fetchTransferLogs(transferPage);
  }, [tab, contamPage, transferPage]);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-moss-shadow">Logs</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {["contamination", "transfer"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`px-4 py-2 rounded-lg font-medium transition
              ${
                tab === t
                  ? " bg-psybeam-purple text-white shadow-md"
                  : "bg-spore-grey text-moss-shadow hover:bg-milk-bio"
              }
            `}
          >
            {t === "contamination" ? "Contamination Logs" : "Transfer Logs"}
          </button>
        ))}
      </div>

      {loading && (
        <div className="mb-4  text-psybeam-purple animate-pulse">
          Loading...
        </div>
      )}

      {tab === "contamination" && (
        <div className="rounded-xl overflow-hidden shadow">
          <table className="min-w-full border border-spore-grey">
            <thead className="bg-gradient-to-r from-[var(--psybeam-purple)] to-[var(--organic-amber)] text-white">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Species</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Issue</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">User</th>
              </tr>
            </thead>
            <tbody className="bg-milk-bio">
              {contaminationLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-t border-spore-grey hover:bg-organic-amber-light"
                >
                  <td className="px-4 py-2">{formatDate(log.log_date)}</td>
                  <td>{log.plant_species}</td>
                  <td className="px-4 py-2">{log.description}</td>
                  <td className="px-4 py-2">{log.issue || "n/a"}</td>
                  <td className="px-4 py-2">{log.type}</td>
                  <td>{log.user_email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {contaminationLogs.length >= (contamPage + 1) * PAGE_SIZE && (
            <button
              onClick={() => setContamPage((p) => p + 1)}
              className="w-full py-3  bg-psybeam-purple text-white hover:bg-organic-amber transition"
            >
              Load More
            </button>
          )}
        </div>
      )}

      {tab === "transfer" && (
        <div className="rounded-xl overflow-hidden shadow">
          <table className="min-w-full border border-spore-grey">
            <thead className="bg-gradient-to-r from-[var(--psybeam-purple)] to-[var(--organic-amber)] text-white">
              <tr>
                <th className="px-4 py-2 text-left">Transfer Date</th>
                <th className="px-4 py-2 text-left">Species</th>
                <th className="px-4 py-2 text-left">Cycle</th>
                <th className="px-4 py-2 text-left">Notes</th>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Created At</th>
              </tr>
            </thead>
            <tbody className="bg-milk-bio">
              {transferLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-t border-spore-grey hover:bg-organic-amber-light"
                >
                  <td className="px-4 py-2">
                    {new Date(log.transfer_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{log.plant_species}</td>
                  <td className="px-4 py-2">{log.transfer_cycle}</td>
                  <td className="px-4 py-2">{log.notes}</td>
                  <td className="px-4 py-2">{log.user_email}</td>
                  <td className="px-4 py-2">{formatDate(log.created_at)}</td>
                </tr>
              ))}

              {transferLogs.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-gray-500 italic"
                  >
                    No transfer logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {transferLogs.length >= (transferPage + 1) * PAGE_SIZE && (
            <button
              onClick={() => setTransferPage((p) => p + 1)}
              className="w-full py-3  bg-psybeam-purple text-white hover:bg-organic-amber transition"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}
