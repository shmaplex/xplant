"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products, Product } from "@/data/products";
import FeedingGuideCTA from "@/components/FeedingGuideCTA";
import BinSetupCTA from "@/components/BinSetupCTA";
import ProductVideo from "@/components/shop/ProductVideo";
import RelatedProducts from "@/components/shop/RelatedProducts";
import CartDrawer from "@/components/CartDrawer";
import CartButton from "@/components/CartButton";
import ProductInfo from "@/components/shop/ProductInfo";

export default function ProductPage() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product]);

  const {
    cartLines,
    addToCart,
    updateQuantity,
    removeLine,
    isOpen,
    openCart,
    closeCart,
  } = useCart();

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

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8F4EC] text-[#2F2F2F]">
        <Header />
        <CartButton />
        <main className="flex-grow w-full px-6 flex items-center justify-center text-xl">
          Product not found.
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F4EC] text-[#2F2F2F]">
      <Header />
      <CartButton />
      <main className="flex-grow w-full">
        <div className="flex flex-col">
          <ProductInfo
            product={product}
            selectedVariantId={selectedVariantId}
            setSelectedVariantId={setSelectedVariantId}
            handleAddToCart={handleAddToCart}
          />

          {/* Video Section */}
          <ProductVideo videoId={product.youtubeVideoId} />

          {/* CTA Section */}
          <section className="w-full py-32 bg-[#fdfcf9]">
            <div className="mx-auto grid gap-16 sm:grid-cols-2 px-4 sm:px-8 lg:px-16">
              <FeedingGuideCTA />
              <BinSetupCTA />
            </div>
          </section>

          {/* Related Products */}
          <section className="px-4 sm:px-8 lg:px-16 pb-12">
            <RelatedProducts
              related={
                product.relatedProducts
                  ?.map((id) => products.find((p) => p.id === id))
                  .filter((p): p is Product => !!p) ?? []
              }
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
      <Footer />
    </div>
  );
}
