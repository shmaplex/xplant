"use client";

import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/lib/types";

/**
 * Provides reusable cart actions for product and related product cards.
 */
export function useProductCartActions() {
  const { addToCart, openCart } = useCart();

  function addProductToCart(
    product: Product,
    variantId: string,
    quantity: number,
    variantTitle: string
  ) {
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
  }

  // alias or explicit for related products (same implementation)
  function addRelatedProductToCart(
    relatedProduct: Product,
    variantId: string,
    quantity: number,
    variantTitle: string
  ) {
    // you can call addProductToCart internally or duplicate logic if you want:
    addProductToCart(relatedProduct, variantId, quantity, variantTitle);
  }

  return { addProductToCart, addRelatedProductToCart };
}
