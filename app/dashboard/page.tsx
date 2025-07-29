import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { Plant, Task } from "@/lib/types";

export default async function PlantCultureDashboard() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: plants } = await supabase
    .from("plants")
    .select("*")
    .eq("user_id", session?.user.id)
    .order("created_at", { ascending: false });

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", session?.user.id)
    .eq("is_completed", false)
    .gte("due_date", new Date().toISOString().split("T")[0])
    .order("due_date", { ascending: true })
    .limit(5);

  return (
    <div className="bg-[var(--milk-bio)] min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[var(--moss-shadow)] to-[var(--future-lime)] py-16 shadow-lg">
        <div className="max-w-5xl mx-auto text-center text-white px-6">
          <h1 className="text-4xl font-bold mb-3">Plant Culture Workspace</h1>
          <p className="text-[var(--spore-grey)] text-lg">
            Track your cultures, manage schedules, and grow your skills.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-[var(--moss-shadow)]">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Add New Plant",
                desc: "Log a new culture line",
                href: "/dashboard/plants/new",
              },
              {
                label: "Record Transfer",
                desc: "Update transfer cycle",
                href: "/dashboard/transfers/new",
              },
              {
                label: "Media Recipes",
                desc: "Create & manage recipes",
                href: "/dashboard/media",
              },
              {
                label: "View Schedule",
                desc: "Upcoming tasks",
                href: "/dashboard/tasks",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-xl p-6 shadow-md bg-gradient-to-br from-white to-[var(--spore-grey)] border border-[var(--spore-grey)] hover:shadow-lg hover:ring-2 hover:ring-future-lime/70 transition duration-200 block"
              >
                <h3 className="font-semibold text-[var(--moss-shadow)] mb-2">
                  {item.label}
                </h3>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Overview Cards */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-[var(--moss-shadow)]">
            Your Workspace
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Plant Overview Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold text-[var(--moss-shadow)] mb-3">
                Your Cultured Plants
              </h3>
              {plants?.length ? (
                <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {plants.map((plant: Plant) => {
                    const warningLevel =
                      plant.transfer_cycle >= 12
                        ? "bg-red-100 text-red-700"
                        : plant.transfer_cycle >= 10
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700";

                    return (
                      <li
                        key={plant.id}
                        className={`flex justify-between items-center p-2 rounded ${warningLevel}`}
                      >
                        <span className="truncate">
                          {plant.species} ({plant.transfer_cycle}/12)
                        </span>
                        <span className="text-xs uppercase font-bold tracking-wider">
                          {plant.current_stage}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-600 text-sm">No plants logged yet.</p>
              )}
            </div>

            {/* Reminders & Tasks Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold text-[var(--moss-shadow)] mb-2">
                Reminders & Tasks
              </h3>
              {tasks && tasks.length > 0 ? (
                <ul className="space-y-2 mt-2 max-h-48 overflow-y-auto pr-1">
                  {tasks.map((task: Task) => (
                    <li key={task.id} className="text-sm text-gray-700">
                      <span className="font-medium">{task.title}</span> —{" "}
                      <span className="capitalize text-gray-500">
                        {task.category.replace("_", " ")}
                      </span>
                      <span className="block text-xs text-gray-400">
                        Due {new Date(task.due_date).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No upcoming tasks.</p>
              )}
            </div>

            {/* Media Recipes Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold text-[var(--moss-shadow)] mb-2">
                Media Recipes
              </h3>
              <p className="text-gray-600 text-sm">
                Save recipes using our organic products or custom inputs.
              </p>
            </div>
          </div>
        </section>

        {/* Future Features */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--moss-shadow)]">
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
              <strong>Contamination Log</strong> &ndash; Photo and note tracking
              for issues.
            </li>
            <li>
              <strong>Reports & Insights</strong> &ndash; Charts of plant growth
              over time.
            </li>
            <li>
              <strong>Community Recipes</strong> &ndash; Share and explore
              proven media blends.
            </li>
          </ul>
        </section>

        {/* Charts Placeholder */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--moss-shadow)]">
            Stats & Graphs
          </h2>
          <div className="bg-white rounded-xl shadow p-10 text-gray-500 text-center">
            <p>Charts and analytics will appear here as features are built.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
