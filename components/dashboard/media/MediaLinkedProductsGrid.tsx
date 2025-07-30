"use client";

import React from "react";
import ProductCard from "@/components/shop/ProductCard";
import { Product } from "@/data/products";
import { useProductCartActions } from "@/hooks/useProductCartActions";

type Props = {
  products: Product[];
};

export default function LinkedProductsGrid({ products }: Props) {
  const { addProductToCart } = useProductCartActions();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={(variantId, quantity, variantTitle) =>
            addProductToCart(product, variantId, quantity, variantTitle)
          }
        />
      ))}
    </div>
  );
}
