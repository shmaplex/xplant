import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { FiAlertCircle, FiCheckSquare } from "react-icons/fi";

import DashboardHero from "@/components/dashboard/DashboardHero";
import QuickActions from "@/components/dashboard/QuickActions";
import PlantList from "@/components/dashboard/PlantList";
import TaskList from "@/components/dashboard/TaskList";
import UpcomingFeatures from "@/components/dashboard/UpcomingFeatures";

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
            <div className="relative rounded-3xl shadow-xl bg-gradient-to-br from-white to-milk-bio flex flex-col max-w-xl">
              <div className="p-6 flex-1">
                <h3 className="font-semibold text-moss-shadow mb-5 text-lg tracking-wide">
                  Your Cultured Plants
                </h3>
                <PlantList plants={plantsWithStages} />
              </div>
              <div className="text-right bg-milk-bio/80 px-6 py-4 rounded-b-3xl border-t border-gray-300">
                <Link
                  href="/dashboard/plants"
                  className="text-sm text-green-900 hover:text-green-700 font-semibold transition-colors"
                >
                  See all plants in the logbook →
                </Link>
              </div>
            </div>

            {/* Tasks */}
            <div className="relative rounded-3xl shadow-xl bg-gradient-to-br from-white to-milk-bio flex flex-col max-w-xl">
              <div className="p-6 flex-1">
                <h3 className="font-bold text-green-800 text-lg mb-4 flex items-center">
                  <FiCheckSquare className="w-5 h-5 mr-2 text-green-700" />
                  Reminders & Tasks
                </h3>

                <TaskList tasks={tasks ?? []} />
              </div>
              <div className="text-right bg-milk-bio/70 px-6 py-3 rounded-b-2xl border-t border-gray-200">
                <a
                  href="/dashboard/tasks"
                  className="text-sm text-green-800 hover:text-green-600 font-medium"
                >
                  View all tasks →
                </a>
              </div>
            </div>

            <div className="relative rounded-3xl shadow-lg bg-gradient-to-br from-white to-milk-bio flex flex-col overflow-hidden">
              <div className="p-6 flex-1">
                <h3 className="font-bold text-red-700 text-lg mb-4 flex items-center">
                  <FiAlertCircle className="w-5 h-5 mr-2 text-red-600" />
                  Recent Contamination Reports
                </h3>

                {contaminationLogs && contaminationLogs.length > 0 ? (
                  <ul className="space-y-3 max-h-56 overflow-auto pr-1">
                    {contaminationLogs.map((log) => (
                      <li key={log.id}>
                        <Link
                          href={`/dashboard/contamination/${log.id}`}
                          className="block border border-red-100 rounded-xl p-4 bg-white shadow-sm hover:shadow-md hover:border-red-200 hover:bg-red-50/40 transition group"
                        >
                          <p className="text-sm font-semibold text-red-700 group-hover:text-red-800">
                            {log.plant_species || "Unknown Plant"}
                          </p>
                          <p className="text-sm text-gray-700 truncate">
                            {log.issue}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Reported on{" "}
                            {new Date(log.log_date).toLocaleDateString()}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No contamination reports found.
                  </p>
                )}
              </div>

              <div className="bg-milk-bio/80 px-6 py-3 rounded-b-3xl border-t border-gray-200 text-right">
                <Link
                  href="/dashboard/contamination"
                  className="inline-block text-sm text-red-700 hover:text-red-800 font-medium transition"
                >
                  View all reports →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Future Tools */}
        <UpcomingFeatures />

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
