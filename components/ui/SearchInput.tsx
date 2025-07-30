"use client";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  title?: string;
  subtitle?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search for kits, plants, or products...",
  title = "Explore & Discover",
  subtitle = "Find kits, plants, tools, apparel, and more.",
}: SearchInputProps) {
  return (
    <div className="max-w-6xl w-full mx-auto mb-8 px-4">
      {(title || subtitle) && (
        <div className="text-center mb-4">
          {title && (
            <h2 className="text-xl font-semibold text-[#3F3829]">{title}</h2>
          )}
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      )}

      {/* Gradient border on focus using brand colors */}
      <div
        className={`
          transition-all duration-300 ease-in-out rounded-xl p-[2px]
          bg-spore-grey
          focus-within:bg-gradient-to-br
          focus-within:from-future-lime
          focus-within:via-organic-amber
          focus-within:to-psybeam-purple
        `}
      >
        <div className="bg-white rounded-xl overflow-hidden shadow-md focus-within:shadow-lg">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full px-5 py-3 text-sm sm:text-base outline-none"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
