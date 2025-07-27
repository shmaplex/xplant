import { FaLeaf, FaBan, FaClock, FaBalanceScale } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WormFeedingGuide() {
  return (
    <div className="font-sans bg-[#F8F4EC] text-[#2F2F2F] min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow px-6 sm:px-12 py-16 max-w-6xl mx-auto space-y-16">
        <h1 className="text-4xl font-bold text-center">Worm Feeding Guide</h1>

        {/* Feeding Basics */}
        <section className="grid sm:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FaBalanceScale className="text-green-600" />
              How Much to Feed
            </h2>
            <p className="text-[#444]">
              Start small. A good rule of thumb is to feed your worms about{" "}
              <strong>500 grams of food per 1 kilogram of worms per day</strong>
              . It&rsquo;s better to underfeed than overfeed at first. Let your
              worms adjust and observe how much they consume before increasing
              the amount.
            </p>
            <p className="text-[#444]">
              <em>Relatable example:</em> For 1 kilogram of worms, feed
              approximately half a kilogram of food daily — about the size of a
              medium apple or a generous handful of chopped vegetable scraps.
            </p>
            <ul className="list-disc pl-5 text-[#444]">
              <li>Feed 1&ndash;2 times per week</li>
              <li>If food remains after 3&ndash;4 days, feed less next time</li>
              <li>Chop food into small pieces to speed up decomposition</li>
            </ul>
          </div>
          <div className="bg-green-100 rounded-2xl p-6 shadow-md">
            <h3 className="font-bold text-lg mb-2">Pro Tip &nbsp;&#127793;</h3>
            <p className="text-[#2F2F2F]">
              Blend or mash scraps to speed up breakdown. Avoid feeding too much
              at once — it can cause odors or attract pests.
            </p>
          </div>
        </section>

        {/* What to Feed */}
        <section className="grid sm:grid-cols-2 gap-10">
          <div className="bg-white border border-green-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-700">
              <FaLeaf />
              Worms Love These
            </h2>
            <ul className="space-y-2 text-[#2F2F2F] list-disc pl-5">
              <li>Fruit and vegetable scraps (avoid citrus & spicy)</li>
              <li>Tea bags (without plastic), coffee grounds & filters</li>
              <li>Shredded paper, cardboard, eggshells (crushed)</li>
              <li>Cooked rice or pasta (plain & unseasoned)</li>
            </ul>
          </div>

          <div className="bg-white border border-red-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-red-600">
              <FaBan />
              Do NOT Feed These
            </h2>
            <ul className="space-y-2 text-[#2F2F2F] list-disc pl-5">
              <li>Meat, dairy, oil, or processed foods</li>
              <li>Spicy, salty, or citrus-heavy items</li>
              <li>Glossy/coated paper, stickers, plastics</li>
              <li>Onion and garlic in large amounts</li>
            </ul>
          </div>
        </section>

        {/* Feeding Schedule */}
        <section className="bg-[#fff7e0] rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-yellow-700">
            <FaClock />
            Feeding Schedule
          </h2>
          <div className="space-y-2 text-[#444]">
            <p>
              Red Wigglers thrive on routine. Once or twice a week is ideal for
              most home bins. Observe how quickly they consume what you give.
            </p>
            <ul className="list-disc pl-5">
              <li>
                <strong>Monday:</strong> Small feeding (veggies, coffee, paper)
              </li>
              <li>
                <strong>Thursday/Friday:</strong> Top up with another small
                batch
              </li>
              <li>
                <strong>Sunday:</strong> Quick bin check — remove uneaten food
                if needed
              </li>
            </ul>
          </div>
        </section>

        {/* Extra Tips */}
        <section className="grid sm:grid-cols-2 gap-8">
          <div className="bg-[#ecfdf5] p-6 rounded-xl">
            <h3 className="font-semibold text-green-700 mb-2">Bin Odor?</h3>
            <p className="text-[#444]">
              It should smell earthy. A foul smell means overfeeding or poor
              airflow. Stop feeding and add dry bedding (shredded paper or
              coconut coir).
            </p>
          </div>

          <div className="bg-[#fef3c7] p-6 rounded-xl">
            <h3 className="font-semibold text-yellow-800 mb-2">Fruit Flies?</h3>
            <p className="text-[#444]">
              Bury the food deeper under bedding and freeze scraps before
              feeding. Add a layer of dry bedding after each feed.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
