// /data/navigation.ts

export interface NavLink {
  href: string;
  label: string;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

// Guides (these could be expanded to plant tissue culture guides later)
// /data/navigation.ts

export const guideLinks: NavLink[] = [
  { href: "/guide/intro-to-tissue-culture", label: "Intro to Tissue Culture" },
  { href: "/guide/tissue-culture-basics", label: "Tissue Culture Basics" },
  { href: "/guide/organic-alternatives", label: "Organic Alternatives" },
  { href: "/guide/organic-mediums", label: "Organic Mediums" },
  { href: "/guide/best-fit-box", label: "Best Fit Box" },
  { href: "/guide/propagation-kits", label: "Propagation Kits" },
];

// Main navigation links
export const mainLinks: NavLink[] = [
  { href: "/lab", label: "Future Lab" },
  { href: "/products", label: "Our Products" },
  { href: "/services", label: "Lab Services" },
  { href: "/shop", label: "Shop" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export const navGroups: NavGroup[] = [
  {
    label: "Guides",
    links: guideLinks,
  },
];
