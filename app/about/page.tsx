import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="font-sans bg-[#F8F4EC] text-[#2F2F2F] min-h-screen flex flex-col">
      <Header />

      <main className="bg-[#F8F4EC] text-[#2F2F2F] font-sans">
        {/* Hero Section */}
        <section className="relative h-[60vh] sm:h-[75vh] w-full overflow-hidden">
          <Image
            src="/png/dirty-hands.png"
            alt="Dirty hands holding worms"
            layout="fill"
            objectFit="cover"
            className="brightness-90"
          />
          <div className="absolute inset-0 backdrop-blur-sm bg-white/25 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4 text-black text-center px-4">
              <Image
                src="/svg/dirtman-diaries-blk.svg"
                alt="Dirtman Diaries Logo"
                width={420}
                height={100}
              />
              <p className="text-sm sm:text-xl font-normal">
                Compost, curiosity, and a cast of worms.
              </p>

              {/* YouTube Button */}
              <Link
                href="https://www.youtube.com/@DirtmanDiaries"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 bg-[#FF0000] text-white text-lg sm:text-xl font-semibold px-6 py-3 rounded-md duration-500 ease-in-out shadow-lg hover:bg-[#cc0000] transition"
              >
                <FaYoutube className="text-2xl group-hover:scale-110 transition-transform" />
                Watch on YouTube
              </Link>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="max-w-3xl mx-auto py-16 px-6 space-y-8">
          <h2 className="text-3xl font-bold">The Dirtman Story</h2>
          <p className="text-lg leading-relaxed">
            Dirtman Diaries started with a single worm bin in a corner of a
            small kitchen. What began as a curiosity about composting turned
            into a full-blown obsession with worms, soil health, and the
            beautiful cycle of decomposition.
          </p>
          <p className="text-lg leading-relaxed">
            This is a space to share that journey—tracking worm breeding, bin
            experiments, failures, mold disasters, and the weird joy of watching
            scraps turn into life. Whether you&rsquo;re here to learn, laugh, or
            get your hands dirty, welcome to the Diaries.
          </p>
        </section>

        <section className="bg-[#E2D9C4] py-16 px-6">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <h2 className="text-2xl font-semibold">Why Dirt Matters</h2>
            <p className="text-base leading-relaxed">
              Healthy soil means healthy life. Dirtman Diaries exists to
              reconnect people to the ground beneath them—by showing how even
              your kitchen scraps can become something alive again.
            </p>
            <p className="text-base leading-relaxed">
              This isn&rsquo;t just about compost. It&rsquo;s about slowing
              down, paying attention, and learning from the natural processes we
              usually ignore.
            </p>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
