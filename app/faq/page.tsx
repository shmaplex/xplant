"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import faqs from "@/data/faqs";

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (i: number) => {
    setOpenItems((prev) =>
      prev.includes(i) ? prev.filter((id) => id !== i) : [...prev, i]
    );
  };

  return (
    <div className="font-sans bg-[#F8F4EC] text-[#2F2F2F] min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-[#F8F4EC] text-[#2F2F2F] font-sans py-16 px-6 sm:px-10">
        <h1 className="text-4xl font-extrabold text-center mb-12 max-w-6xl mx-auto">
          FAQ
        </h1>

        <div
          style={{ columnCount: 2, columnGap: "1.5rem" }}
          className="max-w-6xl mx-auto faq-columns"
        >
          {faqs.map((faq, i) => {
            const isOpen = openItems.includes(i);
            return (
              <div
                key={i}
                style={{ breakInside: "avoid" }}
                className="mb-6 bg-white rounded-xl shadow-sm border border-[#ddd] hover:shadow-md transition-shadow overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(i)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-[#ECE7DB] rounded-t-xl text-left text-lg font-semibold"
                >
                  <span>{faq.q}</span>
                  <FaChevronDown
                    className={`ml-3 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`px-5 text-[#444] transition-all duration-300 ${
                    isOpen ? "py-4 max-h-screen" : "max-h-0 py-0"
                  }`}
                  style={{ overflow: "hidden" }}
                >
                  <p className="text-base leading-relaxed">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
