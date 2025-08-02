// lib/data/floatingUserMenuLinks.ts

export type FloatingUserMenuLink = {
  label: string;
  href?: string;
  action?: "logout";
};

export const floatingUserMenuLinks: FloatingUserMenuLink[] = [
  { label: "My Dashboard", href: "/dashboard" },
  { label: "Plant Logbook", href: "/dashboard/plants" },
  { label: "Tasks", href: "/dashboard/tasks" },
  { label: "Media Recipes", href: "/dashboard/media" },
  { label: "Your Profile", href: "/profile/me" },
  {
    label: "Profile Settings",
    href: "/profile",
  },
  { label: "User Guide", href: "/user-guide" },
  { label: "Log Out", action: "logout" },
];
