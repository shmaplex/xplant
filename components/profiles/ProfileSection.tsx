interface ProfileSectionProps {
  title: string;
  description: string;
  items: { key: string; label: string }[];
  emptyText: string;
}

export default function ProfileSection({
  title,
  description,
  items,
  emptyText,
}: ProfileSectionProps) {
  return (
    <section
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
      style={{ borderColor: "var(--color-spore-grey)" }}
    >
      <h2
        className="text-xl font-bold mb-2"
        style={{ color: "var(--color-biochar-black)" }}
      >
        {title}
      </h2>
      <p className="mb-4" style={{ color: "var(--color-moss-shadow)" }}>
        {description}
      </p>
      <div
        className="border rounded-lg p-4"
        style={{ borderColor: "var(--color-spore-grey)" }}
      >
        {items.length > 0 ? (
          <ul
            className="divide-y"
            style={{ borderColor: "var(--color-spore-grey)" }}
          >
            {items.map((item) => (
              <li
                key={item.key}
                className="py-2 transition-colors cursor-pointer hover:text-var(--color-future-lime)"
                style={{ color: "var(--color-moss-shadow)" }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        ) : (
          <p
            className="text-center"
            style={{ color: "var(--color-spore-grey)", fontStyle: "italic" }}
          >
            {emptyText}
          </p>
        )}
      </div>
    </section>
  );
}
