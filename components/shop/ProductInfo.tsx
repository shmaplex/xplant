"use client";

import { Product } from "@/data/products";
import { parsePrice, formatPrice } from "@/lib/price";
import Breadcrumbs from "./Breadcrumbs";

interface ProductInfoProps {
  product: Product;
  selectedVariantId: string | null;
  setSelectedVariantId: (id: string) => void;
  handleAddToCart: (
    variantId: string,
    quantity: number,
    variantTitle: string
  ) => void;
}

export default function ProductInfo({
  product,
  selectedVariantId,
  setSelectedVariantId,
  handleAddToCart,
}: ProductInfoProps) {
  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ??
    product.variants[0];

  return (
    <section className="w-full bg-milk-bio py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <Breadcrumbs
          items={[{ label: "Shop", href: "/shop" }, { label: product.title }]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="bg-milk-bio rounded-xl flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>

          {/* Info Section */}
          <div>
            {product.tag && (
              <div className="mb-3">
                <span className="inline-block rounded-full border-2 border-moss-shadow bg-milk-bio px-2 py-[0.2rem] text-xs font-semibold uppercase tracking-wide text-moss-shadow">
                  {product.tag}
                </span>
              </div>
            )}

            <h1 className="text-4xl font-bold mb-4 text-biochar-black">
              {product.title}
            </h1>

            <p className="text-md text-moss-shadow mb-6">
              {formatPrice(parsePrice(selectedVariant.price))}
            </p>

            <p className="text-base text-biochar-black mb-8 leading-relaxed max-w-xl">
              {product.description}
            </p>

            {product.variants.length > 1 && (
              <div className="max-w-xs mb-6">
                <label className="block mb-2 text-xs font-semibold text-moss-shadow uppercase tracking-wide">
                  Select Option
                </label>
                <select
                  value={selectedVariantId ?? ""}
                  onChange={(e) => setSelectedVariantId(e.target.value)}
                  className="w-full bg-white border border-spore-grey py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-future-lime transition"
                >
                  {product.variants.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="relative w-full max-w-xs group">
              {/* Lime border glow on hover */}
              <div
                className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-future-lime to-moss-shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                aria-hidden="true"
              />

              <button
                onClick={() =>
                  selectedVariantId &&
                  handleAddToCart(
                    selectedVariantId,
                    1,
                    product.variants.find((v) => v.id === selectedVariantId)
                      ?.title ?? ""
                  )
                }
                disabled={!selectedVariantId}
                className={`
                  relative z-10 w-full py-3 px-6 font-bold uppercase tracking-wide rounded-lg transition-all duration-300
                  ${
                    selectedVariantId
                      ? "bg-moss-shadow text-milk-bio hover:bg-biochar-black"
                      : "bg-spore-grey text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                {selectedVariantId ? "Add to Cart" : "Unavailable"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
