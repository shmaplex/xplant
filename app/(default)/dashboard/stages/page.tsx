import { fetchAllStages } from "@/lib/api/stage";
import StageTracker from "@/components/dashboard/stages/StageTracker";
import StageHistory from "@/components/dashboard/stages/StageHistory";
import StageForm from "@/components/dashboard/stages/StageForm";

export default async function StageTrackingPage() {
  const stages = await fetchAllStages();

  return (
    <div className="w-full p-8 bg-lichen-blue-light">
      <div className="max-w-7xl mx-auto space-y-12 min-h-screen bg-white/40 p-12 rounded-2xl">
        {/* Page Header */}
        <header className="space-y-4 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-lichen-blue-dark">
            Stage & Room <span className="text-lichen-blue">Tracking</span>
          </h1>
          <p className="text-base text-lichen-blue-dark max-w-2xl">
            Log, monitor, and review plant stages and room history.
          </p>
        </header>

        {/* Stage Form */}
        <section className="relative overflow-hidden rounded-3xl shadow-xl transition hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-lichen-blue-light via-lichen-blue/10 to-lichen-blue-light">
          <div className="absolute inset-0 bg-[url('/png/asfalt-light.png')] opacity-5 pointer-events-none" />
          <div className="relative p-8">
            <StageForm />
          </div>
        </section>

        {/* Current Stages */}
        <section className="relative overflow-hidden rounded-3xl shadow-xl transition hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-lichen-blue-light via-lichen-blue-dark/10 to-lichen-blue-light">
          <div className="absolute inset-0 bg-[url('/png/asfalt-light.png')] opacity-5 pointer-events-none" />
          <div className="relative p-8">
            <StageTracker />
          </div>
        </section>

        {/* Stage History */}
        <section className="relative overflow-hidden rounded-3xl shadow-xl transition hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-lichen-blue-light via-lichen-blue/10 to-lichen-blue-light">
          <div className="absolute inset-0 bg-[url('/png/asfalt-light.png')] opacity-5 pointer-events-none" />
          <div className="relative p-8">
            <StageHistory stages={stages} />
          </div>
        </section>
      </div>
    </div>
  );
}
