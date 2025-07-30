"use client";

import Header from "@/components/Header";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header showUserQuicklinks showAdminQuicklinks />
      {children}
    </>
  );
}
