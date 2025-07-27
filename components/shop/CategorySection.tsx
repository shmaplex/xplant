"use client";

import { Product } from "@/data/products";
import ProductGrid from "./ProductGrid";

type CategorySectionProps = {
  mainCategory: string;
  subCategory: string;
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
  mainCategory,
  subCategory,
  products,
  onAddToCart,
}: CategorySectionProps) {
  return (
    <section className="flex flex-col space-y-6 px-6 py-8 pt-4 bg-[#fefefe] rounded-2xl shadow-md w-full">
      <div className="flex flex-row items-center space-x-3">
        <h2 className="text-sm font-medium uppercase tracking-wide text-black/40">
          {mainCategory}
        </h2>

        {subCategory && (
          <>
            <span className="text-black/30">›</span>
            <h3 className="leading-none text-lg font-semibold text-black">
              {subCategory}
            </h3>
          </>
        )}
      </div>

      <ProductGrid products={products} onAddToCart={onAddToCart} />
    </section>
  );
}
