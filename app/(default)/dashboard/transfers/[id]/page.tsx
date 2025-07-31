import { redirect } from "next/navigation";
import { fetchTransferById } from "@/api/transfer";
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";
import { createClient } from "@/lib/supabase/server";

type TransferDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function TransferDetailPage({
  params,
}: TransferDetailPageProps) {
  const supabase = await createClient();

  // Check session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error fetching session:", sessionError);
  }
  if (!session) redirect("/login");

  const { id } = params;

  let transfer;
  try {
    transfer = await fetchTransferById(id);
    if (!transfer) {
      redirect("/dashboard/transfers"); // or show 404 page
    }
  } catch (error) {
    console.error("Failed to fetch transfer:", error);
    redirect("/dashboard/transfers");
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-moss-shadow">Transfer Detail</h1>
        <Link
          href={`/dashboard/transfers/${id}/edit`}
          className="text-green-700 hover:text-green-900 flex items-center gap-1 font-semibold"
        >
          <FiEdit2 className="w-5 h-5" />
          Edit
        </Link>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          {transfer.plant?.species || "Unknown Plant"}
        </h2>
        <p className="text-gray-600">
          <strong>Transfer Date: </strong>
          {transfer.transfer_date
            ? new Date(transfer.transfer_date).toLocaleDateString()
            : "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Transfer Cycle: </strong>
          {transfer.transfer_cycle ?? "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Source: </strong>
          {transfer.plant?.source ?? "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Current Stage: </strong>
          {transfer.plant?.plant_stages?.stage ?? "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Room: </strong>
          {transfer.plant?.plant_stages?.room ?? "N/A"}
        </p>
        <p className="text-gray-600 whitespace-pre-line">
          <strong>Notes: </strong>
          {transfer.notes || "No additional notes"}
        </p>
      </section>

      <Link
        href="/dashboard/transfers"
        className="inline-block mt-8 text-sm text-green-700 hover:text-green-900 font-medium"
      >
        ← Back to Transfers
      </Link>
    </div>
  );
}
