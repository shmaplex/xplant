"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FiInfo, FiUser, FiTag, FiAlertTriangle } from "react-icons/fi";
import { BiLeaf } from "react-icons/bi"; // keeping BiLeaf as is, or should I replace it too?

import ContaminationMedia from "@/components/dashboard/contamination/ContaminationMedia";
import ContaminationStats from "@/components/dashboard/contamination/ContaminationStats";
import { fetchContaminationById } from "@/lib/api/contamination";
import type { ContaminationLogWithRelations } from "@/lib/types";
import { formatDate } from "@/lib/date";
import { getMediaType } from "@/lib/media";

export default function ContaminationDetailPage() {
  const pathname = usePathname();
  const id = pathname.split("/").filter(Boolean).pop() || "";

  const [log, setLog] = useState<ContaminationLogWithRelations | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setError("No contamination ID provided.");
      setLoading(false);
      return;
    }

    async function loadLog() {
      try {
        setLoading(true);
        const data = await fetchContaminationById(id);
        if (!data) {
          setError("Contamination report not found.");
        } else {
          setLog(data);
        }
      } catch (err) {
        setError("Failed to fetch contamination report.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadLog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading contamination report...</p>
      </div>
    );
  }

  if (error || !log) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-6 rounded-xl max-w-xl mx-auto text-center">
        <FiAlertTriangle className="w-16 h-16 text-red-400 mb-4" />
        <p className="text-red-600 font-semibold mb-2">
          {error || "Report not found"}
        </p>
        <p className="text-red-400">
          Please check the URL or return to the reports list.
        </p>
      </div>
    );
  }

  const mediaType = log.media_url ? getMediaType(log.media_url) : undefined;

  return (
    <div className="min-h-screen bg-spore-gray py-12 px-6 max-w-7xl w-full mx-auto justify-center space-y-16">
      {/* Info note */}
      <section className="w-full bg-[#e0e7ff] border border-psybeam-purple-dark rounded-xl p-4 flex items-center gap-3 text-[#4f46e5] text-sm font-medium shadow-sm">
        <FiInfo className="w-6 h-6 flex-shrink-0" />
        <p>
          Contamination report details logged on{" "}
          <time
            dateTime={log.log_date || log.created_at || ""}
            className="underline"
          >
            {formatDate(log.log_date || log.created_at)}
          </time>
          .
        </p>
      </section>

      <section className="w-full flex lg:flex-row flex-col space-y-8 lg:space-x-8 justify-start">
        {/* Summary */}
        <aside className="basis-1/3 bg-white rounded-3xl p-10 shadow-lg flex flex-col space-y-8">
          <h2 className="text-3xl font-semibold text-red-600 flex items-center gap-3">
            <BiLeaf className="text-red-600" size={28} /> Report Summary
          </h2>

          <dl className="flex flex-col gap-6">
            <div className="flex items-start gap-4 border-l-4 border-red-600 pl-4">
              <BiLeaf className="text-red-600 mt-1" size={20} />
              <div>
                <dt className="font-semibold text-lg text-gray-800">
                  Plant Species
                </dt>
                <dd className="text-gray-700">
                  {log.plant_species || "Unknown"}
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-4 border-l-4 border-red-600 pl-4">
              <FiUser className="text-red-600 mt-1" size={20} />
              <div>
                <dt className="font-semibold text-lg text-gray-800">
                  Logged By
                </dt>
                <dd className="text-gray-700">{log.user_email || "Unknown"}</dd>
              </div>
            </div>

            <div className="flex items-start gap-4 border-l-4 border-red-600 pl-4">
              <FiTag className="text-red-600 mt-1" size={20} />
              <div>
                <dt className="font-semibold text-lg text-gray-800">Type</dt>
                <dd className="text-gray-700">
                  {log.type}
                  {log.issue && (
                    <span className="italic text-gray-600 ml-2">
                      — {log.issue}
                    </span>
                  )}
                </dd>
              </div>
            </div>
          </dl>

          {log.description && (
            <section className="mt-4 border-t border-gray-200 pt-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-base">
                {log.description}
              </p>
            </section>
          )}
        </aside>

        {/* Media with aspect-square */}
        <main className="basis-2/3 bg-white rounded-3xl p-6 shadow-lg flex items-center justify-center aspect-square max-h-full max-w-full">
          <div className="w-full h-full rounded-3xl overflow-hidden">
            <ContaminationMedia
              src={log.media_url || undefined}
              type={mediaType || "photo"}
              alt={
                log.media_url
                  ? `Contamination media for report ${log.id}`
                  : "Placeholder contamination media"
              }
            />
          </div>
        </main>
      </section>

      {/* Stats - full width */}
      <section className="w-full bg-white rounded-3xl p-8 shadow-lg">
        <ContaminationStats />
      </section>
    </div>
  );
}
