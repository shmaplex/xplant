"use client";

type MediaComponent = {
  name: string;
  qty: string;
};

type Props = {
  components?: MediaComponent[];
};

export default function MediaComponentDisplay({ components = [] }: Props) {
  if (!components || components.length === 0) {
    return (
      <p className="text-sm text-gray-500 italic">
        No components listed for this recipe.
      </p>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow p-6">
      {/* Header labels */}
      <div className="flex items-center justify-between mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
        <span>Component</span>
        <span>Quantity</span>
      </div>

      <div className="space-y-3">
        {components.map((c, idx) => (
          <div
            key={`${c.name}-${idx}`}
            className="flex items-center justify-between border-b last:border-none border-gray-100 pb-2 last:pb-0"
          >
            <span className="text-gray-800 font-medium">{c.name}</span>
            <span className="text-psybeam-purple font-semibold bg-psybeam-purple/10 px-3 py-1 rounded-lg">
              {c.qty}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
