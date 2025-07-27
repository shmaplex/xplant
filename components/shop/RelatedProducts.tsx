"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { Product } from "@/data/products";

type RelatedProductsProps = {
  related: Product[];
  onAddToCart: (
    product: Product,
    variantId: string,
    quantity: number,
    variantTitle: string
  ) => void;
};

export default function RelatedProducts({
  related,
  onAddToCart,
}: RelatedProductsProps) {
  if (!related?.length) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={(variantId, quantity, variantTitle) => {
              onAddToCart(product, variantId, quantity, variantTitle);
            }}
          />
        ))}
      </div>
    </section>
  );
}
