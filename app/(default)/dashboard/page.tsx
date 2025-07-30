import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import DashboardHero from "@/components/dashboard/DashboardHero";
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

  const userId = session.user.id;
  const userEmail = session.user.email;

  // 1. Fetch plants
  const { data: plants, error: plantsError } = await supabase
    .from("plants")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (plantsError) {
    console.error("Error fetching plants:", plantsError);
  }

  // 2. Fetch latest stage for each plant
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
    .eq("user_id", userId)
    .eq("is_completed", false)
    .gte("due_date", new Date().toISOString().split("T")[0])
    .order("due_date", { ascending: true })
    .limit(5);

  if (tasksError) {
    console.error("Error fetching tasks:", tasksError);
  }

  // 4. Fetch recent contamination logs
  const { data: contaminationLogs, error: contaminationError } = await supabase
    .from("contamination_logs_with_user")
    .select("*")
    .eq("user_email", userEmail)
    .order("log_date", { ascending: false })
    .limit(10);

  if (contaminationError) {
    console.error("Error fetching contamination logs:", contaminationError);
  }

  return (
    <div className="bg-milk-bio min-h-screen">
      {/* Hero */}
      <DashboardHero
        title="Plant Culture"
        highlight="Workspace"
        breadcrumb="Dashboard / Workspace"
        variant="light"
      />

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        <QuickActions />

        {/* Overview */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-moss-shadow">
            Your Workspace
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Plants */}
            <div className="relative rounded-2xl shadow bg-gradient-to-br from-white to-milk-bio flex flex-col">
              <div className="p-6 flex-1">
                <h3 className="font-semibold text-moss-shadow mb-3">
                  Your Cultured Plants
                </h3>
                <PlantList plants={plantsWithStages} />
              </div>
              <div className="bg-milk-bio/70 px-6 py-3 rounded-b-2xl border-t border-gray-200">
                <a
                  href="/dashboard/plants"
                  className="text-sm text-green-800 hover:text-green-600 font-medium"
                >
                  See all plants in the logbook →
                </a>
              </div>
            </div>

            {/* Tasks */}
            <div className="relative rounded-2xl shadow bg-gradient-to-br from-white to-milk-bio flex flex-col">
              <div className="p-6 flex-1">
                <h3 className="font-semibold text-moss-shadow mb-3">
                  Reminders & Tasks
                </h3>
                <TaskList tasks={tasks ?? []} />
              </div>
              <div className="bg-milk-bio/70 px-6 py-3 rounded-b-2xl border-t border-gray-200">
                <a
                  href="/dashboard/tasks"
                  className="text-sm text-green-800 hover:text-green-600 font-medium"
                >
                  View all tasks →
                </a>
              </div>
            </div>

            {/* Contamination Reports */}
            <div className="relative rounded-2xl shadow bg-gradient-to-br from-white to-milk-bio flex flex-col overflow-hidden">
              <div className="p-6 flex-1 overflow-y-auto">
                <h3 className="font-semibold text-moss-shadow mb-3">
                  Recent Contamination Reports
                </h3>
                {contaminationLogs && contaminationLogs.length > 0 ? (
                  <ul className="space-y-3 max-h-56 overflow-auto">
                    {contaminationLogs.map((log) => (
                      <li
                        key={log.id}
                        className="border border-spore-grey rounded p-3 bg-white shadow-sm"
                      >
                        <p className="text-sm font-medium text-moss-shadow">
                          {log.plant_species || "Unknown Plant"}
                        </p>
                        <p className="text-sm text-gray-700 truncate">
                          {log.issue}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Reported on{" "}
                          {new Date(log.log_date).toLocaleDateString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No contamination reports found.
                  </p>
                )}
              </div>
              <div className="bg-milk-bio/70 px-6 py-3 rounded-b-2xl border-t border-gray-200 text-right">
                <a
                  href="/dashboard/contamination"
                  className="text-sm text-green-800 hover:text-green-600 font-medium"
                >
                  View all contamination reports →
                </a>
              </div>
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
              <strong>Transfer Cycle Tracker</strong> &ndash; Auto reminders &
              visual progress.
            </li>
            <li>
              <strong>Cold Storage Planner</strong> &ndash; Track plants moved
              to cold storage.
            </li>
            <li>
              <strong>Contamination Log</strong> &ndash; Photo and note
              tracking.
            </li>
            <li>
              <strong>Reports & Insights</strong> &ndash; Growth charts over
              time.
            </li>
            <li>
              <strong>Community Recipes</strong> &ndash; Share and explore media
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
