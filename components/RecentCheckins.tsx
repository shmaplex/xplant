"use client";

import { useState } from "react";
import { FaPlay } from "react-icons/fa";

type Checkin = {
  id: number;
  checkin_date: string;
  video_url: string;
  notes: string;
};

export default function RecentCheckins({ checkins }: { checkins: Checkin[] }) {
  const [visibleCount, setVisibleCount] = useState(5);
  const showMore = () => setVisibleCount((prev) => prev + 5);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Recent Worm Check-ins
      </h2>

      <div className="space-y-4">
        {checkins.slice(0, visibleCount).map((c) => {
          const dateLabel = new Date(c.checkin_date).toLocaleDateString();
          return (
            <div
              key={c.id}
              className="relative bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex group"
            >
              {/* Left content */}
              <div className="flex-1 flex flex-col">
                {/* Date label wrapper */}
                <div className="-mt-[2px] ml-0">
                  <span
                    className="inline-block bg-black/5 text-black/40 text-xs font-medium px-3 py-1 rounded-br-lg rounded-tl-lg"
                    style={{ width: "auto" }}
                  >
                    {dateLabel}
                  </span>
                </div>

                {/* Notes area */}
                <div className="p-5 pt-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {c.notes || "No notes provided."}
                  </p>
                </div>
              </div>

              {/* Play button strip */}
              {c.video_url && (
                <a
                  href={c.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-20 flex items-center justify-center 
                             bg-gradient-to-b from-green-100 to-green-200 
                             group-hover:from-green-600 group-hover:to-green-700
                             text-green-700 group-hover:text-white 
                             transition-all duration-300 
                             rounded-r-xl relative"
                  title="Watch Video"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center 
                               rounded-full bg-white shadow-md group-hover:bg-green-500 
                               group-hover:shadow-lg transition-colors duration-300"
                  >
                    <FaPlay className="text-green-600 group-hover:text-white ml-[3px]" />
                  </div>
                </a>
              )}
            </div>
          );
        })}
      </div>

      {visibleCount < checkins.length && (
        <div className="mt-6 text-center">
          <button
            onClick={showMore}
            className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-gray-700 font-medium"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
