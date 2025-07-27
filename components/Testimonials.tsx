"use client";

export default function Testimonials() {
  const quotes = [
    {
      quote:
        "XPlant’s organic medium changed the way we start crops. Healthier plants with no synthetic chemicals.",
      author: "– Min-jun, Jeolla Province",
    },
    {
      quote:
        "Finally, a plant growth solution that’s safe, local, and environmentally friendly. This is the future.",
      author: "– Soo-yeon, Seoul",
    },
    {
      quote:
        "We’ve seen incredible growth rates on our pilot farm using XPlant’s natural tissue culture formula.",
      author: "– Daniel, Researcher",
    },
  ];

  return (
    <section className="relative px-6 sm:px-10 overflow-hidden rounded-2xl">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-milk-bio to-spore-grey"></div>

      {/* Texture overlay */}
      <div className="absolute inset-0 z-0 bg-[url(/png/asfalt-light.png)] mix-blend-multiply bg-repeat opacity-15 pointer-events-none"></div>

      <div className="relative z-10 text-center space-y-10 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-biochar-black">
          What People Are Saying
        </h2>
        <div className="grid gap-6 md:grid-cols-3 text-sm sm:text-base">
          {quotes.map((item, i) => (
            <blockquote
              key={i}
              className="bg-milk-bio/80 p-8 rounded-xl border border-spore-grey shadow-sm backdrop-blur-sm"
            >
              <p className="text-biochar-black leading-relaxed">
                “{item.quote}”
              </p>
              <cite className="block mt-3 text-moss-shadow font-medium">
                {item.author}
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
