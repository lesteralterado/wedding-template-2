"use client";

import ScrollReveal from "./ScrollReveal";

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
      <div className="flex items-center justify-center gap-4">
        <span className="w-12 h-px bg-gradient-to-r from-transparent to-accent" />
        <span className="text-accent">♥</span>
        <span className="w-12 h-px bg-gradient-to-l from-transparent to-accent" />
      </div>
    </ScrollReveal>
  );
}
