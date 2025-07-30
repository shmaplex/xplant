"use client";

import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  onAddToCart: (
    variantId: string,
    quantity: number,
    title: string,
    price: string,
    variantTitle: string
  ) => void;
};

export default function ProductGrid({
  products,
  onAddToCart,
}: ProductGridProps) {
  return (
    <div
      className="
        flex flex-wrap space-x-4 space-y-4 items-start justify-center sm:justify-start
        w-auto
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={(
            variantId: string,
            quantity: number,
            variantTitle: string
          ) => {
            const variant = product.variants.find((v) => v.id === variantId);
            onAddToCart(
              variantId,
              quantity,
              product.title,
              variant?.price ?? "",
              variantTitle
            );
          }}
        />
      ))}
    </div>
  );
}
