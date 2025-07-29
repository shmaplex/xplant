"use client";

import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex justify-center items-start py-12 px-6 bg-[var(--milk-bio)]">
      <aside
        className="
          max-h-[80vh] w-56 rounded-2xl
          bg-white/70 backdrop-blur-md
          shadow-lg
          p-6
          flex flex-col
          space-y-6
          overflow-auto
          border border-[var(--spore-grey)]
        "
      >
        <h2
          className="
            text-2xl font-semibold
            text-[var(--moss-shadow)]
            mb-4
            select-none
          "
        >
          Admin Panel
        </h2>
        <nav className="flex flex-col space-y-3 text-[var(--biochar-black)]">
          <Link
            href="/admin/products"
            className="block rounded-md px-3 py-2 hover:bg-[var(--psybeam-purple)] hover:text-white transition"
          >
            Products
          </Link>
          <Link
            href="/admin/products/new"
            className="block rounded-md px-3 py-2 hover:bg-[var(--psybeam-purple)] hover:text-white transition"
          >
            Add Product
          </Link>
          {/* Add more links here as needed */}
        </nav>
      </aside>

      <main
        className="
          flex-1
          max-w-6xl
          min-w-0
          bg-white
          rounded-2xl
          shadow-md
          p-8
          ml-8
          overflow-auto
          border border-[var(--spore-grey)]
        "
      >
        {children}
      </main>
    </div>
  );
}
