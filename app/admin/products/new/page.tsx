"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  const supabase = createClient();
  const router = useRouter();

  async function handleSubmit(data: any) {
    const { error } = await supabase.from("products").insert(data);
    if (error) {
      console.error(error);
      alert("Failed to create product");
    } else {
      router.push("/admin/products");
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-moss-shadow mb-8">
        Add New Product
      </h1>
      <ProductForm onSubmit={handleSubmit} />
    </AdminLayout>
  );
}
