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
  {
    id: "worm-pack",
    title: "Red Wiggler Worm Pack",
    image: "/shop/png/worm-pack.png",
    images: [
      "/shop/png/worm-pack.png",
      "/shop/png/worm-pack-2.png",
      "/shop/png/worm-pack-3.png",
    ],
    category: "Worm Bin Essentials",
    tag: "pre-order",
    description:
      "A pack of red wiggler worms, ideal for composting and soil enrichment.",
    features: [
      "Organic and pesticide-free",
      "Perfect for home compost bins",
      "Enhances soil aeration and fertility",
    ],
    specs: {
      Weight: "Available in 500g and 1kg",
      Shipping: "Ships within 24 hours",
      Origin: "Locally bred in Korea",
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/51010981626169",
        title: "500g",
        price: "₩25,000",
      },
      {
        id: "gid://shopify/ProductVariant/51010981658937",
        title: "1kg",
        price: "₩50,000",
      },
    ],
    youtubeVideoId: "",
    relatedProducts: ["starter-bin", "castings"],
  },
  {
    id: "starter-bin",
    title: "Starter Worm Bin",
    image: "/shop/png/worm-bin.png",
    images: ["/shop/png/worm-bin.png"],
    category: "Worm Bin Essentials",
    tag: "new",
    description:
      "Everything you need to get started with worm composting in one bin.",
    features: [
      "Compact and durable design",
      "Easy to assemble and maintain",
      "Includes starter bedding material",
    ],
    specs: {
      Size: "40cm x 30cm x 25cm",
      Material: "Recycled plastic",
      Warranty: "1 year",
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/51013307400505",
        title: "Basic Starter Bin",
        price: "₩150,000",
      },
    ],
    youtubeVideoId: "",
    relatedProducts: ["worm-pack", "castings", "stickers"],
  },
  {
    id: "castings",
    title: "Dirtman Castings",
    image: "/shop/png/castings.png",
    images: ["/shop/png/castings.png", "/shop/png/castings-2.png"],
    category: "Worm Bin Essentials",
    tag: "pre-order",
    description:
      "Nutrient-rich worm castings to enrich your garden soil naturally.",
    features: [
      "Improves soil structure",
      "Boosts plant growth",
      "Chemical-free and safe",
    ],
    specs: {
      Weight: "Available in 500g and 1kg",
      Packaging: "Eco-friendly breathable bags",
      ShelfLife: "Up to 12 months if stored properly",
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/51013327225145",
        title: "500g",
        price: "₩15,000",
      },
      {
        id: "gid://shopify/ProductVariant/51013327257913",
        title: "1kg",
        price: "₩25,000",
      },
    ],
    relatedProducts: ["worm-pack", "starter-bin"],
  },
  {
    id: "tshirt",
    title: "Dirtman Logo T-Shirt",
    image: "/shop/png/shirt.png",
    images: [
      "/shop/png/shirt.png",
      "/shop/png/shirt-back.png",
      "/shop/png/shirt-detail.png",
    ],
    category: "Merch",
    description:
      "Comfortable cotton t-shirt featuring the Dirtman logo, available in multiple sizes.",
    features: ["100% organic cotton", "Pre-shrunk fabric", "Unisex fit"],
    specs: {
      Sizes: "S, M, L, XL, 2XL",
      Care: "Machine wash cold",
      MadeIn: "South Korea",
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/51013329256761",
        title: "S",
        price: "₩29,000",
      },
      {
        id: "gid://shopify/ProductVariant/51013329289529",
        title: "M",
        price: "₩29,000",
      },
      {
        id: "gid://shopify/ProductVariant/51013333319993",
        title: "L",
        price: "₩29,000",
      },
      {
        id: "gid://shopify/ProductVariant/51013333352761",
        title: "XL",
        price: "₩29,000",
      },
      {
        id: "gid://shopify/ProductVariant/51013333385529",
        title: "2XL",
        price: "₩29,000",
      },
    ],
    tag: "popular",
    youtubeVideoId: "",
    relatedProducts: ["stickers"],
  },
  {
    id: "stickers",
    title: "Sticker Pack",
    image: "/shop/png/sticker-pack.png",
    images: ["/shop/png/sticker-pack.png"],
    category: "Merch",
    description:
      "A set of Dirtman-themed stickers to personalize your gear and belongings.",
    features: [
      "High-quality vinyl",
      "Weather-resistant",
      "Multiple designs included",
    ],
    specs: {
      Quantity: "10 stickers per pack",
      Size: "Various sizes",
      Material: "Vinyl",
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/51013356454201",
        title: "Standard Pack",
        price: "₩6,000",
      },
    ],
    relatedProducts: ["tshirt"],
  },
  {
    id: "zine-vol1",
    title: "Worm Zine Vol. 1",
    image: "/shop/png/worm-zine.png",
    images: ["/shop/png/worm-zine.png"],
    category: "For the Curious",
    description:
      "The first volume of our Worm Zine, packed with tips, stories, and worm wisdom.",
    features: [
      "12-page booklet",
      "Full-color illustrations",
      "Limited edition print",
    ],
    specs: {
      Pages: "12",
      Format: "Booklet",
      Language: "English & Korean",
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/51013368709433",
        title: "Vol. 1",
        price: "₩8,000",
      },
    ],
    relatedProducts: ["worm-pack", "castings"],
  },
];
