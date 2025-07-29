type MediaComponent = {
  name: string;
  qty: string;
};

type Props = {
  components?: MediaComponent[]; // optional, just in case
};

export default function MediaComponentDisplay({ components = [] }: Props) {
  console.log("components passed:", components);

  if (components.length === 0) {
    return <p className="text-sm text-gray-500">No components listed.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {components.map((comp, idx) => (
        <span
          key={`${comp.name}-${idx}`}
          className="bg-psybeam-purple/10 text-psybeam-purple px-2 py-1 rounded-full text-xs font-medium"
          aria-label={`${comp.name} quantity ${comp.qty}`}
        >
          {comp.name} ({comp.qty})
        </span>
      ))}
    </div>
  );
}
