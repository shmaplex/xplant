"use client";

import { useState } from "react";
import NewsletterForm from "./NewsletterForm";

export default function NewsletterSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 px-6 bg-moss-shadow text-milk-bio text-center">
        <h2 className="text-2xl font-bold mb-4">Grow With Us</h2>
        <p className="mb-6 max-w-xl mx-auto text-spore-grey">
          Subscribe to XPlant updates, guides, and new kit releases. Be part of
          a cleaner, greener growing future.
        </p>
        <button
          className="bg-future-lime text-moss-shadow cursor-pointer font-semibold px-6 py-3 rounded-full hover:brightness-110 transition"
          onClick={() => setModalOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={modalOpen}
        >
          Join the Newsletter
        </button>
      </section>

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
            {/* Close button */}
            <button
              className="absolute top-4 right-4 cursor-pointer flex justify-center items-center hover:bg-spore-grey/30 duration-300 ease-in-out px-2 py-0 rounded-md text-gray-600 text-3xl hover:text-gray-900 transition"
              aria-label="Close modal"
              onClick={() => setModalOpen(false)}
            >
              <span className="-mt-1">&times;</span>
            </button>

            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold mb-3">
                Join the XPlant Community
              </h2>
              <p className="mb-6 text-gray-700 text-base">
                Sign up to receive tips, plant culture experiments, and updates
                from our small husband‑and‑wife lab.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
