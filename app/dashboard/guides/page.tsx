import GuideList from "@/components/dashboard/guides/GuideList";

export default function GuideDashboardPage() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-biochar-black">
        Knowledge & Guides
      </h1>
      <GuideList />
    </div>
  );
}
