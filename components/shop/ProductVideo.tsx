import { LuVideoOff } from "react-icons/lu";

interface ProductVideoProps {
  videoId?: string;
  title?: string;
  description?: string;
}

export default function ProductVideo({
  videoId,
  title = "Watch the Product in Action",
  description = "Get tips for setup, maintenance, and making your worm farm thrive.",
}: ProductVideoProps) {
  return (
    <section className="w-full bg-[#F3EFE9] py-24 px-4 sm:px-8 lg:px-16 group">
      <div className="mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition ease-in-out duration-500 bg-white grid lg:grid-cols-2 gap-10 border border-[#E5E1D8]">
        {/* Left: Video or Placeholder */}
        <div
          className={`relative aspect-video w-full h-full flex items-center justify-center text-center rounded-tl-lg rounded-bl-lg transition-all duration-300 ${
            videoId ? "bg-black" : "bg-[#EDE9E3]"
          }`}
        >
          {videoId ? (
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Product video"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center px-6 w-full">
              <LuVideoOff className="w-10 h-10 text-[#A09B91]" />
              <p className="mt-4 text-[#5C584F] text-base font-medium">
                No video yet for this product.
              </p>
              <p className="text-[#8A867E] text-sm mt-1">
                We&rsquo;re working on something worth watching.
              </p>
            </div>
          )}
        </div>

        {/* Right: Textual Content */}
        <div className="flex flex-col justify-center p-6 space-y-6 text-[#2F2F2F]">
          <div className="inline-block text-xs uppercase tracking-wide border border-[#DDD6CB] text-[#5D5345] px-3 py-1 rounded-full w-fit bg-[#F9F7F3]">
            See It in Action
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-[#444] leading-relaxed">
            {description}
          </p>

          <ul className="text-sm text-[#5E5A54] list-disc pl-5 space-y-1">
            <li>Learn best practices for setup</li>
            <li>Tips for keeping worms happy</li>
            <li>See how to harvest castings</li>
          </ul>

          <div>
            <a
              href="https://www.youtube.com/@DirtmanDiaries"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-[#2F2F2F] underline hover:text-black"
            >
              Visit Dirtman Diaries on YouTube &rsaquo;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
