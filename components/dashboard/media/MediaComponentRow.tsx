"use client";

type MediaComponentRowProps = {
  id: string;
  name: string;
  qty: string;
  onChange: (id: string, field: "name" | "qty", value: string) => void;
  onRemove: (id: string) => void;
  disableRemove: boolean;
  suggestions: string[];
};

export default function MediaComponentRow({
  id,
  name,
  qty,
  onChange,
  onRemove,
  disableRemove,
  suggestions,
}: MediaComponentRowProps) {
  const listId = `component-suggestions-${id}`;

  return (
    <div className="flex items-center gap-3" aria-label="Recipe component row">
      <input
        type="text"
        placeholder="Component name (e.g. Sucrose)"
        value={name}
        onChange={(e) => onChange(id, "name", e.target.value)}
        className="flex-1 basis-2/3 rounded border border-spore-grey/50 p-2 focus:ring-2 focus:ring-psybeam-purple focus:outline-none"
        list={listId}
      />
      <datalist id={listId}>
        {suggestions.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>

      <input
        type="text"
        placeholder="Qty (e.g. 20g)"
        value={qty}
        onChange={(e) => onChange(id, "qty", e.target.value)}
        className="w-28 basis-1/3 rounded border border-spore-grey/50 p-2 focus:ring-2 focus:ring-psybeam-purple focus:outline-none"
      />

      <button
        type="button"
        onClick={() => onRemove(id)}
        className="text-sm text-red-600 hover:underline"
        disabled={disableRemove}
      >
        Remove
      </button>
    </div>
  );
}
