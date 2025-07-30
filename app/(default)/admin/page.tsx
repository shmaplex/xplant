import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardHero from "@/components/dashboard/DashboardHero";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  // Define all admin tools
  const adminTools = [
    {
      label: "Manage Products",
      desc: "View, edit, and delete products",
      href: "/admin/products",
    },
    {
      label: "Add New Product",
      desc: "Create a new product and upload details",
      href: "/admin/products/new",
    },
    {
      label: "Seed Sample Data",
      desc: "Run the seed_new_user() RPC for any user",
      href: "/admin/seed",
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
      href: "/admin/media",
    },
    {
      label: "App Settings",
      desc: "Global configuration (coming soon)",
      href: "/admin/settings",
    },
    {
      label: "Analytics",
      desc: "View usage and growth metrics (coming soon)",
      href: "#",
    },
  ];

  return (
    <div className="bg-[var(--milk-bio)] min-h-screen">
      <DashboardHero
        title="Admin"
        subtitle="Manage users, products, data, and oversee app health."
        variant="colored"
        highlight="Control Center"
      />

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-[var(--moss-shadow)]">
            Admin Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminTools.map((item) => (
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
