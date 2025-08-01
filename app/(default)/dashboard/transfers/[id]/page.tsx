import TransferNotFound from "@/components/dashboard/transfers/TransferNotFound";
import TransferDetail from "@/components/dashboard/transfers/TransferDetail";
import { getCurrentUser } from "@/lib/api/user";
import { fetchTransferByIdWithRelations } from "@/lib/api/transfer";
import NotLoggedIn from "@/components/ui/NotLoggedIn";

export default async function TransferDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user) {
      return <NotLoggedIn />;
    }

    const transfer = await fetchTransferByIdWithRelations(id, user.id);
    if (!transfer) return <TransferNotFound />;

    const current_stage = transfer.plant?.plant_stages?.[0] ?? null;

    return (
      <div className="min-h-screen bg-[var(--milk-bio)] py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <TransferDetail
            transfer={transfer}
            currentStage={current_stage}
            canEdit={user.id === transfer.user_id}
            editUrl={`/dashboard/transfers/${id}/edit`}
          />
        </div>
      </div>
    );
  } catch (err) {
    console.error("Unexpected error in TransferDetailPage:", err);
    return <TransferNotFound />;
  }
}
