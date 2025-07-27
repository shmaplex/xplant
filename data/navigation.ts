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
export const guideLinks: NavLink[] = [
  { href: "/guide/intro-to-tissue-culture", label: "Intro to Tissue Culture" },
  { href: "/guide/tissue-culture-basics", label: "Tissue Culture Basics" },
  { href: "/guide/organic-mediums", label: "Organic Mediums" },
  { href: "/guide/propagation-kits", label: "Propagation Kits" },
];

// Main navigation links
export const mainLinks: NavLink[] = [
  { href: "/farm", label: "Future Farm" },
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
