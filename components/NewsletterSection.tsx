"use client";

import { useState } from "react";
import NewsletterForm from "./NewsletterForm";

export default function NewsletterSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 px-6 bg-[#2F2F2F] text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Stay dirty with me.</h2>
        <p className="mb-6">
          Subscribe to updates, experiments, and stories from the worm world.
        </p>
        <button
          className="bg-[#F8F4EC] text-[#2F2F2F] cursor-pointer font-semibold px-6 py-3 rounded-full hover:bg-white transition"
          onClick={() => setModalOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={modalOpen}
        >
          Join the Newsletter
        </button>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={() => setModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white text-gray-900 p-8 sm:p-10 rounded-2xl w-full max-w-md shadow-xl overflow-hidden"
          >
            {/* Background worm illustration */}
            <img
              src="/png/news.png"
              alt="Happy worm"
              className="absolute bottom-20 right-0 opacity-80 w-40 pointer-events-none select-none"
              style={{ userSelect: "none" }}
            />

            {/* Close button */}
            <button
              className="absolute top-4 right-4 cursor-pointer flex justify-center items-center hover:bg-[#E2D9C4]/50 duration-300 ease-in-out px-2 py-0 rounded-md text-gray-600 text-3xl hover:text-gray-900 transition"
              aria-label="Close modal"
              onClick={() => setModalOpen(false)}
            >
              <span className="-mt-1">&times;</span>
            </button>

            {/* Newsletter Form */}
            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold mb-3">
                Stay Dirty with Me
              </h2>
              <p className="mb-6 text-gray-700 text-base w-[70%]">
                Subscribe for updates, worm wisdom, and all things composted.
              </p>
              {/* Sample input wrapper styling, replace NewsletterForm's input with something like this or let me know if you want me to style it */}
              <NewsletterForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
