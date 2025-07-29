// app/dashboard/stages/page.tsx
"use client";

import StageTracker from "@/components/dashboard/stages/StageTracker";
import StageHistory from "@/components/dashboard/stages/StageHistory";
import StageForm from "@/components/dashboard/stages/StageForm";

export default function StageTrackingPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-moss-shadow">
        Stage & Room Tracking
      </h1>
      <StageForm />
      <StageTracker />
      <StageHistory />
    </div>
  );
}
