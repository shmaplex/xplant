// layouts/LegalPage.tsx
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans min-h-screen bg-[#ECE7DB] text-[#3B3B3B] flex flex-col">
      <Header />
      <div className="px-6 py-16 sm:px-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            {title}
          </h1>
          <div className="prose prose-neutral prose-lg max-w-none">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
