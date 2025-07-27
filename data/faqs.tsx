import { ReactNode } from "react";

export interface FAQItem {
  q: string;
  a: ReactNode;
}

const faqs: FAQItem[] = [
  {
    q: "🌱 What is XPlant?",
    a: (
      <>
        XPlant is a community-driven platform and shop focused on{" "}
        <strong>organic plant tissue culture</strong> and sustainable
        propagation. We make kits, tools, and guides so anyone—from hobbyists to
        schools— can grow plants in clean, eco-friendly ways without a full lab.
        <br />
        <br />
        Our shop curates organic culture media, growth boosters, jars, and
        starter kits, with a vision to make plant science accessible and
        inspiring.
      </>
    ),
  },
  {
    q: "How do I start with plant tissue culture?",
    a: (
      <>
        Begin with our{" "}
        <a
          href="/guide/intro-to-tissue-culture"
          className="text-futureLime underline hover:text-mossShadow"
        >
          Intro to Tissue Culture Guide
        </a>
        . It walks you through creating a clean workspace, preparing organic
        media, taking explants, and growing your first plantlets at home.
      </>
    ),
  },
  {
    q: "Do I need a laboratory?",
    a: (
      <>
        Not at all. One of our main goals is to show you how to grow plantlets
        with a clean table, simple tools, and good habits—no expensive equipment
        required.
      </>
    ),
  },
  {
    q: "What comes in the XPlant Starter Kit?",
    a: (
      <>
        Our Starter Kit includes everything you need: organic agar, MS-based
        nutrients, growth hormones, and step-by-step guides. It’s designed for
        small-scale experiments at home or in classrooms.
      </>
    ),
  },
  {
    q: "What are additives like XBoost™ or BioTone™?",
    a: (
      <>
        These are optional boosters you can mix into your culture medium to help
        plantlets grow faster, root more easily, or resist contamination. Think
        of them as natural “vitamins” for your cultures.
      </>
    ),
  },
  {
    q: "Can kids or schools use XPlant kits?",
    a: (
      <>
        Yes! Our kits are designed for education and creativity. They are safe
        to use under adult supervision and make an excellent STEM learning
        project.
      </>
    ),
  },
  {
    q: "Is this eco-friendly?",
    a: (
      <>
        Absolutely. We use <strong>plant-based ingredients</strong>, recyclable
        packaging, and emphasize low-waste methods so plant science can grow
        alongside environmental care.
      </>
    ),
  },
  {
    q: "Where do you ship?",
    a: (
      <>
        Currently, we ship throughout South Korea. International shipping is
        being prepared—sign up for our newsletter to get notified.
      </>
    ),
  },
  {
    q: "How do I care for my cultures?",
    a: (
      <>
        Cultures need indirect light, stable room temperatures (20–25&nbsp;°C),
        and patience. Avoid opening jars frequently and let nature do its thing.
      </>
    ),
  },
  {
    q: "Do I need to be a scientist to do this?",
    a: (
      <>
        Not at all! XPlant is for anyone curious about plants. We provide
        easy-to-follow guides and community support, no lab coat needed.
      </>
    ),
  },
  {
    q: "How can I support XPlant?",
    a: (
      <>
        Join the community, try a kit, share your results, and spread the word!
        Every purchase supports the growth of open, sustainable plant science.
      </>
    ),
  },
  {
    q: "Still have questions?",
    a: (
      <>
        Reach out anytime at{" "}
        <a href="mailto:hello@xplant.kr" className="underline">
          hello@shmaplex.com
        </a>
        .
      </>
    ),
  },
];

export default faqs;
