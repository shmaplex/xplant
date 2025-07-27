// /data/navigation.ts

export interface NavLink {
  href: string;
  label: string;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

export const guideLinks: NavLink[] = [
  { href: "/guide/worm-bin", label: "Worm Bin Guide" },
  { href: "/guide/worm-feeding", label: "Worm Feeding Guide" },
];

export const mainLinks: NavLink[] = [
  { href: "/farm", label: "Future Farm" },
  { href: "/schedule", label: "Schedule" },
  { href: "/shop", label: "Shop" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export const navGroups: NavGroup[] = [
  {
    label: "Guides",
    links: guideLinks,
  },
  // you can add more groups here if needed in the future
];
