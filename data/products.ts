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
    id: "forcep-fine-point-48-in",
    title: "Forcep, Fine Point, 4.8 in",
    image: "/shop/tools/F335.jpg",
    images: ["/shop/tools/F335.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description: "Fine point forceps. 4.8 in (12.19 cm) in length.",
    variants: [
      {
        id: "variant-forcep-fine-point-48-in",
        title: "Default",
        price: "₩40,110",
      },
    ],
  },
  {
    id: "forceps-bayonet-625-in",
    title: "Forceps, Bayonet, 6.25 in",
    image: "/shop/tools/F083.jpg",
    images: ["/shop/tools/F083.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description:
      "Bayonet forceps with serrated tips. 6.25 inches (15.88 cm) length.",
    variants: [
      {
        id: "variant-forceps-bayonet-625-in",
        title: "Default",
        price: "₩38,850",
      },
    ],
  },
  {
    id: "forceps-bayonet-65-in-research-grade",
    title: "Forceps, Bayonet, 6.5 in, Research Grade",
    image: "/shop/tools/F312.jpg",
    images: ["/shop/tools/F312.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description:
      "Research grade Miltex® dressing forceps. 6½ in (16.5 cm) in length.",
    variants: [
      {
        id: "variant-forceps-bayonet-65-in-research-grade",
        title: "Default",
        price: "₩99,050",
      },
    ],
  },
  {
    id: "forceps-bayonet-675-in",
    title: "Forceps, Bayonet, 6.75 in",
    image: "/shop/tools/F081.jpg",
    images: ["/shop/tools/F081.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description:
      "Bayonet forceps with serrated tips. 7 inches (17.78 cm) length.",
    variants: [
      {
        id: "variant-forceps-bayonet-675-in",
        title: "Default",
        price: "₩47,110",
      },
    ],
  },
  {
    id: "forceps-bayonet-8-in",
    title: "Forceps, Bayonet, 8 in",
    image: "/shop/tools/F957.jpg",
    images: ["/shop/tools/F957.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description: "Bayonet forceps. 8 in (20.32 cm) in length.",
    variants: [
      {
        id: "variant-forceps-bayonet-8-in",
        title: "Default",
        price: "₩64,330",
      },
    ],
  },
  {
    id: "forceps-bayonet-825-in-premium-grade",
    title: "Forceps, Bayonet, 8.25 in, Premium Grade",
    image: "/shop/tools/placeholderimage_1_360_1.jpg",
    images: ["/shop/tools/placeholderimage_1_360_1.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description:
      "Premium grade Miltex® dressing forceps. 8¼ in (21 cm) in length.",
    variants: [
      {
        id: "variant-forceps-bayonet-825-in-premium-grade",
        title: "Default",
        price: "₩176,400",
      },
    ],
  },
  {
    id: "forceps-bayonet-825-in-research-grade",
    title: "Forceps, Bayonet, 8.25 in, Research Grade",
    image: "/shop/tools/F639.jpg",
    images: ["/shop/tools/F639.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description:
      "Research grade Miltex® dressing forceps. 8¼ in (21 cm) in length.",
    variants: [
      {
        id: "variant-forceps-bayonet-825-in-research-grade",
        title: "Default",
        price: "₩96,600",
      },
    ],
  },
  {
    id: "forceps-bayonet-fine-point-825-in-research-grade",
    title: "Forceps, Bayonet, Fine Point, 8.25 in, Research Grade",
    image: "/shop/tools/F633.jpg",
    images: ["/shop/tools/F633.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description:
      "Research grade fine point Miltex® dressing forceps. 8¼ in (21 cm) in length.",
    variants: [
      {
        id: "variant-forceps-bayonet-fine-point-825-in-research-grade",
        title: "Default",
        price: "₩111,580",
      },
    ],
  },
  {
    id: "forceps-curved-6-in",
    title: "Forceps, Curved, 6 in",
    image: "/shop/tools/F955.jpg",
    images: ["/shop/tools/F955.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description: "Curved forceps. 6 in (15.24 cm) in length.",
    variants: [
      {
        id: "variant-forceps-curved-6-in",
        title: "Default",
        price: "₩23,310",
      },
    ],
  },
  {
    id: "forceps-curved-8-in",
    title: "Forceps, Curved, 8 in",
    image: "/shop/tools/F956.jpg",
    images: ["/shop/tools/F956.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description: "Curved forceps. 8 in (20.32 cm) in length.",
    variants: [
      {
        id: "variant-forceps-curved-8-in",
        title: "Default",
        price: "₩31,150",
      },
    ],
  },
  {
    id: "forceps-dressing-10-in",
    title: "Forceps, Dressing, 10 in",
    image: "/shop/tools/F952.jpg",
    images: ["/shop/tools/F952.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description: "Dressing forceps. 10 in (25.88 cm) in length.",
    variants: [
      {
        id: "variant-forceps-dressing-10-in",
        title: "Default",
        price: "₩32,900",
      },
    ],
  },
  {
    id: "forceps-dressing-10-in-premium-grade",
    title: "Forceps, Dressing, 10 in, Premium Grade",
    image: "/shop/tools/F272.jpg",
    images: ["/shop/tools/F272.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description:
      "Premium grade Miltex® dressing forceps. 10 in (25.4 cm) in length.",
    variants: [
      {
        id: "variant-forceps-dressing-10-in-premium-grade",
        title: "Default",
        price: "₩144,200",
      },
    ],
  },
  {
    id: "forceps-dressing-12-in",
    title: "Forceps, Dressing, 12 in",
    image: "/shop/tools/F953.jpg",
    images: ["/shop/tools/F953.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description: "Dressing forceps. 12 in (30.48 cm) in length.",
    variants: [
      {
        id: "variant-forceps-dressing-12-in",
        title: "Default",
        price: "₩42,630",
      },
    ],
  },
  {
    id: "forceps-dressing-475-in-premium-grade",
    title: "Forceps, Dressing, 4.75 in, Premium Grade",
    image: "/shop/tools/F208.jpg",
    images: ["/shop/tools/F208.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description:
      "Fine point Miltex® dressing forceps. 4¾ in (12.1 cm) in length.",
    variants: [
      {
        id: "variant-forceps-dressing-475-in-premium-grade",
        title: "Default",
        price: "₩177,170",
      },
    ],
  },
  {
    id: "forceps-dressing-475-in-research-grade",
    title: "Forceps, Dressing, 4.75 in, Research Grade",
    image: "/shop/tools/F178.jpg",
    images: ["/shop/tools/F178.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description:
      "Fine point Miltex® dressing forceps. 4¾ in (12.1 cm) in length.",
    variants: [
      {
        id: "variant-forceps-dressing-475-in-research-grade",
        title: "Default",
        price: "₩74,410",
      },
    ],
  },
  {
    id: "forceps-dressing-6-in",
    title: "Forceps, Dressing, 6 in",
    image: "/shop/tools/F950.jpg",
    images: ["/shop/tools/F950.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description: "Dressing forceps. 6 in (16.03 cm) in length.",
    variants: [
      {
        id: "variant-forceps-dressing-6-in",
        title: "Default",
        price: "₩27,720",
      },
    ],
  },
  {
    id: "forceps-dressing-6-in-premium-grade",
    title: "Forceps, Dressing, 6 in, Premium Grade",
    image: "/shop/tools/F228.jpg",
    images: ["/shop/tools/F228.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description:
      "Premium grade Miltex® dressing forceps. 6 in (15.2 cm) in length.",
    variants: [
      {
        id: "variant-forceps-dressing-6-in-premium-grade",
        title: "Default",
        price: "₩73,080",
      },
    ],
  },
  {
    id: "forceps-dressing-6-in-research-grade",
    title: "Forceps, Dressing, 6 in, Research Grade",
    image: "/shop/tools/F246.jpg",
    images: ["/shop/tools/F246.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description:
      "Research grade Miltex® dressing forceps. 6 in (15.2 cm) in length.",
    variants: [
      {
        id: "variant-forceps-dressing-6-in-research-grade",
        title: "Default",
        price: "₩51,030",
      },
    ],
  },
  {
    id: "forceps-dressing-8-in",
    title: "Forceps, Dressing, 8 in",
    image: "/shop/tools/F951.jpg",
    images: ["/shop/tools/F951.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description: "Dressing forceps. 8 in (20.32 cm) in length.",
    variants: [
      {
        id: "variant-forceps-dressing-8-in",
        title: "Default",
        price: "₩29,890",
      },
    ],
  },
  {
    id: "forceps-dressing-8-in-premium-grade",
    title: "Forceps, Dressing, 8 in, Premium Grade",
    image: "/shop/tools/F261.jpg",
    images: ["/shop/tools/F261.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description:
      "Premium grade Miltex® dressing forceps. 8 in (20.3 cm) in length.",
    variants: [
      {
        id: "variant-forceps-dressing-8-in-premium-grade",
        title: "Default",
        price: "₩104,020",
      },
    ],
  },
  {
    id: "forceps-dressing-8-in-research-grade",
    title: "Forceps, Dressing, 8 in, Research Grade",
    image: "/shop/tools/F268.jpg",
    images: ["/shop/tools/F268.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description:
      "Research grade Miltex® dressing forceps. 8 in (20.3 cm) in length.",
    variants: [
      {
        id: "variant-forceps-dressing-8-in-research-grade",
        title: "Default",
        price: "₩62,300",
      },
    ],
  },
  {
    id: "forceps-dressing-95-in-premium-grade",
    title: "Forceps, Dressing, 9.5 in, Premium Grade",
    image: "/shop/tools/F3158.jpg",
    images: ["/shop/tools/F3158.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description:
      "Premium grade Miltex® dressing forceps. 9½ in (24 cm) in length.",
    variants: [
      {
        id: "variant-forceps-dressing-95-in-premium-grade",
        title: "Default",
        price: "₩220,500",
      },
    ],
  },
  {
    id: "forceps-fine-point-437-in",
    title: "Forceps, Fine Point, 4.37 in",
    image: "/shop/tools/F343.jpg",
    images: ["/shop/tools/F343.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description: "Fine point forceps. 4.37 in (11.10 cm) in length",
    variants: [
      {
        id: "variant-forceps-fine-point-437-in",
        title: "Default",
        price: "₩25,410",
      },
    ],
  },
  {
    id: "forceps-fine-point-465-in",
    title: "Forceps, Fine Point, 4.65 in",
    image: "/shop/tools/F340.jpg",
    images: ["/shop/tools/F340.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description: "Fine point forceps. 4.65 in (11.81 cm) in length.",
    variants: [
      {
        id: "variant-forceps-fine-point-465-in",
        title: "Default",
        price: "₩25,410",
      },
    ],
  },
  {
    id: "forceps-fine-point-65-in",
    title: "Forceps, Fine Point, 6.5 in",
    image: "/shop/tools/F091.jpg",
    images: ["/shop/tools/F091.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description: "Fine point forceps. 6.5 in (16.51 cm) inches in length.",
    variants: [
      {
        id: "variant-forceps-fine-point-65-in",
        title: "Default",
        price: "₩63,140",
      },
    ],
  },
  {
    id: "forceps-fine-point-475-in",
    title: "Forceps, Fine Point 4.75 in",
    image: "/shop/tools/F086.jpg",
    images: ["/shop/tools/F086.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description: "Fine point forceps. 4.75 (12.07 cm) inches in length",
    variants: [
      {
        id: "variant-forceps-fine-point-475-in",
        title: "Default",
        price: "₩64,190",
      },
    ],
  },
  {
    id: "forceps-dressing-fine-point-10-in",
    title: "Forceps, Dressing, Fine Point, 10 in",
    image: "/shop/tools/f3141_1.jpg",
    images: ["/shop/tools/f3141_1.jpg"],
    category: "Tools",
    subcategory: "Forceps",
    description:
      "Dressing forceps that are 10 inches (25.88 cm) in length, with serrated fine point tips. With a guide pin to help keep the tips aligned.",
    variants: [
      {
        id: "variant-forceps-dressing-fine-point-10-in",
        title: "Default",
        price: "₩53,830",
      },
    ],
  },
  {
    id: "inoculating-loop-10-ml",
    title: "Inoculating Loop, 10 μl",
    image: "/shop/tools/I382.jpg",
    images: ["/shop/tools/I382.jpg"],
    category: "Tools",
    subcategory: "Inoculating Loops",
    description:
      "10 μl size, 170 mm in length.\n\nInner Diameter Loop: 4.06 mm\nPlastic; sterile; not autoclavable",
    variants: [
      {
        id: "variant-inoculating-loop-10-ml",
        title: "Default",
        price: "₩9,800",
      },
    ],
  },
  {
    id: "instrument-rest-horizontal",
    title: "Instrument Rest, Horizontal",
    image: "/shop/tools/I556.jpg",
    images: ["/shop/tools/I556.jpg"],
    category: "Tools",
    subcategory: "Instrument Rests",
    description:
      "Heavy-duty aluminum instrument rest. Instrument rests allow your tools to cool after using a glass bead sterilizer, or simply provide a resting surface when they are not in use.",
    variants: [
      {
        id: "variant-instrument-rest-horizontal",
        title: "Default",
        price: "₩37,170",
      },
    ],
  },
  {
    id: "instrument-rest-horizontal-bar",
    title: "Instrument Rest, Horizontal Bar",
    image: "/shop/tools/I4013.jpg",
    images: ["/shop/tools/I4013.jpg"],
    category: "Tools",
    subcategory: "Instrument Rests",
    description:
      "Stainless steel instrument rest, bar design. Instrument rests allow your tools to cool after using a glass bead sterilizer, or simply provide a resting surface when they are not in use.",
    variants: [
      {
        id: "variant-instrument-rest-horizontal-bar",
        title: "Default",
        price: "₩26,460",
      },
    ],
  },
  {
    id: "instrument-rest-vertical",
    title: "Instrument Rest, Vertical",
    image: "/shop/tools/I623.jpg",
    images: ["/shop/tools/I623.jpg"],
    category: "Tools",
    subcategory: "Instrument Rests",
    description:
      "Heavy-duty aluminum instrument rest. Instrument rests allow your tools to cool after using a glass bead sterilizer, or simply provide a resting surface when they are not in use. I623 has 9 slots to place your instruments at a vertical angle.",
    variants: [
      {
        id: "variant-instrument-rest-vertical",
        title: "Default",
        price: "₩94,850",
      },
    ],
  },
  {
    id: "scalpel-blade-no-10",
    title: "Scalpel Blade, No. 10",
    image: "/shop/tools/placeholderimage_1_360_1.jpg",
    images: ["/shop/tools/placeholderimage_1_360_1.jpg"],
    category: "Tools",
    subcategory: "Scalpels",
    description:
      "No. 10 scalpel blades, individually wrapped carbon steel, and sterile.",
    variants: [
      {
        id: "variant-scalpel-blade-no-10",
        title: "Default",
        price: "₩143,850",
      },
    ],
  },
  {
    id: "scalpel-blade-no-11",
    title: "Scalpel Blade, No. 11",
    image: "/shop/tools/placeholderimage_1_360_1.jpg",
    images: ["/shop/tools/placeholderimage_1_360_1.jpg"],
    category: "Tools",
    subcategory: "Scalpels",
    description:
      "No. 11 scalpel blades, individually wrapped carbon steel, and sterile.",
    variants: [
      {
        id: "variant-scalpel-blade-no-11",
        title: "Default",
        price: "₩143,850",
      },
    ],
  },
  {
    id: "scalpel-blade-no-23",
    title: "Scalpel Blade, No. 23",
    image: "/shop/tools/placeholderimage_1_360_1.jpg",
    images: ["/shop/tools/placeholderimage_1_360_1.jpg"],
    category: "Tools",
    subcategory: "Scalpels",
    description:
      "No. 23 scalpel blades, individually wrapped carbon steel, and sterile.",
    variants: [
      {
        id: "variant-scalpel-blade-no-23",
        title: "Default",
        price: "₩183,330",
      },
    ],
  },
  {
    id: "scalpel-blade-no15",
    title: "Scalpel Blade, No.15",
    image: "/shop/tools/placeholderimage_1_360_1.jpg",
    images: ["/shop/tools/placeholderimage_1_360_1.jpg"],
    category: "Tools",
    subcategory: "Scalpels",
    description:
      "No. 15 scalpel blades, individually wrapped carbon steel, and sterile.",
    variants: [
      {
        id: "variant-scalpel-blade-no15",
        title: "Default",
        price: "₩137,340",
      },
    ],
  },
  {
    id: "scalpel-handle-no-3",
    title: "Scalpel Handle, No. 3",
    image: "/shop/tools/S963.jpg",
    images: ["/shop/tools/S963.jpg"],
    category: "Tools",
    subcategory: "Scalpels",
    description:
      "No. 3 scalpel handle for use with No. 10 (S970) or 11 (S971) scalpel blades.",
    variants: [
      {
        id: "variant-scalpel-handle-no-3",
        title: "Default",
        price: "₩44,590",
      },
    ],
  },
  {
    id: "scalpel-handle-no-4",
    title: "Scalpel Handle, No. 4",
    image: "/shop/tools/S094.jpg",
    images: ["/shop/tools/S094.jpg"],
    category: "Tools",
    subcategory: "Scalpels",
    description: "No. 4 scalpel handle for use with No. 23 scalpel blades.",
    variants: [
      {
        id: "variant-scalpel-handle-no-4",
        title: "Default",
        price: "₩51,730",
      },
    ],
  },
  {
    id: "scalpel-handle-no-4l",
    title: "Scalpel Handle, No. 4L",
    image: "/shop/tools/placeholderimage_1_360_1.jpg",
    images: ["/shop/tools/placeholderimage_1_360_1.jpg"],
    category: "Tools",
    subcategory: "Scalpels",
    description:
      "No. 4L scalpel handle for use with No. 15 scalpel blades (S975).",
    variants: [
      {
        id: "variant-scalpel-handle-no-4l",
        title: "Default",
        price: "₩55,790",
      },
    ],
  },
  {
    id: "scalpel-handle-no-7",
    title: "Scalpel Handle, No. 7",
    image: "/shop/tools/placeholderimage_1_360_1.jpg",
    images: ["/shop/tools/placeholderimage_1_360_1.jpg"],
    category: "Tools",
    subcategory: "Scalpels",
    description:
      "No. 7 scalpel handle for use with No. 10 (S970) or 11 (S971) scalpel blades.",
    variants: [
      {
        id: "variant-scalpel-handle-no-7",
        title: "Default",
        price: "₩51,520",
      },
    ],
  },
  {
    id: "scalpel-handle-no-3l",
    title: "Scalpel Handle, No 3L",
    image: "/shop/tools/placeholderimage_1_360_1.jpg",
    images: ["/shop/tools/placeholderimage_1_360_1.jpg"],
    category: "Tools",
    subcategory: "Scalpels",
    description:
      "No. 3L scalpel handle for use with No. 10 (S970), 11 (S971), or 15 (S975) scalpel blades.",
    variants: [
      {
        id: "variant-scalpel-handle-no-3l",
        title: "Default",
        price: "₩55,790",
      },
    ],
  },
  {
    id: "scissors-straight-5-in",
    title: "Scissors, Straight, 5½ in",
    image: "/shop/tools/S988.jpg",
    images: ["/shop/tools/S988.jpg"],
    category: "Tools",
    subcategory: "Scissors",
    description: "Straight scissors with sharp points.",
    variants: [
      {
        id: "variant-scissors-straight-5-in",
        title: "Default",
        price: "₩32,900",
      },
    ],
  },
  {
    id: "scissors-straight-55-in-research-grade",
    title: "Scissors, Straight, 5.5 in, Research Grade",
    image: "/shop/tools/S641.jpg",
    images: ["/shop/tools/S641.jpg"],
    category: "Tools",
    subcategory: "Scissors",
    description: "Research grade Miltex® scissors with straight, sharp points.",
    variants: [
      {
        id: "variant-scissors-straight-55-in-research-grade",
        title: "Default",
        price: "₩81,200",
      },
    ],
  },
  {
    id: "scissors-straight-6-in-premium-grade",
    title: "Scissors, Straight, 6 in, Premium Grade",
    image: "/shop/tools/S644.jpg",
    images: ["/shop/tools/S644.jpg"],
    category: "Tools",
    subcategory: "Scissors",
    description: "Premium grade Miltex® scissors with straight, sharp points.",
    variants: [
      {
        id: "variant-scissors-straight-6-in-premium-grade",
        title: "Default",
        price: "₩157,360",
      },
    ],
  },
  {
    id: "scissors-straight-6375-in",
    title: "Scissors, Straight, 6.375 in",
    image: "/shop/tools/S836.jpg",
    images: ["/shop/tools/S836.jpg"],
    category: "Tools",
    subcategory: "Scissors",
    description: "Straight scissors with sharp points.",
    variants: [
      {
        id: "variant-scissors-straight-6375-in",
        title: "Default",
        price: "₩40,460",
      },
    ],
  },
  {
    id: "scissors-straight-8-in",
    title: "Scissors, Straight, 8 in",
    image: "/shop/tools/S087.jpg",
    images: ["/shop/tools/S087.jpg"],
    category: "Tools",
    subcategory: "Scissors",
    description: "Straight scissors with sharp points.",
    variants: [
      {
        id: "variant-scissors-straight-8-in",
        title: "Default",
        price: "₩44,940",
      },
    ],
  },
  {
    id: "scoopmicrospoon-large",
    title: "Scoop/Microspoon, Large",
    image: "/shop/tools/S018.jpg",
    images: ["/shop/tools/S018.jpg"],
    category: "Tools",
    subcategory: "Spoons & Scoops",
    description:
      "Large, double-ended scoop/microspoon\nSmall End: 4.76 mm Inner Diameter\nBig End: 6.35 mm Inner Diameter\nExcellent for weighing small quantities of chemicals.",
    variants: [
      {
        id: "variant-scoopmicrospoon-large",
        title: "Default",
        price: "₩31,220",
      },
    ],
  },
  {
    id: "scoopmicrospoon-small",
    title: "Scoop/Microspoon, Small",
    image: "/shop/tools/S014.jpg",
    images: ["/shop/tools/S014.jpg"],
    category: "Tools",
    subcategory: "Spoons & Scoops",
    description:
      "Small, double-ended scoop/microspoon\nSmall End: 2.65 mm Inner Diameter\nBig End: 3.57 mm Inner Diameter\nExcellent for weighing small quantities of chemicals.",
    variants: [
      {
        id: "variant-scoopmicrospoon-small",
        title: "Default",
        price: "₩31,220",
      },
    ],
  },
  {
    id: "spatula-flat-double-ended",
    title: "Spatula, Flat, Double Ended",
    image: "/shop/tools/S977.jpg",
    images: ["/shop/tools/S977.jpg"],
    category: "Tools",
    subcategory: "Spatulas",
    description: "Double-ended flat spatula.",
    variants: [
      {
        id: "variant-spatula-flat-double-ended",
        title: "Default",
        price: "₩13,650",
      },
    ],
  },
  {
    id: "spatulaspoon",
    title: "Spatula/Spoon",
    image: "/shop/tools/S978.jpg",
    images: ["/shop/tools/S978.jpg"],
    category: "Tools",
    subcategory: "Spatulas",
    description: "Double-ended spatula with a straight end and curved end.",
    variants: [
      {
        id: "variant-spatulaspoon",
        title: "Default",
        price: "₩16,030",
      },
    ],
  },
  {
    id: "universal-scalpel-blade-remover",
    title: "Universal Scalpel Blade Remover",
    image: "/shop/tools/B004.jpg",
    images: ["/shop/tools/B004.jpg"],
    category: "Tools",
    subcategory: "Scalpels",
    description:
      "Plastic box used for the removal and storage of used scalpel blades",
    variants: [
      {
        id: "variant-universal-scalpel-blade-remover",
        title: "Default",
        price: "₩12,180",
      },
    ],
  },
];
