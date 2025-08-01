// /hooks/useProduct.ts
"use client";

import { useState, useEffect } from "react";
import {
  fetchProductByIdOrSlug,
  fetchRelatedProducts,
} from "@/lib/api/product";
import type { Product } from "@/lib/types";

export function useProduct(idOrSlug: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idOrSlug) return;

    async function fetchData() {
      setLoading(true);

      const prod = await fetchProductByIdOrSlug(idOrSlug!);
      setProduct(prod);

      if (
        prod &&
        (prod as any).related_products &&
        Array.isArray((prod as any).related_products)
      ) {
        const relatedIds = (prod as any).related_products as string[];
        const relatedProds = await fetchRelatedProducts(relatedIds);
        setRelated(relatedProds);
      } else {
        setRelated([]);
      }

      setLoading(false);
    }

    fetchData();
  }, [idOrSlug]);

  return { product, related, loading };
}
