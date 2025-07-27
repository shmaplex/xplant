"use client";
export default function Testimonials() {
  const quotes = [
    {
      quote:
        "I started composting because of Dirtman. Now I've got the healthiest plants I've ever had!",
      author: "– Jess, New Mexico",
    },
    {
      quote:
        "I binge-watched every episode in a weekend. I even built my bin with scraps from my garage.",
      author: "– Aiden, Toronto",
    },
    {
      quote:
        "It's nerdy, calming, and weirdly addictive. I never thought I'd care this much about worms.",
      author: "– Clara, Seoul",
    },
  ];

  return (
    <section className="px-6 sm:px-10 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url(/png/asfalt-light.png)] mix-blend-multiply bg-repeat h-full opacity-50 invert pointer-events-none"></div>
      <div className="relative z-1 text-center space-y-10">
        <h2 className="text-3xl font-bold">What People Are Saying</h2>
        <div className="grid gap-6 md:grid-cols-3 text-sm sm:text-base">
          {quotes.map((item, i) => (
            <blockquote
              key={i}
              className="bg-white p-10 rounded-md border border-[#D6CBB1] shadow"
            >
              <p>“{item.quote}”</p>
              <cite className="block mt-2 text-[#5C5138]">{item.author}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
