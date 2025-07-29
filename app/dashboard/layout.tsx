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
    <>
      <FloatingUserMenu />
      <main className="flex-1">{children}</main>
    </>
  );
}
