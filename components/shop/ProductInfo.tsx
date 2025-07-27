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
    <section className="w-full bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <Breadcrumbs
          items={[{ label: "Shop", href: "/shop" }, { label: product.title }]}
        />

        {/* Product Info Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="bg-white rounded-xl flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>

          {/* Info Section */}
          <div>
            {/* Tag - Left Aligned, Bordered */}
            {product.tag && (
              <div className="mb-3">
                <span className="inline-block rounded-full border-2 border-black bg-white px-2 py-[0.2rem] text-xs font-semibold uppercase tracking-wide text-black">
                  {product.tag}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

            {/* Price */}
            <p className="text-md text-gray-500 mb-6">
              {formatPrice(parsePrice(selectedVariant.price))}
            </p>

            {/* Description */}
            <p className="text-base text-gray-700 mb-8 leading-relaxed max-w-xl">
              {product.description}
            </p>

            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <div className="max-w-xs mb-6">
                <label className="block mb-2 text-xs font-semibold text-black/70 uppercase tracking-wide">
                  Select Option
                </label>
                <select
                  value={selectedVariantId ?? ""}
                  onChange={(e) => setSelectedVariantId(e.target.value)}
                  className="w-full bg-white border border-gray-300 py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4E50] transition"
                >
                  {product.variants.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="relative w-full max-w-xs group">
              {/* Gradient border */}
              <div
                className="absolute -inset-[2.5px] rounded-xl bg-gradient-to-r from-[#FF4E50] via-[#F9D423] to-[#FF6E7F] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                aria-hidden="true"
              />

              {/* Button on top */}
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
                      ? "bg-black text-white hover:text-[#FF4E50]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
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
