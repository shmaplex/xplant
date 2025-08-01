import { fetchAllStages } from "@/lib/api/stage";
import StageTracker from "@/components/dashboard/stages/StageTracker";
import StageHistory from "@/components/dashboard/stages/StageHistory";
import StageForm from "@/components/dashboard/stages/StageForm";

export default async function StageTrackingPage() {
  const stages = await fetchAllStages(); // Fetch from API

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-moss-shadow">
        Stage & Room Tracking
      </h1>
      <StageForm />
      <StageTracker />
      <StageHistory stages={stages} />
    </div>
  );
}
