"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/lib/types";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductTable from "@/components/admin/ProductTable";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const supabase = createClient();

  async function fetchProducts() {
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.error(error);
    else setProducts(data || []);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-moss-shadow">Products</h2>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 rounded-full font-medium 
                     bg-gradient-to-r from-[var(--psybeam-purple)] to-[var(--organic-amber)]
                     text-white shadow hover:opacity-90 transition"
        >
          + Add Product
        </Link>
      </div>

      <ProductTable products={products} onDelete={handleDelete} />
    </AdminLayout>
  );
}
