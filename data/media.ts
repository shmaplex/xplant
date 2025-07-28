export interface MediaType {
  name: string;
  description: string;
  keyIngredients: string[];
  associatedPlants: string[];
  funName: string;
}

export const mediaTypes: MediaType[] = [
  {
    name: "PhytoBase™ Organic General",
    description: `
      Balanced organic base medium using PhytoBase™ organic agar,
      coconut water, and natural nutrients. Supports healthy shoot growth
      with no synthetic chemicals.
    `,
    keyIngredients: [
      "PhytoBase™ Organic Agar",
      "Coconut water (10%)",
      "PhytoAmino™ Plant Hydrolysate",
      "Organic cane sugar (3%)",
      "BioBuffer™ Natural pH Kit",
    ],
    associatedPlants: [
      "Anthurium spp.",
      "Peace Lily (Spathiphyllum)",
      "Philodendron varieties",
    ],
    funName: "Apical Prime",
  },
  {
    name: "Woody Plant Organic Boost",
    description: `
      Designed for woody plants using natural gelling agents and
      Seaweed Extract for improved shoot elongation and health.
    `,
    keyIngredients: [
      "PhytoGelzan™ Plant-Based Gelling Agent", // updated
      "Seaweed Extract (5%)",
      "Organic cane sugar",
      "PhytoAmino™ Plant Hydrolysate",
      "Coconut water (8%)",
    ],
    associatedPlants: [
      "Blueberry (Vaccinium spp.)",
      "Blackberry (Rubus spp.)",
      "Apple and cherry varieties",
    ],
    funName: "Hardwood Harmony",
  },
  {
    name: "Seedling Starter Organic Mix",
    description: `
      Clean, contamination-resistant medium with natural agar and
      gentle nutrients for seed and embryo culture.
    `,
    keyIngredients: [
      "PhytoBase™ Organic Agar",
      "Coconut water (12%)",
      "PhytoAmino™ Plant Hydrolysate",
      "Organic cane sugar (2.5%)",
      "BioBuffer™ Natural pH Kit",
    ],
    associatedPlants: [
      "Orchid seedlings",
      "Anthurium seed culture",
      "Rare foliage hybrids",
    ],
    funName: "Nerd Candy Starter",
  },
  {
    name: "Shoot Tip Natural Booster",
    description: `
      Optimized for apical shoot tip multiplication with
      natural biostimulants and organic nutrients.
    `,
    keyIngredients: [
      "PhytoBase™ Organic Agar",
      "Coconut water (10%)",
      "PhytoAmino™ Plant Hydrolysate",
      "Beet sugar (3%)",
      "Seaweed Extract (3%)",
    ],
    associatedPlants: [
      "Hybrid Spathiphyllum",
      "Variegated Thai cultivars",
      "Specialty fruit breeding lines",
    ],
    funName: "Apical Apex",
  },
  {
    name: "Acclimation Organic Medium",
    description: `
      Low nutrient, gentle medium to help cultures adapt to in vitro conditions
      and prevent stress.
    `,
    keyIngredients: [
      "PhytoBase™ Organic Agar",
      "Reduced coconut water (5%)",
      "Low PhytoAmino™ Plant Hydrolysate",
      "Organic cane sugar (1.5%)",
      "Seaweed Extract (2%)",
    ],
    associatedPlants: [
      "Mother block plants",
      "Sensitive foliage",
      "New breeding introductions",
    ],
    funName: "Gentle Start",
  },
  {
    name: "Shoot Multiplication Organic",
    description: `
      Promotes shoot multiplication using natural hormones derived from
      Seaweed Extract and amino acids.
    `,
    keyIngredients: [
      "PhytoBase™ Organic Agar",
      "Seaweed Extract (8%)",
      "PhytoAmino™ Plant Hydrolysate",
      "Organic cane sugar (2.5%)",
      "Coconut water (7%)",
    ],
    associatedPlants: ["Rapid growing hardwoods", "Foliage cultivars"],
    funName: "Shoot First",
  },
  {
    name: "Cold Storage Organic Mix",
    description: `
      Minimal nutrients and firm PhytoBase™ organic agar for
      long-term culture dormancy at low temperatures.
    `,
    keyIngredients: [
      "PhytoBase™ Organic Agar (higher concentration)",
      "Low coconut water (2%)",
      "Organic cane sugar (1%)",
    ],
    associatedPlants: [
      "Blueberry clones",
      "Blackberry genotypes",
      "Specialty hardwoods",
    ],
    funName: "Winter Chill",
  },
  {
    name: "Micropropagation Trial Organic",
    description: `
      Balanced medium with natural growth boosters
      for screening breeding lines.
    `,
    keyIngredients: [
      "PhytoBase™ Organic Agar",
      "Coconut water (8%)",
      "PhytoAmino™ Plant Hydrolysate",
      "Beet sugar (2.5%)",
      "BioTone™ Additive",
    ],
    associatedPlants: ["Breeding program lines", "Experimental hybrids"],
    funName: "Trial Blend",
  },
  {
    name: "Endophyte Cleanse Organic",
    description: `
      Minimal nutrient medium to support explants
      post vacuum treatment for endophyte removal.
    `,
    keyIngredients: [
      "PhytoBase™ Organic Agar",
      "Diluted coconut water (3%)",
      "Organic cane sugar (1.5%)",
      "BioBuffer™ Natural pH Kit",
    ],
    associatedPlants: ["Anthurium seeds", "Rare tropical foliage"],
    funName: "Clean Sweep",
  },
  {
    name: "High Multiplication Organic Boost",
    description: `
      Maximizes shoot proliferation using Seaweed Extract
      and organic amino acid supplements.
    `,
    keyIngredients: [
      "PhytoBase™ Organic Agar",
      "Seaweed Extract (10%)",
      "PhytoAmino™ Plant Hydrolysate",
      "Beet sugar (3%)",
      "Coconut water (8%)",
    ],
    associatedPlants: ["Commercial Spathiphyllum", "High yield foliage plants"],
    funName: "Growth Surge",
  },
  {
    name: "Low Sugar Sensitive Media",
    description: `
      Reduced sugar content to limit contamination
      and hyperhydricity in sensitive species.
    `,
    keyIngredients: [
      "PhytoBase™ Organic Agar",
      "Coconut water (7%)",
      "Low PhytoAmino™ Plant Hydrolysate",
      "Organic cane sugar (1.5%)",
    ],
    associatedPlants: ["Delicate foliage", "New cultures"],
    funName: "Lean & Clean",
  },
  {
    name: "Plant Defense Organic Blend",
    description: `
      Boosts immunity with Seaweed Extract and natural
      chitosan derived from crustaceans.
    `,
    keyIngredients: [
      "PhytoBase™ Organic Agar",
      "Seaweed Extract",
      "ChitoShield™ Chitosan Solution",
      "PhytoAmino™ Plant Hydrolysate",
    ],
    associatedPlants: [
      "Plants prone to fungal infections",
      "High value breeding lines",
    ],
    funName: "Immunity Shield",
  },
  {
    name: "pH Balanced Organic Mix",
    description: `
      Maintains stable pH using natural buffers
      such as citric acid and lime powder.
    `,
    keyIngredients: [
      "PhytoBase™ Organic Agar",
      "Coconut water",
      "BioBuffer™ Natural pH Kit",
      "Lime powder",
    ],
    associatedPlants: ["Sensitive species requiring precise pH"],
    funName: "Balance Buffer",
  },
  {
    name: "Carbohydrate Variation Organic",
    description: `
      Experiments with cane sugar and beet sugar
      sources to find ideal carbohydrate nutrition.
    `,
    keyIngredients: [
      "PhytoBase™ Organic Agar",
      "Coconut water",
      "Organic cane sugar or beet sugar",
    ],
    associatedPlants: ["Diverse foliage", "Experimental lines"],
    funName: "Sweet Choice",
  },
  {
    name: "Vitamin Enhanced Organic",
    description: `
      Media enriched with fermentation-derived vitamins
      and natural amino acids for slow growers.
    `,
    keyIngredients: [
      "PhytoBase™ Organic Agar",
      "Coconut water",
      "VitaBurst™ Organic Vitamin Complex",
      "PhytoAmino™ Plant Hydrolysate",
    ],
    associatedPlants: ["Slow growers", "Hard to culture species"],
    funName: "VitaGrow",
  },
];
