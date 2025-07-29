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
  subcategory?: string;
  tag?: string;
  description?: string;
  images?: string[];
  features?: string[];
  specs?: Record<string, string>;
  variants: ProductVariant[];
  youtubeVideoId?: string;
  relatedProducts?: string[];
};

export function getRelatedProducts(
  product: Product,
  allProducts: Product[]
): Product[] {
  if (!product.relatedProducts || product.relatedProducts.length === 0)
    return [];

  return product.relatedProducts
    .map((id) => allProducts.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);
}

export const products: Product[] = [
  // Propagation Kits
  {
    id: "orchid-starter-kit",
    title: "Orchid Starter Kit",
    image: "/shop/jpg/propagation-kits.jpg",
    images: [
      "/shop/png/orchid-starter-kit.png",
      "/shop/png/orchid-starter-kit-2.png",
    ],
    category: "Propagation Kits",
    description:
      "Designed for Phalaenopsis and other epiphytic orchids. Includes nutrient-rich organic base media and additives optimized for root initiation and early growth.",
    features: [
      "PhytoBase™ Organic Medium (pre-mixed)",
      "Natural Coconut Charcoal Powder",
      "Organic Sucrose (sterile)",
      "Hormone-free rooting supplement",
      "Sterile scalpel & forceps",
      "Alcohol wipes",
      "Instruction guide",
    ],
    specs: {
      SkillLevel: "Beginner",
      Shipping: "Ships in 3–5 days",
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/60011",
        title: "Complete Kit",
        price: "₩98,000",
      },
    ],
    relatedProducts: ["phytobase-medium", "xboost", "biotone", "mycolift"],
  },

  {
    id: "succulent-cactus-kit",
    title: "Succulent & Cactus Kit",
    image: "/shop/jpg/propagation-kits.jpg",
    images: ["/shop/png/succulent-cactus-kit.png"],
    category: "Propagation Kits",
    description:
      "Formulated for desert plants and slow-growing succulents, focusing on firm, compact growth and low moisture requirements.",
    features: [
      "Low-sucrose PhytoBase™ Medium",
      "Biochar grit additive",
      "Aloe-enhanced gel mix",
      "Sterile scalpel & forceps",
      "Sterile petri cups",
      "Beginner workshop access",
    ],
    specs: {
      SkillLevel: "Beginner",
      Shipping: "Ships in 3–5 days",
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/60012",
        title: "Complete Kit",
        price: "₩95,000",
      },
    ],
    relatedProducts: ["phytobase-medium", "biotone", "pureshield"],
  },

  {
    id: "houseplant-aroid-kit",
    title: "Houseplant & Aroid Kit",
    image: "/shop/jpg/propagation-kits.jpg",
    images: ["/shop/png/houseplant-aroid-kit.png"],
    category: "Propagation Kits",
    description:
      "Perfect for duplicating monstera, philodendron, pothos, and other popular houseplants. Balanced organic nutrients support rapid callus formation.",
    features: [
      "PhytoBase™ Organic Medium",
      "Natural Banana Powder (growth booster)",
      "Kelp Extract",
      "Mini scissors",
      "Forceps",
      "Reusable glass jars",
    ],
    specs: {
      SkillLevel: "Beginner",
      Shipping: "Ships in 3–5 days",
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/60013",
        title: "Complete Kit",
        price: "₩99,000",
      },
    ],
    relatedProducts: ["phytobase-medium", "mycolift", "xboost", "culture-jars"],
  },

  {
    id: "rare-exotic-collectors-kit",
    title: "Rare & Exotic Collector’s Kit",
    image: "/shop/jpg/propagation-kits.jpg",
    images: ["/shop/png/rare-exotic-collectors-kit.png"],
    category: "Propagation Kits",
    description:
      "For collectors experimenting with rare species. Advanced mix with organic additives and micronutrients to support delicate plant material.",
    features: [
      "Custom advanced culture blend",
      "Mycorrhizae inoculant",
      "Activated organic charcoal",
      "Sterile transfer kit",
      "Mini spray mister",
      "Comprehensive guide",
    ],
    specs: {
      SkillLevel: "Advanced",
      Shipping: "Ships in 3–5 days",
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/60014",
        title: "Complete Kit",
        price: "₩125,000",
      },
    ],
    relatedProducts: [
      "pureshield",
      "biotea-compost-extract",
      "vitaburst-vitamin-complex",
    ],
  },

  // Propagation Starter Kit (general)
  {
    id: "propagation-kit",
    title: "Propagation Kit",
    image: "/shop/jpg/propagation-kits.jpg",
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
    relatedProducts: [
      "phytobase-organic-agar",
      "phytogelzan-gelling-agent",
      "shootrise-cytokinin-extract",
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
      "Potent organic booster that accelerates rooting and shoot multiplication.",
    features: ["Use sparingly for faster culture response"],
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
    relatedProducts: ["phytobase-medium", "biotone", "mycolift"],
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
    relatedProducts: ["phytobase-medium", "xboost", "mycolift"],
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
    relatedProducts: ["phytobase-medium", "xboost", "biotone"],
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
    relatedProducts: [
      "biotea-compost-extract",
      "chitoshield-chitosan-solution",
      "vitaburst-vitamin-complex",
    ],
  },
  {
    id: "phytobase-organic-agar",
    title: "PhytoBase™ Organic Agar",
    image: "/shop/png/phytobase-organic-agar.png",
    category: "Organic Media",
    subcategory: "Gelling Agents",
    description:
      "Plant-based gelling agent for solidifying media without synthetics. Essential for clean and stable tissue culture plates.",
    features: ["Essential gelling agent for almost all media"],
    variants: [
      {
        id: "gid://shopify/ProductVariant/60008",
        title: "250g",
        price: "₩30,000",
      },
      {
        id: "gid://shopify/ProductVariant/60009",
        title: "500g",
        price: "₩55,000",
      },
    ],
    relatedProducts: [
      "phytogelzan-gelling-agent",
      "phytobase-medium",
      "shootrise-cytokinin-extract",
    ],
  },
  {
    id: "phytogelzan-gelling-agent",
    title: "PhytoGelzan™ Plant-Based Gelling Agent",
    image: "/shop/png/phytogelzan.png",
    category: "Organic Media",
    subcategory: "Gelling Agents",
    description:
      "A natural, clear alternative to agar. Provides a firmer, glassy surface ideal for woody plant cultures and specialized protocols.",
    features: ["Clear and firm gelling alternative"],
    variants: [
      {
        id: "gid://shopify/ProductVariant/60010",
        title: "250g",
        price: "₩38,000",
      },
    ],
    relatedProducts: [
      "phytobase-organic-agar",
      "phytobase-medium",
      "rootflow-auxin-extract",
    ],
  },
  {
    id: "shootrise-cytokinin-extract",
    title: "ShootRise™ Organic Cytokinin Extract",
    image: "/shop/png/shootrise.png",
    category: "Additives",
    description:
      "Natural cytokinin blend to stimulate shoot proliferation without harsh synthetics.",
    variants: [
      {
        id: "gid://shopify/ProductVariant/60015",
        title: "20ml",
        price: "₩20,000",
      },
    ],
    relatedProducts: ["rootflow-auxin-extract", "phytobase-medium", "xboost"],
  },
  {
    id: "rootflow-auxin-extract",
    title: "RootFlow™ Natural Auxin Extract",
    image: "/shop/png/rootflow.png",
    category: "Additives",
    description:
      "Natural auxin complex that supports rooting and callus formation organically.",
    variants: [
      {
        id: "gid://shopify/ProductVariant/60016",
        title: "20ml",
        price: "₩20,000",
      },
    ],
    relatedProducts: [
      "shootrise-cytokinin-extract",
      "phytobase-medium",
      "mycolift",
    ],
  },
  {
    id: "phytoamino-plant-hydrolysate",
    title: "PhytoAmino™ Plant Hydrolysate",
    image: "/shop/png/phytoamino.png",
    category: "Additives",
    description:
      "Fermented plant amino acids and peptides that enhance nutrition and natural growth signals.",
    variants: [
      {
        id: "gid://shopify/ProductVariant/60017",
        title: "100ml",
        price: "₩22,000",
      },
    ],
    relatedProducts: [
      "vitaburst-vitamin-complex",
      "biotea-compost-extract",
      "biobuffer-ph-kit",
    ],
  },
  {
    id: "biobuffer-ph-kit",
    title: "BioBuffer™ Natural pH Kit",
    image: "/shop/png/biobuffer.png",
    category: "Additives",
    description:
      "A natural buffering system derived from citrus extracts to maintain pH balance.",
    variants: [
      {
        id: "gid://shopify/ProductVariant/60018",
        title: "20ml",
        price: "₩14,000",
      },
    ],
    relatedProducts: [
      "phytoamino-plant-hydrolysate",
      "phytobase-medium",
      "shootrise-cytokinin-extract",
    ],
  },
  {
    id: "biotea-compost-extract",
    title: "BioTea™ Compost Extract",
    image: "/shop/png/biotea.png",
    category: "Additives",
    description:
      "Filtered worm castings and compost extract adding natural nutrients and beneficial compounds.",
    variants: [
      {
        id: "gid://shopify/ProductVariant/60019",
        title: "100ml",
        price: "₩16,000",
      },
    ],
    relatedProducts: [
      "phytoamino-plant-hydrolysate",
      "pureshield",
      "vitaburst-vitamin-complex",
    ],
  },
  {
    id: "vitaburst-vitamin-complex",
    title: "VitaBurst™ Organic Vitamin Complex",
    image: "/shop/png/vitaburst.png",
    category: "Additives",
    description:
      "Fermentation-derived vitamin complex designed to boost slow or difficult plant cultures.",
    variants: [
      {
        id: "gid://shopify/ProductVariant/60020",
        title: "20ml",
        price: "₩21,000",
      },
    ],
    relatedProducts: [
      "phytoamino-plant-hydrolysate",
      "biotea-compost-extract",
      "pureshield",
    ],
  },
  {
    id: "chitoshield-chitosan-solution",
    title: "ChitoShield™ Chitosan Solution",
    image: "/shop/png/chitoshield.png",
    category: "Additives",
    description:
      "Natural chitosan derived from crustaceans that helps plants resist fungal and bacterial diseases.",
    variants: [
      {
        id: "gid://shopify/ProductVariant/60021",
        title: "20ml",
        price: "₩19,000",
      },
    ],
    relatedProducts: ["phytobase-medium", "xboost", "biotone"],
  },
];
