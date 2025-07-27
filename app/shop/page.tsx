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
import CategoryNav from "@/components/shop/CategoryNav";

interface CategoryWithSub {
  name: string;
  subcategories?: string[];
}

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

  const filtered = allProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.subcategory &&
        p.subcategory.toLowerCase().includes(search.toLowerCase()))
  );

  // Group filtered products by category and subcategory
  const grouped = filtered.reduce<
    Record<string, Record<string, (typeof allProducts)[0][]>>
  >((acc, product) => {
    const cat = product.category || "Uncategorized";
    const subcat = product.subcategory || "";

    if (!acc[cat]) acc[cat] = {};
    if (!acc[cat][subcat]) acc[cat][subcat] = [];

    acc[cat][subcat].push(product);
    return acc;
  }, {});

  const categories: CategoryWithSub[] = Object.entries(grouped).map(
    ([cat, subcats]) => ({
      name: cat,
      subcategories: Object.keys(subcats),
    })
  );

  const filteredCategories: string[] = Array.from(
    new Set(
      filtered.flatMap((p) =>
        [p.category, p.subcategory].filter((v): v is string => !!v)
      )
    )
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
        {/* Left nav */}
        <CategoryNav
          categories={categories}
          filteredCategories={filteredCategories}
          scrollToCategory={scrollToCategory}
        />

        {/* Right content */}
        <div className="flex-1 flex flex-col">
          <SearchInput value={search} onChange={setSearch} />
          <PreOrderCallout />

          {/* Categories with subcategories */}
          <div className="flex flex-col gap-10">
            {categories.map(({ name: cat }) => {
              const catSubcats = grouped[cat];
              if (!catSubcats) return null;

              return (
                <div
                  key={cat}
                  ref={(el) => {
                    categoryRefs.current[cat] = el;
                  }}
                  className="w-full"
                >
                  {Object.entries(catSubcats).map(([subcat, products]) => (
                    <section
                      key={subcat}
                      ref={(el) => {
                        categoryRefs.current[subcat] = el;
                      }}
                      className="mb-8"
                    >
                      <CategorySection
                        mainCategory={cat}
                        subCategory={subcat}
                        products={products}
                        onAddToCart={handleAddToCart}
                      />
                    </section>
                  ))}
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
