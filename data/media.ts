// /data/media.ts
export interface MediaType {
  name: string;
  description: string;
  keyIngredients: string[];
  associatedPlants: string[];
  funName: string;
}

export const mediaTypes: MediaType[] = [
  {
    name: "PhytoBase™ General Purpose",
    description: `
    Balanced organic base medium using PhytoBase™ agar and MS-based nutrients.
    Promotes healthy direct shoot multiplication with low cytokinin.
    Avoids rooting to focus energy on shoots.
    `,
    keyIngredients: [
      "PhytoBase™ Organic Agar",
      "MS Basal Salts",
      "Low cytokinin (e.g., 0.5 mg/L BAP)",
      "Natural amino acid supplement",
      "Organic cane sugar (3%)",
      "Citric acid buffer for pH ~5.8",
    ],
    associatedPlants: [
      "Anthurium spp. (foliage plants)",
      "Spathiphyllum (Peace Lily)",
      "Philodendron genotypes",
    ],
    funName: "Apical Prime",
  },
  {
    name: "Woody Nodal Enrich",
    description: `
    Specialized for woody plants with nodal explants.
    Slightly higher cytokinin and auxin balance to promote shoot elongation and prevent callusing.
    Uses gelzan as gelling agent for firmer medium.
    `,
    keyIngredients: [
      "Gelzan gelling agent",
      "MS Basal Salts",
      "Balanced auxin-cytokinin ratio (e.g., 0.2 mg/L NAA, 1 mg/L BAP)",
      "Seaweed extract for plant defense",
      "Organic beet sugar",
    ],
    associatedPlants: [
      "Blueberry (Vaccinium spp.)",
      "Blackberry (Rubus spp.)",
      "Hardwood fruit trees (apple, cherry genotypes)",
    ],
    funName: "Hardwood Harmony",
  },
  {
    name: "Seedling Initiation Mix",
    description: `
    Designed for clean, small seed explants (1mm) with minimized contamination risk.
    Uses vacuum treatment to remove endophytes.
    No antimicrobials in media, focus on technique.
    `,
    keyIngredients: [
      "Organic agar powder",
      "MS salts",
      "Trace amino acids",
      "Citric acid buffer pH 5.7",
      "Organic cane sugar 2.5%",
    ],
    associatedPlants: [
      "Orchid seedlings",
      "Anthurium (seed culture)",
      "Rare foliage hybrids",
    ],
    funName: "Nerd Candy Starter",
  },
  {
    name: "Shoot Tip Meristem Boost",
    description: `
    Media optimized for apical shoot tips harvested to minimize somaclonal variation.
    High cytokinin with biostimulants to maximize direct multiplication.
    `,
    keyIngredients: [
      "PhytoBase™ agar",
      "MS salts",
      "Higher BAP (1.5 mg/L)",
      "Natural auxins low (0.05 mg/L)",
      "Organic amino acids",
      "Beet sugar",
    ],
    associatedPlants: [
      "Hybrid Spathiphyllum",
      "Thai con variegated genotypes",
      "Specialty fruit breeding lines",
    ],
    funName: "Apical Apex",
  },
  {
    name: "Acclimation Phase Medium",
    description: `
    For young cultures adapting to in vitro conditions (6-12 months).
    Low nutrient, gentle hormones to avoid hyperhydricity.
    `,
    keyIngredients: [
      "Organic agar",
      "Reduced MS salts (50%)",
      "Low auxin and cytokinin (0.1 mg/L each)",
      "Organic cane sugar 1.5%",
      "Seaweed extract",
    ],
    associatedPlants: [
      "Mother Block stock plants",
      "Sensitive foliage",
      "New introductions from breeding",
    ],
    funName: "Gentle Start",
  },
  {
    name: "Root Inhibition Media",
    description: `
    Intentionally stunts root development in vitro to maximize shoot multiplication.
    Lower sugar to reduce fungal contamination risk in greenhouse.
    `,
    keyIngredients: [
      "PhytoBase™ agar",
      "MS salts",
      "Cytokinin dominant (1.8 mg/L BAP)",
      "No auxin",
      "Organic cane sugar 2.5%",
    ],
    associatedPlants: [
      "All hardwood genotypes in production",
      "Foliage cultivars with rapid shoot growth",
    ],
    funName: "Shoot First",
  },
  {
    name: "Cold Storage Dormant Mix",
    description: `
    For long-term fridge storage of hardwoods at 4-6°C.
    Minimal nutrients to maintain dormancy without growth.
    Agar firmness increased to avoid shoot elongation.
    `,
    keyIngredients: [
      "Organic agar high concentration",
      "Reduced MS salts",
      "No hormones",
      "Low sugar (1%)",
    ],
    associatedPlants: [
      "Blueberry clones",
      "Blackberry genotypes",
      "Specialty hardwood selections",
    ],
    funName: "Winter Chill",
  },
  {
    name: "Micropropagation Trial Media",
    description: `
    For university breeding lines, designed to allow screening for best fit.
    Balanced hormones with growth boosters.
    `,
    keyIngredients: [
      "PhytoBase™ agar",
      "MS salts",
      "Medium cytokinin (1.0 mg/L BAP)",
      "Low auxin (0.1 mg/L NAA)",
      "BioTone™ additive",
    ],
    associatedPlants: [
      "Breeding program crosses",
      "Experimental foliage hybrids",
    ],
    funName: "Trial Blend",
  },
  {
    name: "Endophyte Cleansing Medium",
    description: `
    For difficult explants suspected to harbor endophytes.
    Minimal nutrients, no antimicrobials, relies on vacuum technique pre-treatment.
    `,
    keyIngredients: [
      "Agar powder",
      "Diluted MS salts (25%)",
      "Low sugar",
      "Citric acid buffer pH 5.6",
    ],
    associatedPlants: ["Anthurium seed cultures", "Rare tropical foliage"],
    funName: "Clean Sweep",
  },
  {
    name: "High Multiplication Booster",
    description: `
    Maximizes shoot proliferation rate with optimized hormone balance and organic amino acids.
    For vigorous genotypes in production.
    `,
    keyIngredients: [
      "PhytoBase™ agar",
      "MS salts",
      "High BAP (2.0 mg/L)",
      "Low NAA (0.05 mg/L)",
      "Natural amino acid supplement",
      "Beet sugar 3%",
    ],
    associatedPlants: [
      "Commercial Spathiphyllum lines",
      "High-yield foliage cultivars",
    ],
    funName: "Growth Surge",
  },
  {
    name: "Low Sugar Sensitive Media",
    description: `
    For species prone to contamination or hyperhydricity; sugar reduced to 1.5%.
    `,
    keyIngredients: [
      "Organic agar",
      "MS salts",
      "Low hormone (0.1 mg/L BAP)",
      "Organic cane sugar 1.5%",
    ],
    associatedPlants: ["Delicate foliage plants", "Newly initiated cultures"],
    funName: "Lean & Clean",
  },
  {
    name: "Plant Defense Blend",
    description: `
    Contains seaweed extracts and chitosan to boost plant immunity during culture.
    `,
    keyIngredients: [
      "PhytoBase™ agar",
      "MS salts",
      "Seaweed extract",
      "Chitosan solution",
      "BioTone™",
    ],
    associatedPlants: [
      "Plants prone to fungal contamination",
      "High-value breeding lines",
    ],
    funName: "Immunity Shield",
  },
  {
    name: "pH Adjustment Mix",
    description: `
    Formulated to maintain precise pH using natural buffers like citric acid and lime.
    `,
    keyIngredients: [
      "Organic agar",
      "MS salts",
      "Citric acid powder",
      "Lime powder",
    ],
    associatedPlants: ["Sensitive species needing tight pH control"],
    funName: "Balance Buffer",
  },
  {
    name: "Carbohydrate Variation Media",
    description: `
    Experimentation media varying cane sugar and beet sugar sources.
    Helps determine best carbohydrate source for specific genotypes.
    `,
    keyIngredients: [
      "Organic agar",
      "MS salts",
      "Organic cane sugar or beet sugar",
    ],
    associatedPlants: ["Diverse foliage species", "Experimental lines"],
    funName: "Sweet Choice",
  },
  {
    name: "Vitamin Enhanced Media",
    description: `
    Media fortified with fermentation-derived vitamin mixes to support robust growth.
    `,
    keyIngredients: [
      "PhytoBase™ agar",
      "MS salts",
      "Vitamin mix from fermentation",
      "Natural amino acids",
    ],
    associatedPlants: [
      "Slow growers needing nutrient boost",
      "Hard to culture genotypes",
    ],
    funName: "VitaGrow",
  },
];
