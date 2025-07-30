"use client";

import { useState, useRef } from "react";
import ShopLayout from "@/layouts/ShopLayout";
import SearchInput from "@/components/shop/SearchInput";
import CategorySection from "@/components/shop/CategorySection";
import PreOrderCallout from "@/components/shop/PreOrderCallout";
import CategoryNav from "@/components/shop/CategoryNav";
import { useProducts } from "@/hooks/useProducts";
import { useProductCartActions } from "@/hooks/useProductCartActions";
import type { CategoryWithSub, Product } from "@/lib/types";

export default function ShopPage() {
  const { products: allProducts, loading } = useProducts();
  const { addProductToCart } = useProductCartActions();

  const [search, setSearch] = useState("");
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  // Filter products by search
  const filtered = allProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.subcategory &&
        p.subcategory.toLowerCase().includes(search.toLowerCase()))
  );

  // Group by category and subcategory
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

  // Build categories array
  const categories: CategoryWithSub[] = Object.entries(grouped).map(
    ([cat, subcats]) => ({
      name: cat,
      subcategories: Object.keys(subcats),
    })
  );

  // Unique filtered categories for nav highlighting
  const filteredCategories: string[] = Array.from(
    new Set(
      filtered.flatMap((p) =>
        [p.category, p.subcategory].filter((v): v is string => !!v)
      )
    )
  );

  function scrollToCategory(cat: string) {
    categoryRefs.current[cat]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleAddToCart(
    product: Product,
    variantId: string,
    quantity: number,
    variantTitle: string
  ) {
    addProductToCart(product, variantId, quantity, variantTitle);
  }

  return (
    <ShopLayout>
      <main className="flex p-8 flex-1 w-full px-12 gap-6">
        <CategoryNav
          categories={categories}
          filteredCategories={filteredCategories}
          scrollToCategory={scrollToCategory}
        />

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
                          onAddToCart={(variantId, quantity, variantTitle) =>
                            handleAddToCart(
                              products.find((p) =>
                                p.variants.some((v) => v.id === variantId)
                              )!,
                              variantId,
                              quantity,
                              variantTitle
                            )
                          }
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
    </ShopLayout>
  );
}
