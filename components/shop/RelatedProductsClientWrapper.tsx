"use client";

import RelatedProducts from "@/components/shop/RelatedProducts";
import { useCart } from "@/contexts/CartContext";
import { useCallback } from "react";
import type { Product } from "@/data/products";

interface RelatedProductsClientWrapperProps {
  related: Product[];
}

export default function RelatedProductsClientWrapper({
  related,
}: RelatedProductsClientWrapperProps) {
  const { addToCart, openCart } = useCart();

  const handleAddToCartRelated = useCallback(
    (
      product: Product,
      variantId: string,
      quantity: number,
      variantTitle: string
    ) => {
      const variant = product.variants.find((v) => v.id === variantId);
      if (!variant) return;

      addToCart({
        variantId,
        quantity,
        title: product.title,
        price: variant.price,
        variantTitle,
      });
      openCart();
    },
    [addToCart, openCart]
  );

  return (
    <section className="pb-12 px-12">
      <RelatedProducts related={related} onAddToCart={handleAddToCartRelated} />
    </section>
  );
}
