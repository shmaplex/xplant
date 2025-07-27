import { FaSyncAlt, FaYoutube } from "react-icons/fa";

type DayCardBackProps = {
  backMessage: string;
  onFlip: () => void;
  videoUrl?: string | null;
};

export default function DayCardBack({
  backMessage,
  onFlip,
  videoUrl,
}: DayCardBackProps) {
  return (
    <div className="inset-0 h-full backface-hidden rotate-y-180 rounded-2xl p-6 flex flex-col bg-gradient-to-br from-[#f8f4ec] via-[#f1eadc] to-[#e7decb] shadow-xl relative">
      {/* Flip Button */}
      <button
        onClick={onFlip}
        className="absolute top-4 right-4 text-[#5C5138] hover:text-[#403a2b] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#5C5138] rounded-full p-2 bg-white/70 backdrop-blur-sm hover:bg-white"
        title="Flip card"
        aria-label="Flip card"
      >
        <FaSyncAlt className="w-4 h-4" />
      </button>

      {/* Back Message */}
      <div className="flex-grow flex items-center justify-center text-center px-4">
        <p className="text-lg sm:text-xl text-[#5C5138] font-semibold leading-snug">
          {backMessage}
        </p>
      </div>

      {/* Watch Video Button */}
      {videoUrl && (
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 mx-auto inline-flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-2 shadow-sm hover:bg-red-100 transition-colors duration-300"
        >
          <FaYoutube className="text-red-600 w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="text-red-700 font-semibold text-sm group-hover:underline">
            Watch Video
          </span>
        </a>
      )}
    </div>
  );
}
