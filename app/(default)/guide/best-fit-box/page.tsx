"use client";

import { mediaTypes } from "@/data/media";
import KeyTerms from "@/components/KeyTerms";
import { shmaplexProducts, ProductKey } from "@/data/catalog";

const accentColors = [
  { badge: "bg-[#6ea420]", header: "bg-[#b7ef48]/30", title: "text-[#6ea420]" },
  {
    badge: "bg-[#8752c8]",
    header: "bg-psybeam-purple/30",
    title: "text-[#3e2b53]",
  },
  {
    badge: "bg-[#2e3f36]",
    header: "bg-moss-shadow/30",
    title: "text-moss-shadow",
  },
  {
    badge: "bg-[#9a978f]",
    header: "bg-spore-grey/40",
    title: "text-biochar-black",
  },
  {
    badge: "bg-[#333333]",
    header: "bg-biochar-black/20",
    title: "text-biochar-black",
  },
  {
    badge: "bg-[#593380]",
    header: "bg-psybeam-purple/40",
    title: "text-[#3e2b53]",
  },
  { badge: "bg-[#5a7c1f]", header: "bg-[#b7ef48]/40", title: "text-[#5a7c1f]" },
  {
    badge: "bg-[#3b4a42]",
    header: "bg-moss-shadow/40",
    title: "text-moss-shadow",
  },
  {
    badge: "bg-[#7f7567]",
    header: "bg-spore-grey/50",
    title: "text-biochar-black",
  },
  {
    badge: "bg-[#1f1f1f]",
    header: "bg-biochar-black/30",
    title: "text-biochar-black",
  },
  {
    badge: "bg-[#6c3ebf]",
    header: "bg-psybeam-purple/50",
    title: "text-[#3e2b53]",
  },
  { badge: "bg-[#46641e]", header: "bg-[#b7ef48]/50", title: "text-[#46641e]" },
  {
    badge: "bg-[#26332b]",
    header: "bg-moss-shadow/50",
    title: "text-moss-shadow",
  },
  {
    badge: "bg-[#80786d]",
    header: "bg-spore-grey/60",
    title: "text-biochar-black",
  },
  {
    badge: "bg-[#121212]",
    header: "bg-biochar-black/40",
    title: "text-biochar-black",
  },
];

function getProductsForFormula(formulaName: string, keyIngredients: string[]) {
  const usedProducts = new Set<ProductKey>();

  if (/PhytoBase/i.test(formulaName))
    usedProducts.add("PhytoBase™ Organic Agar");

  if (/agar/i.test(keyIngredients.join(" ").toLowerCase()))
    usedProducts.add("PhytoBase™ Organic Agar");

  if (/gelzan|gellan/i.test(keyIngredients.join(" ")))
    usedProducts.add("PhytoGelzan™ Plant-Based Gelling Agent");

  if (/cytokinin|BAP/i.test(keyIngredients.join(" ")))
    usedProducts.add("ShootRise™ Organic Cytokinin Extract");
  if (/auxin|NAA|IBA/i.test(keyIngredients.join(" ")))
    usedProducts.add("RootFlow™ Natural Auxin Extract");

  if (
    /amino acid|amino acids|hydrolysate/i.test(
      keyIngredients.join(" ").toLowerCase()
    )
  )
    usedProducts.add("PhytoAmino™ Plant Hydrolysate");

  if (/citric acid|buffer/i.test(keyIngredients.join(" ").toLowerCase()))
    usedProducts.add("BioBuffer™ Natural pH Kit");

  if (
    /compost|bio-tone|bioferments|bio-tea/i.test(
      keyIngredients.join(" ").toLowerCase()
    )
  )
    usedProducts.add("BioTea™ Compost Extract");

  if (/xboost/i.test(keyIngredients.join(" ").toLowerCase()))
    usedProducts.add("XBoost™");

  if (/biotone/i.test(keyIngredients.join(" ").toLowerCase()))
    usedProducts.add("BioTone™");

  if (/mycolift/i.test(keyIngredients.join(" ").toLowerCase()))
    usedProducts.add("MycoLift™");

  if (/pureshield/i.test(keyIngredients.join(" ").toLowerCase()))
    usedProducts.add("PureShield™");

  if (/vitaburst|vitamin/i.test(keyIngredients.join(" ")))
    usedProducts.add("VitaBurst™ Organic Vitamin Complex");

  return Array.from(usedProducts);
}

export default function BestFitBoxPage() {
  // Only show the first 15 fully organic formulas
  const organicMedia = mediaTypes.slice(0, 15);

  return (
    <main className="flex-1 max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-12">
        XPlant Tissue Culture Media Guide
      </h1>
      <p className="mb-12 max-w-prose leading-relaxed text-moss-shadow">
        Inspired by proven lab protocols and refined through our own organic
        methods, this guide outlines 15 core media types that support clean,
        reliable plant tissue culture. The “best fit box” philosophy lets the
        plant lead, adapting these recipes across genera and genotypes.
      </p>

      <KeyTerms />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {organicMedia.map(
          (
            { name, description, keyIngredients, associatedPlants, funName },
            i
          ) => {
            const color = accentColors[i];
            const productsUsed = getProductsForFormula(name, keyIngredients);

            return (
              <section
                key={i}
                className="relative rounded-2xl overflow-hidden shadow-md border border-spore-grey/50 hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 flex flex-col"
              >
                <div
                  className={`absolute top-0 left-0 ${color.badge} text-white text-xs font-bold px-3 py-1 rounded-br-lg`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className={`${color.header} px-6 pt-10 pb-4`}>
                  <h2 className={`text-xl font-bold mb-1 ${color.title}`}>
                    {name}
                  </h2>
                  <p className="text-moss-shadow text-sm italic">{funName}</p>
                </div>

                <div className="bg-white/85 flex-1 px-6 py-6 flex flex-col justify-between">
                  <div>
                    <p className="mb-4 text-sm leading-relaxed">
                      {description.trim()}
                    </p>

                    <div className="text-sm">
                      <h3 className="font-semibold mb-1 text-moss-shadow">
                        Key Ingredients
                      </h3>
                      <ul className="list-disc list-inside mb-4 text-moss-shadow/90">
                        {keyIngredients.map((ing, idx) => (
                          <li key={idx}>{ing}</li>
                        ))}
                      </ul>

                      <h3 className="font-semibold mb-1 text-moss-shadow">
                        Associated Plants
                      </h3>
                      <ul className="list-disc list-inside text-moss-shadow/90">
                        {associatedPlants.map((plant, idx) => (
                          <li key={idx}>{plant}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {productsUsed.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-spore-grey">
                      <h3 className="text-base font-bold mb-2">
                        Products to Purchase
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-800">
                        {productsUsed.map((prodName) => {
                          const prod = shmaplexProducts.find(
                            (p) => p.name === (prodName as ProductKey)
                          );

                          if (!prod) return null; // skip if product doesn't exist

                          return (
                            <li key={prodName}>
                              <strong>{prod.name}:</strong> {prod.use}{" "}
                              <em className="text-gray-600">
                                (Replaces: {prod.replaces})
                              </em>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            );
          }
        )}
      </div>
    </main>
  );
}
