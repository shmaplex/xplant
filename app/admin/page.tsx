import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AdminDashboard() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login"); // or redirect("/") if you don't have a login page
  }

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 py-16 shadow-lg">
          <div className="max-w-5xl mx-auto text-center text-white px-6">
            <h1 className="text-4xl font-bold mb-3">Admin Dashboard</h1>
            <p className="text-green-100 text-lg">
              Manage your worm farm and future Shmaplex features
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
          {/* Quick Overview */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Quick Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Worm Check-ins
                </h3>
                <p className="text-gray-600 text-sm">
                  Track daily worm farm activity, videos, and notes.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Analytics (Future)
                </h3>
                <p className="text-gray-600 text-sm">
                  Graphs and insights on worm health, growth, and trends.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Content Management (Future)
                </h3>
                <p className="text-gray-600 text-sm">
                  A place to manage site content, blog posts, or store data.
                </p>
              </div>
            </div>
          </section>

          {/* Upcoming Ideas */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Future Admin Tools
            </h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>
                **Inventory Manager**: track fingerboard shop stock levels.
              </li>
              <li>**Tea Batch Logger**: track batches of tea for Lifter.</li>
              <li>
                **Event Scheduling**: schedule and manage events, like café
                workshops or pop-ups.
              </li>
              <li>**Custom Reports**: generate PDFs for business insights.</li>
            </ul>
          </section>

          {/* Placeholder for Charts */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Stats & Graphs
            </h2>
            <div className="bg-white rounded-xl shadow p-10 text-gray-500 text-center">
              <p>Charts and analytics will go here in the future.</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
