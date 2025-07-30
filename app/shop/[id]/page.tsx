"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/contexts/CartContext";
import CartButton from "@/components/CartButton";
import CartDrawer from "@/components/CartDrawer";
import ProductVideo from "@/components/shop/ProductVideo";
import RelatedProducts from "@/components/shop/RelatedProducts";
import ProductInfo from "@/components/shop/ProductInfo";
import ProductNotFound from "@/components/shop/ProductNotFound";
import { ShopCTA } from "@/components/ShopCTA";
import CommunityCallout from "@/components/CommunityCallout";
import type { Product } from "@/lib/types";
import ProductLoader from "@/components/shop/ProductLoader";

export default function ProductPage() {
  const { id } = useParams();
  const supabase = createClient();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    cartLines,
    addToCart,
    updateQuantity,
    removeLine,
    isOpen,
    openCart,
    closeCart,
  } = useCart();

  // Fetch product
  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);

      // Try to fetch by UUID or slug
      const { data, error } = await supabase
        .from("products")
        .select(
          `
          *,
          product_variants (
            id,
            title,
            price
          )
        `
        )
        .or(`id.eq.${id},slug.eq.${id}`) // Match UUID or slug
        .single();

      if (error || !data) {
        console.error("Failed to fetch product", error);
        setProduct(null);
        setLoading(false);
        return;
      }

      const normalized: Product = {
        id: data.id,
        title: data.title,
        image: data.image,
        category: data.category,
        subcategory: data.subcategory,
        tag: data.tag,
        description: data.description,
        images: data.images || [],
        features: data.features || [],
        specs: data.specs || {},
        youtube_video_id: data.youtube_video_id,
        variants: data.product_variants || [],
      };

      setProduct(normalized);
      setLoading(false);

      // Fetch related products if a related_products column exists
      if (data.related_products && Array.isArray(data.related_products)) {
        const { data: relatedProducts } = await supabase
          .from("products")
          .select(
            `
            *,
            product_variants (
              id,
              title,
              price
            )
          `
          )
          .in("id", data.related_products);

        if (relatedProducts) {
          setRelated(
            relatedProducts.map((rp: any) => ({
              id: rp.id,
              title: rp.title,
              image: rp.image,
              category: rp.category,
              subcategory: rp.subcategory,
              tag: rp.tag,
              description: rp.description,
              images: rp.images || [],
              features: rp.features || [],
              specs: rp.specs || {},
              youtube_video_id: rp.youtube_video_id,
              variants: rp.product_variants || [],
            }))
          );
        }
      }
    }

    if (id) fetchProduct();
  }, [id, supabase]);

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product]);

  async function handleCheckout() {
    const res = await fetch("/api/cart/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lines: cartLines.map((line) => ({
          merchandiseId: line.variantId,
          quantity: line.quantity,
        })),
      }),
    });

    const data = await res.json();

    if (res.ok && data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      alert("Checkout failed. Please try again later.");
      console.error(data.error);
    }
  }

  function handleAddToCart(
    variantId: string,
    quantity: number,
    variantTitle: string
  ) {
    if (!product) return;
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

  function handleAddToCartRelated(
    relatedProduct: Product,
    variantId: string,
    quantity: number,
    variantTitle: string
  ) {
    const variant = relatedProduct.variants.find((v) => v.id === variantId);
    if (!variant) return;

    addToCart({
      variantId,
      quantity,
      title: relatedProduct.title,
      price: variant.price,
      variantTitle,
    });
    openCart();
  }

  if (loading) {
    return <ProductLoader />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <>
      <CartButton />
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
      <CartDrawer
        isOpen={isOpen}
        onClose={closeCart}
        cartLines={cartLines}
        onCheckout={handleCheckout}
        onUpdateQuantity={updateQuantity}
        onRemoveLine={removeLine}
      />
    </>
  );
}
