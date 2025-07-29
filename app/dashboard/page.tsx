import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import QuickActions from "@/components/dashboard/QuickActions";
import PlantList from "@/components/dashboard/PlantList";
import TaskList from "@/components/dashboard/TaskList";

export default async function PlantCultureDashboard() {
  const supabase = await createClient();

  // Get user session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error fetching session:", sessionError);
  }
  if (!session) redirect("/login");

  // 1. Fetch plants only (no join)
  const { data: plants, error: plantsError } = await supabase
    .from("plants")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (plantsError) {
    console.error("Error fetching plants:", plantsError);
  }

  // 2. Fetch latest stage for each plant separately (RLS friendly)
  const plantsWithStages = plants
    ? await Promise.all(
        plants.map(async (plant) => {
          const { data: stageData, error: stageError } = await supabase
            .from("plant_stages")
            .select("*")
            .eq("plant_id", plant.id)
            .order("entered_on", { ascending: false })
            .limit(1);

          if (stageError) {
            console.error(
              `Error fetching stage for plant ${plant.id}`,
              stageError
            );
          }

          return {
            ...plant,
            current_stage: stageData?.[0] || null,
          };
        })
      )
    : [];

  // 3. Fetch tasks
  const { data: tasks, error: tasksError } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", session.user.id)
    .eq("is_completed", false)
    .gte("due_date", new Date().toISOString().split("T")[0])
    .order("due_date", { ascending: true })
    .limit(5);

  if (tasksError) {
    console.error("Error fetching tasks:", tasksError);
  }

  return (
    <div className="bg-milk-bio min-h-screen">
      {/* Hero */}
      <div className="sticky top-0 z-10 bg-white border-b border-spore-grey/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-moss-shadow">
              Plant Culture <span className="text-future-lime">Workspace</span>
            </h1>
            <nav
              aria-label="breadcrumb"
              className="text-xs text-gray-400 mt-0.5"
            >
              Dashboard / Workspace
            </nav>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        <QuickActions />

        {/* Overview */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-moss-shadow">
            Your Workspace
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Plants */}
            <div className="relative rounded-2xl shadow bg-gradient-to-br from-white to-milk-bio p-6">
              <h3 className="font-semibold text-moss-shadow mb-3">
                Your Cultured Plants
              </h3>
              <PlantList plants={plantsWithStages} />
            </div>

            {/* Tasks */}
            <div className="relative rounded-2xl shadow bg-gradient-to-br from-white to-milk-bio p-6">
              <h3 className="font-semibold text-moss-shadow mb-3">
                Reminders & Tasks
              </h3>
              <TaskList tasks={tasks ?? []} />
            </div>

            {/* Media Recipes */}
            <div className="relative rounded-2xl shadow bg-gradient-to-br from-white to-milk-bio p-6">
              <h3 className="font-semibold text-moss-shadow mb-3">
                Media Recipes
              </h3>
              <p className="text-gray-600 text-sm">
                Save recipes using our organic products or custom inputs.
              </p>
            </div>
          </div>
        </section>

        {/* Future Tools */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-moss-shadow">
            Upcoming Tools
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>
              <strong>Transfer Cycle Tracker</strong> – Auto reminders & visual
              progress.
            </li>
            <li>
              <strong>Cold Storage Planner</strong> – Track plants moved to cold
              storage.
            </li>
            <li>
              <strong>Contamination Log</strong> – Photo and note tracking.
            </li>
            <li>
              <strong>Reports & Insights</strong> – Growth charts over time.
            </li>
            <li>
              <strong>Community Recipes</strong> – Share and explore media
              blends.
            </li>
          </ul>
        </section>

        {/* Charts */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-moss-shadow">
            Stats & Graphs
          </h2>
          <div className="bg-white/80 rounded-2xl shadow p-10 text-gray-500 text-center">
            <p>Charts and analytics will appear here as features are built.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
