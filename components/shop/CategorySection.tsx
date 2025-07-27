"use client";

import { Product } from "@/data/products";
import ProductGrid from "./ProductGrid";

type CategorySectionProps = {
  category: string;
  products: Product[];
  onAddToCart: (
    variantId: string,
    quantity: number,
    title: string,
    price: string,
    variantTitle?: string
  ) => void;
};

export default function CategorySection({
  category,
  products,
  onAddToCart,
}: CategorySectionProps) {
  return (
    <section className="flex flex-col space-y-6 px-6 py-8 pt-4 bg-[#fefefe] rounded-2xl shadow-md w-full">
      <h2 className="text-sm font-medium uppercase tracking-wide text-black/30 pb-2">
        {category}
      </h2>
      <ProductGrid products={products} onAddToCart={onAddToCart} />
    </section>
  );
}
