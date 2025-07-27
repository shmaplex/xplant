import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import InsideBin from "@/components/InsideBin";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import CommunityCallout from "@/components/CommunityCallout";
import GearGrid from "@/components/GearGrid";
import Testimonials from "@/components/Testimonials";
// The latest video ID to show in the YouTube embed on the landing page
import { fetchLatestVideoId } from "@/lib/fetch-latest-video";

export default async function HomePage() {
  const latestVideoId = (await fetchLatestVideoId()) || "zr-g5pm39jc";

  return (
    <div className="w-full font-sans bg-[#F8F4EC] text-[#2F2F2F] min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto flex flex-col items-center">
        <div className="max-w-6xl px-6 space-y-12 pt-24">
          <Hero />
          <Stats />
        </div>
        <div className="w-full bg-[#ECE7DB] py-24 mt-24 bg-[url(/png/dirt.png)] bg-repeat bg-cover bg-center">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12 bg-black/40 backdrop-blur-sm rounded-xl shadow-lg">
            <InsideBin />
          </div>
        </div>
        <div className="w-full bg-[#d6d0c4] mb-24 lg:py-0 p-8 lg:p-0">
          <div className="">
            <YouTubeEmbed videoId={latestVideoId} />
          </div>
        </div>
        <div className="max-w-6xl w-full pb-24 px-6 sm:px-0">
          <CommunityCallout />
        </div>
        {/* <GearGrid /> */}
        <div className="relative w-screen bg-[#ECE7DB] py-32">
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            <Testimonials />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
