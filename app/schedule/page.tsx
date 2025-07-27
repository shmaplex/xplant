// app/worm-schedule/page.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WeekOverview, TipBox } from "@/components/WormSchedule";
import { FiArrowRight } from "react-icons/fi";
import { supabase } from "@/lib/supabaseClient";
import RecentCheckins from "@/components/RecentCheckins";

async function getCheckins() {
  const { data, error } = await supabase
    .from("worm_checkins")
    .select("*")
    .order("checkin_date", { ascending: false })
    .limit(30);

  if (error) {
    console.error("Error fetching check-ins:", error);
    return [];
  }

  return data;
}

export default async function WormSchedulePage() {
  const checkins = await getCheckins();

  return (
    <div className="font-sans bg-[#F8F4EC] text-[#2F2F2F] min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[30vh] w-full flex items-center justify-center">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/png/header-schedule.png')", // replace with a real image path or a frame from one of your videos
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Text content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Worm Breeding Schedule 🪱
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-100 drop-shadow-md">
            A simple, optimized weekly routine to help your red wigglers thrive
            and multiply in your vermicompost system.
          </p>
        </div>
      </section>

      <main className="flex-1 px-6 sm:px-10 py-16">
        <div className="max-w-5xl mx-auto space-y-20">
          {/* Dynamic weekly tasks */}
          <section>
            <WeekOverview checkins={checkins} />
          </section>

          {/* Tips & best practices */}
          <section>
            <TipBox />
          </section>

          {/* Recent check-ins preview */}
          {checkins.length > 0 && (
            <section>
              <RecentCheckins checkins={checkins} />
            </section>
          )}
        </div>
      </main>

      {/* Call to action */}
      <section className="w-full bg-[#ECE7DB] py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#3A3A3A] mb-4">
            Need a refresher on bin setup?
          </h2>
          <p className="text-base sm:text-lg text-[#4F4F4F] mb-6">
            Our step-by-step guide walks you through how to set up a thriving
            worm bin from scratch.
          </p>
          <a
            href="/guide/worm-bin"
            className="inline-flex items-center gap-2 bg-[#5C5138] text-white px-6 py-3 rounded-lg hover:bg-[#403a2b] transition-colors text-base sm:text-lg shadow-md group"
          >
            Read the Setup Guide
            <FiArrowRight className="mt-[1px] transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
