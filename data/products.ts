export type ProductVariant = {
  id: string; // Shopify GID
  title: string; // e.g. "500g", "S", "M", etc
  price: string;
};

export type Product = {
  id: string;
  title: string;
  image: string;
  category: string;
  tag?: string;
  description?: string;
  images?: string[];
  features?: string[];
  specs?: Record<string, string>;
  variants: ProductVariant[];
  youtubeVideoId?: string; // YouTube video ID for embedded videos
  relatedProducts?: string[]; // Product IDs for related items
};

export const products: Product[] = [
  // Propagation Kits
  {
    id: "propagation-kit",
    title: "Propagation Kit",
    image: "/shop/png/propagation-kit.png",
    images: [
      "/shop/png/propagation-kit.png",
      "/shop/png/propagation-kit-2.png",
    ],
    category: "Propagation Kits",
    tag: "best-seller",
    description:
      "A beginner-friendly kit with everything you need to start plant tissue culture at home — no lab required.",
    features: [
      "Pre-mixed PhytoBase™ organic culture medium (sealed jars)",
      "Sterile scalpel, forceps, and vented jars",
      "Clear step-by-step instructions",
      "Access to our beginner's online workshop",
    ],
    specs: {
      Shipping: "Ships in 3–5 days",
      SkillLevel: "Beginner",
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/60001",
        title: "Complete Kit",
        price: "₩95,000",
      },
    ],
    relatedProducts: [
      "phytobase-medium",
      "xboost",
      "biotone",
      "mycolift",
      "culture-jars",
    ],
  },

  // Organic Media
  {
    id: "phytobase-medium",
    title: "PhytoBase™ Organic Culture Medium",
    image: "/shop/png/phytobase-medium.png",
    images: ["/shop/png/phytobase-medium.png"],
    category: "Organic Media",
    description:
      "An organic alternative to MS medium, PhytoBase™ is pre-sterilized and ready to use.",
    features: [
      "Plant-derived ingredients",
      "Supports slower, stronger growth",
      "Pre-sterilized for ease of use",
    ],
    specs: {
      Volume: "250ml or 500ml",
      ShelfLife: "6 months unopened",
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/60002",
        title: "250ml",
        price: "₩20,000",
      },
      {
        id: "gid://shopify/ProductVariant/60003",
        title: "500ml",
        price: "₩35,000",
      },
    ],
  },

  // Additives
  {
    id: "xboost",
    title: "XBoost™",
    image: "/shop/png/xboost.png",
    images: ["/shop/png/xboost.png"],
    category: "Additives",
    description:
      "Accelerates rooting and shoot multiplication. Use sparingly for faster results.",
    specs: {
      Volume: "20ml",
      Use: "Rooting and multiplication booster",
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/60004",
        title: "20ml",
        price: "₩15,000",
      },
    ],
  },
  {
    id: "biotone",
    title: "BioTone™",
    image: "/shop/png/biotone.png",
    images: ["/shop/png/biotone.png"],
    category: "Additives",
    description:
      "Balances pH and adds organic micronutrients to support healthy plant growth.",
    specs: {
      Volume: "20ml",
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/60005",
        title: "20ml",
        price: "₩12,000",
      },
    ],
  },
  {
    id: "mycolift",
    title: "MycoLift™",
    image: "/shop/png/mycolift.png",
    images: ["/shop/png/mycolift.png"],
    category: "Additives",
    description:
      "Mycorrhizal booster for advanced hobbyists. Use cautiously for improved resilience.",
    specs: {
      Volume: "20ml",
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/60006",
        title: "20ml",
        price: "₩18,000",
      },
    ],
  },
  {
    id: "pureshield",
    title: "PureShield™",
    image: "/shop/png/pureshield.png",
    images: ["/shop/png/pureshield.png"],
    category: "Additives",
    tag: "pre-order",
    description:
      "Anti-contamination additive. Helps reduce the risk of microbial growth. Coming soon.",
    specs: {
      Volume: "20ml",
      Status: "Pre-sale — ships in 3–4 weeks",
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/60007",
        title: "20ml (Pre-sale)",
        price: "₩15,000",
      },
    ],
  },

  // Tools
  {
    id: "culture-jars",
    title: "Culture Jars (Pack of 5)",
    image: "/shop/png/culture-jars.png",
    images: ["/shop/png/culture-jars.png"],
    category: "Supplies",
    description:
      "Reusable glass culture jars with breathable vented lids for clean growth.",
    specs: {
      Size: "250ml",
      Quantity: "5 jars",
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/60008",
        title: "Pack of 5",
        price: "₩30,000",
      },
    ],
  },
  {
    id: "scalpel",
    title: "Precision Scalpel",
    image: "/shop/png/scalpel.png",
    images: ["/shop/png/scalpel.png"],
    category: "Tools",
    description:
      "High-quality scalpel with replaceable blades for cutting explants.",
    variants: [
      {
        id: "gid://shopify/ProductVariant/60009",
        title: "Scalpel + 10 blades",
        price: "₩15,000",
      },
    ],
  },
  {
    id: "forceps",
    title: "Fine Forceps",
    image: "/shop/png/forceps.png",
    images: ["/shop/png/forceps.png"],
    category: "Tools",
    description:
      "Precision stainless steel forceps for handling delicate plant material.",
    variants: [
      {
        id: "gid://shopify/ProductVariant/60010",
        title: "1 piece",
        price: "₩12,000",
      },
    ],
  },
];
