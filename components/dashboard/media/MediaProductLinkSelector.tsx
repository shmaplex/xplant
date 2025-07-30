"use client";

import React from "react";

type Product = {
  id: string;
  title: string;
};

type MediaProductLinkSelector = {
  products: Product[];
  linkedProductIds: string[];
  toggleLinkedProduct: (id: string) => void;
};

export default function MediaProductLinkSelector({
  products,
  linkedProductIds,
  toggleLinkedProduct,
}: MediaProductLinkSelector) {
  // Sort products alphabetically by title (case-insensitive)
  const sortedProducts = [...products].sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
  );

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-moss-shadow mb-2">
        Link to Products
      </legend>
      <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
        {sortedProducts.map((p) => {
          const selected = linkedProductIds.includes(p.id);
          return (
            <label
              key={p.id}
              className={`
                cursor-pointer select-none rounded-lg px-3 py-2 text-xs font-medium flex items-center gap-2
                transition
                ${
                  selected
                    ? "border-2 border-psybeam-purple bg-psybeam-purple/20 shadow-sm text-psybeam-purple"
                    : "border border-transparent bg-spore-grey/30 hover:border-psybeam-purple hover:bg-gray-50 text-moss-shadow"
                }
                whitespace-nowrap
                min-w-[100px]
              `}
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() => toggleLinkedProduct(p.id)}
                className="accent-psybeam-purple cursor-pointer"
                onClick={(e) => e.stopPropagation()} // prevent outer label toggle
              />
              <span>{p.title}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
