// app/dashboard/layout.tsx
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingUserMenu from "@/components/dashboard/FloatingUserMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans bg-milk-bio text-moss-shadow min-h-screen flex flex-col">
      <Header showUserQuicklinks />
      <FloatingUserMenu />
      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
