"use client";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="max-w-6xl w-full mx-auto mb-8 px-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-[#3F3829]">
          Find what you need
        </h2>
        <p className="text-sm text-gray-600">
          Search the shop for moss, seeds, castings, worms, and more.
        </p>
      </div>

      {/* Gradient border on focus */}
      <div className="transition-all duration-300 ease-in-out rounded-xl p-[2px] bg-gray-200 focus-within:bg-gradient-to-br focus-within:from-[#FF4E50] focus-within:via-[#F9D423] focus-within:to-[#FF6E7F]">
        <div className="bg-white rounded-xl overflow-hidden shadow-md focus-within:shadow-lg">
          <input
            type="text"
            placeholder="Type to search..."
            className="w-full px-5 py-3 text-sm sm:text-base outline-none"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
