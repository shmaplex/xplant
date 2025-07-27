"use client";

import { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProductCard from "./ProductCard";
import { Product } from "@/data/products";

type RelatedProductsProps = {
  related: Product[];
  onAddToCart: (
    product: Product,
    variantId: string,
    quantity: number,
    variantTitle: string
  ) => void;
};

export default function RelatedProducts({
  related,
  onAddToCart,
}: RelatedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hoverZone, setHoverZone] = useState<"left" | "right" | null>(null);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [related]);

  const scrollByAmount = (amount: number) => {
    scrollContainerRef.current?.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  if (related.length <= 4) {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {related.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(variantId, quantity, variantTitle) => {
                onAddToCart(product, variantId, quantity, variantTitle);
              }}
            />
          ))}
        </div>
      </section>
    );
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const zoneWidth = bounds.width * 0.15; // 15% zone

    if (x < zoneWidth) {
      setHoverZone("left");
    } else if (x > bounds.width - zoneWidth) {
      setHoverZone("right");
    } else {
      setHoverZone(null);
    }
  };

  const handleMouseLeave = () => {
    setHoverZone(null);
  };

  return (
    <section
      className="mt-10 relative w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="text-2xl font-bold mb-4 px-4 sm:px-8 lg:px-16">
        Related Products
      </h2>

      {/* Left gradient */}
      <div
        className={`pointer-events-none absolute top-0 left-0 h-full w-20
          bg-gradient-to-r from-[var(--milk-bio)] to-transparent z-20
          transition-opacity duration-500 ease-in-out
          ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
      />

      {/* Right gradient */}
      <div
        className={`pointer-events-none absolute top-0 right-0 h-full w-20
          bg-gradient-to-l from-[var(--milk-bio)] to-transparent z-20
          transition-opacity duration-500 ease-in-out
          ${canScrollRight ? "opacity-100" : "opacity-0"}`}
      />

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 relative z-10 px-4 sm:px-8 lg:px-16"
      >
        {related.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-60">
            <ProductCard
              product={product}
              onAddToCart={(variantId, quantity, variantTitle) => {
                onAddToCart(product, variantId, quantity, variantTitle);
              }}
            />
          </div>
        ))}
        <div className="flex-shrink-0 w-16" />
      </div>

      {/* Left Arrow */}
      {canScrollLeft && (
        <div
          className={`
      absolute top-0 left-0 h-full w-20 flex items-center justify-center
      
      transition-opacity duration-500 ease-in-out
      ${hoverZone === "left" ? "opacity-100" : "opacity-0"}
      z-30
    `}
          style={{ pointerEvents: "none" }}
        >
          <button
            onClick={() => scrollByAmount(-240)}
            aria-label="Scroll left"
            style={{ pointerEvents: "auto" }}
            className="text-[var(--moss-shadow)] hover:bg-[var(--future-lime)] hover:text-white p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--future-lime)] transition duration-500 ease-in-out"
          >
            <FiChevronLeft size={28} />
          </button>
        </div>
      )}

      {/* Right Arrow */}
      {canScrollRight && (
        <div
          className={`
      absolute top-0 right-0 h-full w-20 flex items-center justify-center
      
      transition-opacity duration-500 ease-in-out
      ${hoverZone === "right" ? "opacity-100" : "opacity-0"}
      z-30
    `}
          style={{ pointerEvents: "none" }}
        >
          <button
            onClick={() => scrollByAmount(240)}
            aria-label="Scroll right"
            style={{ pointerEvents: "auto" }}
            className="text-[var(--moss-shadow)] hover:bg-[var(--future-lime)] hover:text-white p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--future-lime)] transition duration-500 ease-in-out"
          >
            <FiChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  );
}
