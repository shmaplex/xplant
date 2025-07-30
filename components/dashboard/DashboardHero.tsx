"use client";

type DashboardHeroProps = {
  title: string;
  highlight?: string;
  subtitle?: string;
  breadcrumb?: string;
  variant?: "light" | "colored";
};

export default function DashboardHero({
  title,
  highlight,
  subtitle,
  breadcrumb,
  variant = "light",
}: DashboardHeroProps) {
  const isLight = variant === "light";

  return (
    <div
      className={`sticky top-0 z-10 border-b shadow-sm ${
        isLight
          ? "bg-white border-spore-grey/20"
          : "bg-white border-b-4 border-transparent border-image-border-gradient text-moss-shadow"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-moss-shadow">
            {title}{" "}
            {highlight && <span className="text-future-lime">{highlight}</span>}
          </h1>
          {breadcrumb && (
            <nav
              aria-label="breadcrumb"
              className="text-xs text-gray-400 mt-0.5"
            >
              {breadcrumb}
            </nav>
          )}
          {subtitle && <p className="mt-1 text-sm text-gray-700">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
