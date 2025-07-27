import { ReactNode } from "react";

export interface FAQItem {
  q: string;
  a: ReactNode;
}

const faqs: FAQItem[] = [
  {
    q: "🪱 What is Dirtman Diaries and Farm?",
    a: (
      <>
        Dirtman Diaries is a journey into the world of worm composting,
        sustainable living, and all things earthy. From weekly bin checks to
        bokashi experiments and deep dives on soil health, it&rsquo;s your go-to
        source for getting dirty — in the best way possible.
        <br />
        <br />
        Dirtman Worm &amp; Root Supply is our shop, studio, and testing ground —
        where the lessons from the diaries come to life. We make and sell
        small-batch tools, vermicomposting kits, natural soil boosters, and
        other useful things for people who want to grow better and waste less.
      </>
    ),
  },
  {
    q: "How do I start worm composting?",
    a: (
      <>
        Check out our{" "}
        <a
          href="/guide/worm-bin"
          className="text-[#5C5138] underline hover:text-[#403a2b]"
        >
          Worm Bin Setup Guide
        </a>
        . It walks you through everything from bin selection to bedding,
        feeding, and long-term care.
      </>
    ),
  },
  {
    q: "What kind of worms should I use?",
    a: (
      <>
        Red Wigglers (Eisenia fetida) are the most popular choice for home
        composting. They&rsquo;re hardy, efficient, and love decaying organic
        matter.
      </>
    ),
  },
  {
    q: "Can I keep my worm bin indoors?",
    a: (
      <>
        Absolutely. Worm bins are odor-free when maintained properly and can
        live comfortably under your sink, in a closet, or anywhere that&rsquo;s
        not too hot or cold.
      </>
    ),
  },
  {
    q: "How can I support the project?",
    a: (
      <>
        We&rsquo;re glad you asked! Soon you&rsquo;ll be able to buy compost
        kits, merch, and maybe even sponsor worms. For now, just follow along,
        share, and stay dirty.
      </>
    ),
  },
  {
    q: "How are live worms shipped?",
    a: (
      <>
        We ship live worms Monday through Friday, packed with care in breathable
        bedding. We only ship domestically within South Korea using CJ Logistics
        or Korea Post.
      </>
    ),
  },
  {
    q: "What should I do when my worms arrive?",
    a: (
      <>
        Open the package immediately and transfer the worms into their prepared
        bin. Give them time to adjust and avoid feeding for the first day or
        two.
      </>
    ),
  },
  {
    q: "What do worms eat?",
    a: (
      <>
        Worms love fruit and veggie scraps, coffee grounds, eggshells, and
        shredded paper. Avoid meat, dairy, citrus, oily foods, and anything
        salty or spicy.
      </>
    ),
  },
  {
    q: "How many worms do I need to start?",
    a: (
      <>
        For most households, 500g to 1kg of Red Wigglers is enough to get
        started. The size of your bin and the amount of food waste you generate
        can guide this.
      </>
    ),
  },
  {
    q: "Do worm bins smell bad?",
    a: (
      <>
        Not at all! A healthy worm bin smells like fresh earth. Odors are
        usually a sign of overfeeding or too much moisture.
      </>
    ),
  },
  {
    q: "What temperature is best for worms?",
    a: (
      <>
        Worms thrive between 15&deg;C and 25&deg;C. Keep your bin out of direct
        sunlight and protect it from freezing in the winter.
      </>
    ),
  },
  {
    q: "Can I use worm castings right away?",
    a: (
      <>
        Yes! Worm castings are ready to use once they&rsquo;re dark, crumbly,
        and free of visible food scraps.
      </>
    ),
  },
  {
    q: "Do you offer bulk worm orders?",
    a: (
      <>
        We&rsquo;re working on it! If you&rsquo;re interested in larger
        quantities for a school, farm, or community garden, send us a message at{" "}
        <a href="mailto:dirtmandiaries@gmail.com" className="underline">
          dirtmandiaries@gmail.com
        </a>
        .
      </>
    ),
  },
  {
    q: "Still have questions?",
    a: (
      <>
        Reach out anytime at{" "}
        <a href="mailto:dirtmandiaries@gmail.com" className="underline">
          dirtmandiaries@gmail.com
        </a>{" "}
        or call{" "}
        <a href="tel:+821042012407" className="underline">
          +82 010-4201-2407
        </a>
        .
      </>
    ),
  },
];

export default faqs;
