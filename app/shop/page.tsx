"use client";

import { useState, useRef } from "react";
import { products as allProducts } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchInput from "@/components/shop/SearchInput";
import CategorySection from "@/components/shop/CategorySection";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/contexts/CartContext";
import CartButton from "@/components/CartButton";
import PreOrderCallout from "@/components/shop/PreOrderCallout";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const {
    cartLines,
    addToCart,
    updateQuantity,
    removeLine,
    isOpen,
    openCart,
    closeCart,
  } = useCart();

  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  function handleAddToCart(
    variantId: string,
    quantity: number,
    title: string,
    price: string,
    variantTitle?: string
  ) {
    addToCart({ variantId, quantity, title, price, variantTitle });
    openCart();
  }

  const categories = [...new Set(allProducts.map((p) => p.category))];

  const filtered = allProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

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
      alert("Failed to create checkout. Please try again later.");
      console.error(data.error);
    }
  }

  function scrollToCategory(cat: string) {
    categoryRefs.current[cat]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="font-sans bg-[#F8F4EC] text-[#2F2F2F] min-h-screen flex flex-col">
      <Header />
      <CartButton />

      <main className="flex p-8 flex-1 w-full px-12 gap-6">
        {/* Left nav narrower and closer to left */}
        <nav className="hidden md:flex flex-col w-auto pr-4 sticky top-24 self-start space-y-4 pr-2 border-r border-black/10">
          <h2 className="text-sm uppercase font-semibold tracking-wide text-black/20">
            Categories
          </h2>
          {categories.map((cat) => {
            const catProducts = filtered.filter((p) => p.category === cat);
            if (!catProducts.length) return null;
            return (
              <button
                key={cat}
                onClick={() => scrollToCategory(cat)}
                className="
                  relative z-10
                  text-left text-sm font-medium text-[var(--color-moss-shadow)] hover:text-[var(--color-psybeam-purple)]
                  px-[2px] py-[2px] rounded-full
                  transition
                  bg-[var(--color-milk-bio)]
                  before:absolute before:inset-0 before:rounded-full before:z-[-1]
                  before:bg-gradient-to-r before:from-[var(--color-future-lime)] before:to-[var(--color-psybeam-purple)]
                  before:opacity-0 hover:before:opacity-100
                  before:p-[1px] before:transition-opacity
                  ease-in-out duration-300
                "
                type="button"
              >
                <span className="block bg-[var(--color-milk-bio)] hover:bg-white uppercase rounded-full px-4 py-0.5 transition ease-in-out duration-300">
                  {cat}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right content takes up remaining width */}
        <div className="flex-1 flex flex-col">
          <SearchInput value={search} onChange={setSearch} />
          <PreOrderCallout />

          {/* Stack categories vertically, full width */}
          <div className="flex flex-col gap-10">
            {categories.map((cat) => {
              const catProducts = filtered.filter((p) => p.category === cat);
              if (!catProducts.length) return null;
              return (
                <div
                  key={cat}
                  ref={(el) => {
                    categoryRefs.current[cat] = el;
                  }}
                  className="w-full"
                >
                  <CategorySection
                    category={cat}
                    products={catProducts}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />

      <CartDrawer
        isOpen={isOpen}
        onClose={closeCart}
        cartLines={cartLines}
        onCheckout={handleCheckout}
        onUpdateQuantity={updateQuantity}
        onRemoveLine={removeLine}
      />
    </div>
  );
}
