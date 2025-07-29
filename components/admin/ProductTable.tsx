"use client";

import Link from "next/link";
import { Product } from "@/lib/types";

interface Props {
  products: Product[];
  onDelete: (id: string) => void;
}

export default function ProductTable({ products, onDelete }: Props) {
  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="rounded-xl overflow-hidden shadow">
        <table className="min-w-full border border-[var(--spore-grey)]">
          <thead className="bg-gradient-to-r from-[var(--psybeam-purple)] to-[var(--organic-amber)] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[var(--milk-bio)]">
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-t border-[var(--spore-grey)] hover:bg-[var(--organic-amber-light)] transition"
              >
                <td className="px-4 py-2">{p.title}</td>
                <td className="px-4 py-2">{p.category}</td>
                <td className="px-4 py-2 flex space-x-3">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="px-3 py-1 rounded-full bg-[var(--psybeam-purple)] text-white 
                               text-sm shadow hover:opacity-90 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm shadow 
                               hover:bg-red-200 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-6 text-center text-[var(--moss-shadow)]"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
