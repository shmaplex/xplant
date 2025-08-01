import GuideList from "@/components/dashboard/guides/GuideList";

export default function GuideDashboardPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      {/* Page Header */}
      <section className="relative z-10">
        <h1 className="text-3xl font-bold text-moss-shadow">
          Knowledge & Guides
        </h1>
      </section>

      {/* Guides Section */}
      <section className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(183,239,72,0.3),transparent_70%)] blur-3xl pointer-events-none"
        />
        <div className="relative">
          <GuideList />
        </div>
      </section>
    </main>
  );
}
