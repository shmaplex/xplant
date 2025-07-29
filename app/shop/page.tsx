"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import SearchInput from "@/components/shop/SearchInput";
import CategorySection from "@/components/shop/CategorySection";
import CartButton from "@/components/CartButton";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/contexts/CartContext";
import PreOrderCallout from "@/components/shop/PreOrderCallout";
import CategoryNav from "@/components/shop/CategoryNav";
import { Product, CategoryWithSub } from "@/lib/types";

export default function ShopPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const supabase = createClient();

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

  // --- Fetch products and variants from Supabase ---
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data: products, error } = await supabase
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
        .order("title", { ascending: true });

      if (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
        return;
      }

      // Normalize data
      const normalized = (products ?? []).map((p: any) => ({
        id: p.id,
        title: p.title,
        image: p.image,
        category: p.category,
        subcategory: p.subcategory,
        tag: p.tag,
        description: p.description,
        images: p.images || [],
        features: p.features || [],
        specs: p.specs || {},
        youtube_video_id: p.youtube_video_id,
        variants: p.product_variants || [],
      }));

      setAllProducts(normalized);
      setLoading(false);
    }

    fetchProducts();
  }, [supabase]);

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
  const grouped = filtered.reduce<Record<string, Record<string, Product[]>>>(
    (acc, product) => {
      const cat = product.category || "Uncategorized";
      const subcat = product.subcategory || "General";

      if (!acc[cat]) acc[cat] = {};
      if (!acc[cat][subcat]) acc[cat][subcat] = [];

      acc[cat][subcat].push(product);
      return acc;
    },
    {}
  );

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
    <>
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

          {loading ? (
            <div className="text-center mt-20">Loading products...</div>
          ) : (
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
          )}
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
