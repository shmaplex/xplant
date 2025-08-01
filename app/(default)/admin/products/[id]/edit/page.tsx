"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/lib/types";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = createClient();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (!error && data) setProduct(data);
    }
    fetchProduct();
  }, [id]);

  async function handleSubmit(data: any) {
    const { error } = await supabase.from("products").update(data).eq("id", id);
    if (error) {
      alert("Failed to update");
      console.error(error);
    } else {
      router.push("/admin/products");
    }
  }

  if (!product) return <AdminLayout>Loading...</AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm initial={product} onSubmit={handleSubmit} />
    </AdminLayout>
  );
}
