"use client";

import ScrollReveal from "./ScrollReveal";
import Floral from "./Floral";

interface SectionHeaderProps {
  tag: string;
  title: string;
}

export default function SectionHeader({ tag, title }: SectionHeaderProps) {
  return (
    <ScrollReveal className="text-center mb-16 md:mb-20">
      <span className="inline-block text-xs tracking-[0.4em] uppercase text-accent mb-4">
        {tag}
      </span>
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal mb-5 tracking-wide">
        {title}
      </h2>
      <Floral variant="swag" delay={0.3} className="w-44 md:w-56 mx-auto" />
    </ScrollReveal>
  );
}
