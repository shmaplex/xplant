"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ProductVideo from "@/components/shop/ProductVideo";
import RelatedProducts from "@/components/shop/RelatedProducts";
import ProductInfo from "@/components/shop/ProductInfo";
import ProductNotFound from "@/components/shop/ProductNotFound";
import ProductLoader from "@/components/shop/ProductLoader";
import { ShopCTA } from "@/components/ShopCTA";
import CommunityCallout from "@/components/CommunityCallout";
import { useProductCartActions } from "@/hooks/useProductCartActions";
import { useProduct } from "@/hooks/useProduct";
import { fetchRelatedProductsForProduct } from "@/lib/api/product";
import type { Product } from "@/lib/types";

export default function ProductPage() {
  const { id: rawId } = useParams();
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const { product, loading } = useProduct(id);
  const [related, setRelated] = useState<Product[]>([]);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null
  );

  const { addProductToCart, addRelatedProductToCart } = useProductCartActions();

  // Fetch related products when product changes
  useEffect(() => {
    if (!product) {
      setRelated([]);
      return;
    }

    fetchRelatedProductsForProduct(product.id)
      .then(setRelated)
      .catch(() => setRelated([]));
  }, [product]);

  // Set default variant when product changes
  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product]);

  function handleAddToCart(
    variantId: string,
    quantity: number,
    variantTitle: string
  ) {
    if (!product) return;
    addProductToCart(product, variantId, quantity, variantTitle);
  }

  function handleAddToCartRelated(
    relatedProduct: Product,
    variantId: string,
    quantity: number,
    variantTitle: string
  ) {
    addRelatedProductToCart(relatedProduct, variantId, quantity, variantTitle);
  }

  if (loading) return <ProductLoader />;
  if (!product) return <ProductNotFound />;

  return (
    <main className="flex-grow w-full">
      <div className="flex flex-col">
        <ProductInfo
          product={product}
          selectedVariantId={selectedVariantId}
          setSelectedVariantId={setSelectedVariantId}
          handleAddToCart={handleAddToCart}
        />

        <ProductVideo videoId={product.youtube_video_id} />

        <section className="w-full py-32 bg-milk-bio">
          <div className="mx-auto grid gap-16 xl:grid-cols-2 px-4 sm:px-8 lg:px-16">
            <ShopCTA />
            <CommunityCallout />
          </div>
        </section>

        <section className="pb-12 px-12">
          <RelatedProducts
            related={related}
            onAddToCart={handleAddToCartRelated}
          />
        </section>
      </div>
    </main>
  );
}
