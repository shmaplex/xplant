import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AdminDashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="bg-[var(--milk-bio)] min-h-screen">
      <div className="bg-[var(--psybeam-purple)] text-white py-14 shadow-lg">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h1 className="text-4xl font-bold mb-2">Admin Control Center</h1>
          <p className="text-[var(--spore-grey)] text-lg">
            Manage users, seed data, and oversee app health.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Admin Tools */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-[var(--moss-shadow)]">
            Admin Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                label: "Seed Sample Data",
                desc: "Run the seed_new_user() RPC for any user",
                href: "/admin/seed-user",
              },
              {
                label: "Manage Users",
                desc: "Browse, promote, or remove users",
                href: "/admin/users",
              },
              {
                label: "View Logs",
                desc: "Contamination & transfer logs across accounts",
                href: "/admin/logs",
              },
              {
                label: "Media Recipe Library",
                desc: "Curate and edit shared media recipes",
                href: "/admin/recipes",
              },
              {
                label: "App Settings",
                desc: "Global configuration (coming soon)",
                href: "#",
              },
              {
                label: "Analytics",
                desc: "View usage and growth metrics (coming soon)",
                href: "#",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-xl p-6 shadow-md bg-gradient-to-br from-white to-[var(--spore-grey)] border border-[var(--spore-grey)] hover:shadow-lg transition-all"
              >
                <h3 className="font-semibold text-[var(--moss-shadow)] mb-2">
                  {item.label}
                </h3>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Coming Soon */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--moss-shadow)]">
            Future Features
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Role-based permissions</li>
            <li>Full database export tools</li>
            <li>Maintenance mode toggle</li>
            <li>Email templates and system messaging</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
