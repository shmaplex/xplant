export type ProductKey =
  | "PhytoBase™ Organic Agar"
  | "PhytoGelzan™ Plant-Based Gelling Agent"
  | "ShootRise™ Organic Cytokinin Extract"
  | "RootFlow™ Natural Auxin Extract"
  | "PhytoAmino™ Plant Hydrolysate"
  | "BioBuffer™ Natural pH Kit"
  | "BioTea™ Compost Extract"
  | "XBoost™"
  | "BioTone™"
  | "MycoLift™"
  | "PureShield™"
  | "VitaBurst™ Organic Vitamin Complex"
  | "ChitoShield™ Chitosan Solution";

export interface ShmaplexProduct {
  name: ProductKey;
  description: string;
  replaces: string;
  use: string;
}

export const shmaplexProducts: ShmaplexProduct[] = [
  {
    name: "PhytoBase™ Organic Agar",
    description:
      "Plant-based gelling agent for solidifying media without synthetics. Essential for clean and stable tissue culture plates.",
    replaces: "Synthetic agar or gelrite",
    use: "Used in almost all media recipes as the primary gelling base.",
  },
  {
    name: "PhytoGelzan™ Plant-Based Gelling Agent",
    description:
      "A natural, clear alternative to agar. Provides a firmer, glassy surface ideal for woody plant cultures and specialized protocols.",
    replaces: "Synthetic Gelzan or agar substitutes",
    use: "Use when a firm gel is needed, especially for woody plant media.",
  },
  {
    name: "ShootRise™ Organic Cytokinin Extract",
    description:
      "Natural cytokinin blend to stimulate shoot proliferation without harsh synthetics.",
    replaces: "Synthetic BAP (benzylaminopurine)",
    use: "Promotes shoot formation during early culture stages.",
  },
  {
    name: "RootFlow™ Natural Auxin Extract",
    description:
      "Natural auxin complex that supports rooting and callus formation organically.",
    replaces: "Synthetic IBA or NAA",
    use: "Used in rooting media or during callus induction steps.",
  },
  {
    name: "PhytoAmino™ Plant Hydrolysate",
    description:
      "Fermented plant amino acids and peptides that enhance nutrition and natural growth signals.",
    replaces: "Synthetic amino acid supplements",
    use: "Added to media to improve vigor and nutrient uptake.",
  },
  {
    name: "BioBuffer™ Natural pH Kit",
    description:
      "A natural buffering system derived from citrus extracts to maintain pH balance.",
    replaces: "Chemical pH buffers like MES or citrate",
    use: "Keeps pH stable during culture and reduces stress on explants.",
  },
  {
    name: "BioTea™ Compost Extract",
    description:
      "Filtered worm castings and compost extract adding natural nutrients and beneficial compounds.",
    replaces: "Chemical micronutrient additives",
    use: "Adds bioactive signals and micronutrients to base media.",
  },
  {
    name: "XBoost™",
    description:
      "Potent organic booster that accelerates rooting and shoot multiplication.",
    replaces: "Synthetic growth boosters or chemical enhancers",
    use: "Use sparingly for faster culture response.",
  },
  {
    name: "BioTone™",
    description:
      "Balances pH and adds organic micronutrients for strong and healthy tissue culture growth.",
    replaces: "Chemical pH adjusters and micronutrient mixes",
    use: "For overall balance and nutrient supplementation.",
  },
  {
    name: "MycoLift™",
    description:
      "Organic mycorrhizal and fungal inoculant to improve symbiotic plant resilience.",
    replaces: "Commercial synthetic fungal inoculants",
    use: "Advanced use to introduce beneficial fungi in vitro.",
  },
  {
    name: "PureShield™",
    description:
      "Anti-contamination additive (coming soon) that reduces microbial outbreaks without harsh antibiotics.",
    replaces: "Chemical sterilizers or antibiotics",
    use: "Used in very low amounts for high-risk explants.",
  },
  {
    name: "VitaBurst™ Organic Vitamin Complex",
    description:
      "Fermentation-derived vitamin complex designed to boost slow or difficult plant cultures.",
    replaces: "Synthetic vitamin mixes (thiamine, nicotinic acid, etc.)",
    use: "Add to vitamin-deficient media formulations to enhance slow growers.",
  },
  {
    name: "ChitoShield™ Chitosan Solution",
    description:
      "Natural chitosan derived from crustaceans that helps plants resist fungal and bacterial diseases.",
    replaces: "Synthetic plant defense chemicals",
    use: "Used in media to strengthen plant immunity.",
  },
];
