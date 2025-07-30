"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
  onAddToCart: (
    variantId: string,
    quantity: number,
    variantTitle: string
  ) => void;
  placeholderImage?: string;
};

export default function ProductCard({
  product,
  onAddToCart,
  placeholderImage = "/png/placeholder-product.png",
}: ProductCardProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    product.variants?.[0]?.id || null
  );

  const selectedVariant = product.variants.find(
    (v) => v.id === selectedVariantId
  );

  return (
    <div
      className="group relative w-full max-w-xs transition-transform duration-300 ease-in-out hover:-translate-y-1"
      style={{ transformOrigin: "center" }}
    >
      <div
        className="rounded-xl p-[2px]
          bg-gray-200
          group-hover:bg-gradient-to-r
          group-hover:from-[var(--future-lime)]
          group-hover:via-[var(--psybeam-purple)]
          group-hover:to-[var(--future-lime)]
          transition-all duration-300 ease-in-out"
      >
        <div className="relative flex flex-col justify-between h-full bg-white rounded-xl overflow-hidden">
          <Link key={product.id} href={`/shop/${product.id}`}>
            {product.tag && (
              <div className="absolute top-3 left-3 z-20 group">
                <div
                  className="rounded-full p-[2px] transition-all duration-300 ease-in-out
                    bg-[var(--biochar-black)]
                    group-hover:bg-gradient-to-bl
                    group-hover:from-[var(--future-lime)]
                    group-hover:via-[var(--psybeam-purple)]
                    group-hover:to-[var(--future-lime)]"
                >
                  <div
                    className="uppercase rounded-full bg-white text-[var(--biochar-black)]
                      group-hover:text-[var(--future-lime)]
                      text-[11px] font-bold px-2 py-[0.2rem]"
                  >
                    {product.tag}
                  </div>
                </div>
              </div>
            )}

            {/* Image */}
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                src={product.image ?? placeholderImage}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-300 scale-95 group-hover:scale-100"
              />
            </div>

            {/* Title and price */}
            <div className="relative p-4 text-center">
              <div className="transition-all duration-500 ease-in-out group-hover:space-y-1 space-y-0">
                <h3 className="text-base font-semibold text-[var(--biochar-black)] mb-0 transition-all duration-500 ease-in-out group-hover:-translate-y-1">
                  {product.title}
                </h3>
                <p className="text-sm text-[var(--moss-shadow)] font-medium opacity-0 translate-y-2 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
                  {selectedVariant?.price ?? product.variants[0]?.price}
                </p>
              </div>
            </div>
          </Link>

          {/* Variant Selector */}
          {product.variants && product.variants.length > 1 && (
            <div className="w-full px-1 pb-1 overflow-hidden group transition-all duration-500 ease-in-out">
              <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500 ease-in-out">
                <div
                  className="bg-[var(--biochar-black)]/5
                    group-hover:bg-[var(--biochar-black)]/10
                    transition-colors ease-in-out duration-300 rounded-md px-2 pb-2 space-y-1"
                >
                  <label
                    className="text-[10px] text-[var(--biochar-black)]/30
                      group-hover:text-[var(--biochar-black)]/60 uppercase font-medium"
                  >
                    Select Option
                  </label>
                  <select
                    value={selectedVariantId ?? ""}
                    onChange={(e) => setSelectedVariantId(e.target.value)}
                    className="w-full bg-white text-sm py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[var(--biochar-black)]/10 transition-all"
                  >
                    {product.variants.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Add to cart */}
          <div className="relative w-full group">
            <div
              className="absolute -inset-[2.5px] rounded-b-xl
                bg-gradient-to-r
                from-[var(--future-lime)]
                via-[var(--psybeam-purple)]
                to-[var(--future-lime)]
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
              aria-hidden="true"
            />
            <button
              onClick={() =>
                selectedVariantId &&
                onAddToCart(selectedVariantId, 1, selectedVariant?.title ?? "")
              }
              disabled={!selectedVariantId}
              className={`
                relative z-10 w-full py-3 text-sm font-semibold uppercase tracking-wide rounded-b-xl transition-all duration-300
                ${
                  selectedVariantId
                    ? "bg-[var(--biochar-black)] text-white group-hover:text-[var(--future-lime)]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              {selectedVariantId ? "Add to Cart" : "Unavailable"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
