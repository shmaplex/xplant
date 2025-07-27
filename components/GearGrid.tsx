"use client";
import Image from "next/image";

export default function GearGrid() {
  const gear = [
    { name: "Stackable Worm Bin", link: "#", img: "/img/bin.jpg" },
    { name: "Moisture + pH Meter", link: "#", img: "/img/meter.jpg" },
    { name: "Coconut Coir Bedding", link: "#", img: "/img/coir.jpg" },
  ];

  return (
    <section className="space-y-6 text-center">
      <h2 className="text-3xl font-bold">Recommended Gear</h2>
      <p className="max-w-xl mx-auto text-[#555] text-base sm:text-lg">
        Everything I use in my bin — tested, reliable, compost-approved.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {gear.map((item, i) => (
          <a
            key={i}
            href={item.link}
            className="bg-[#ECE7DB] rounded-xl p-4 shadow hover:shadow-md transition"
          >
            <Image
              src={item.img}
              alt={item.name}
              width={400}
              height={200}
              className="rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}
