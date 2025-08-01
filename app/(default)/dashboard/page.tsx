import { redirect } from "next/navigation";
import Link from "next/link";
import { FiAlertCircle, FiCheckSquare } from "react-icons/fi";

import { fetchTransfersWithPlantDetails } from "@/lib/api/transfer";
import { fetchPlants, fetchPlantStages } from "@/lib/api/plant";

import DashboardHero from "@/components/dashboard/DashboardHero";
import QuickActions from "@/components/dashboard/QuickActions";
import PlantList from "@/components/dashboard/PlantList";
import TaskList from "@/components/dashboard/TaskList";
import RecentTransfers from "@/components/dashboard/transfers/RecentTransfers";
import UpcomingFeatures from "@/components/dashboard/UpcomingFeatures";

import { PlantTransfer, Plant } from "@/lib/types";

import { createClient } from "@/lib/supabase/server";
import { BiLeaf } from "react-icons/bi";
import GuideList from "@/components/dashboard/guides/GuideList";

export default async function PlantCultureDashboard() {
  const supabase = await createClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) console.error("Error fetching session:", sessionError);
  if (!session) redirect("/login");

  const userId = session.user.id;
  const userEmail = session.user.email;

  let recentTransfers: PlantTransfer[] = [];

  try {
    if (!userId) {
      throw new Error("User ID is missing");
    }
    recentTransfers = await fetchTransfersWithPlantDetails(userId);
  } catch (err) {
    console.error(
      "Failed to fetch recent transfers:",
      err instanceof Error ? err.message : err
    );
    recentTransfers = [];
  }

  let plants: Plant[] = [];
  try {
    plants = await fetchPlants(userId);
  } catch (err) {
    console.error("Error fetching plants", err);
  }

  // Get current stages per plant
  const plantsWithStages = await Promise.all(
    plants.map(async (plant) => {
      let stageData = null;
      try {
        const stages = await fetchPlantStages(plant.id);
        stageData = stages?.[0] ?? null; // latest stage
      } catch (err) {
        console.error(`Error fetching stage for plant ${plant.id}`, err);
      }
      return {
        ...plant,
        current_stage: stageData,
      };
    })
  );

  // Fetch tasks - You can move this to an API method too if desired
  const { data: tasks, error: tasksError } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .eq("is_completed", false)
    .gte("due_date", new Date().toISOString().split("T")[0])
    .order("due_date", { ascending: true })
    .limit(5);

  if (tasksError) console.error("Error fetching tasks:", tasksError);

  // Contamination logs - Consider moving this to an API interface as well
  const { data: contaminationLogs, error: contaminationError } = await supabase
    .from("contamination_logs_with_user")
    .select("*")
    .eq("user_email", userEmail)
    .order("log_date", { ascending: false })
    .limit(10);

  if (contaminationError)
    console.error("Error fetching contamination logs:", contaminationError);

  return (
    <div className="bg-milk-bio/10 min-h-screen">
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
            <div className="relative rounded-3xl shadow-xl bg-gradient-to-br from-future-lime/50 via-future-lime/10 to-future-lime/40 flex flex-col max-w-xl">
              <div className="p-6 flex-1">
                <h3 className="font-semibold text-moss-shadow mb-5 text-lg tracking-wide flex items-center">
                  <BiLeaf className="w-5 h-5 mr-2 text-moss-shadow" /> Your
                  Cultured Plants
                </h3>
                <PlantList plants={plantsWithStages} />
              </div>
              <div className="text-right bg-milk-bio/80 px-6 py-4 rounded-b-3xl border-t border-gray-300">
                <Link
                  href="/dashboard/plants"
                  className="text-sm text-moss-shadow hover:text-green-700 font-semibold transition-colors"
                >
                  See all plants in the logbook →
                </Link>
              </div>
            </div>

            {/* Tasks */}
            <div className="relative rounded-3xl shadow-xl bg-gradient-to-br from-lichen-blue-light/50 via-lichen-blue/10 to-lichen-blue-light/40 flex flex-col max-w-xl">
              <div className="p-6 flex-1">
                <h3 className="font-bold text-lichen-blue-dark text-lg mb-4 flex items-center">
                  <FiCheckSquare className="w-5 h-5 mr-2 text-lichen-blue-dark" />
                  Reminders & Tasks
                </h3>

                <TaskList tasks={tasks ?? []} />
              </div>
              <div className="text-right bg-milk-bio/70 px-6 py-3 rounded-b-2xl border-t border-gray-200">
                <Link
                  href="/dashboard/tasks"
                  className="text-sm text-lichen-blue-dark hover:text-lichen-blue font-medium"
                >
                  View all tasks →
                </Link>
              </div>
            </div>

            {/* Contamination */}
            <div className="relative rounded-3xl shadow-lg bg-gradient-to-br from-bio-red-light/50 via-bio-red-light/10 to-bio-red-light/40 flex flex-col overflow-hidden">
              <div className="p-6 flex-1">
                <h3 className="font-bold text-bio-red text-lg mb-4 flex items-center">
                  <FiAlertCircle className="w-5 h-5 mr-2 text-bio-red" />
                  Recent Contamination Reports
                </h3>

                {contaminationLogs && contaminationLogs.length > 0 ? (
                  <ul
                    className="space-y-3 max-h-56 overflow-auto pr-1 py-3"
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                      maskImage:
                        "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                    }}
                  >
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

        {/* Recent Transfers Section */}
        <RecentTransfers transfers={recentTransfers} />

        {/* Guides Section */}
        <section className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(183,239,72,0.3),transparent_70%)] blur-3xl pointer-events-none"
          />
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-moss-shadow">Guides</h2>
            <Link
              href="/dashboard/guides"
              className="px-5 py-2 bg-future-lime text-moss-shadow hover:bg-moss-shadow hover:text-future-lime rounded-md font-semibold transition whitespace-nowrap flex items-center justify-center duration-500 ease-in-out"
            >
              View All
            </Link>
          </div>

          <GuideList limit={4} />
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
