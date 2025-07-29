// app/dashboard/transfers/new/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import NewTransferForm from "@/components/dashboard/transfers/NewTransferForm";

export default function NewTransferPage() {
  const searchParams = useSearchParams();
  const transferId = searchParams.get("id");

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-semibold">
        {transferId ? "Edit Transfer" : "New Transfer"}
      </h1>
      <NewTransferForm transferId={transferId} />
    </div>
  );
}
