"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "./SectionHeader";

const stories = [
  {
    year: "2020",
    title: "First Meeting",
    text: "It was a rainy afternoon at a small coffee shop in Brooklyn. Sophia was reading her favorite book when Alexander accidentally spilled his coffee. That moment sparked a conversation that lasted for hours, and neither of them wanted it to end.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop",
  },
  {
    year: "2022",
    title: "The Proposal",
    text: "On a perfect summer evening, Alexander arranged a private dinner on the rooftop where they had their first date. Under the stars and surrounded by fairy lights, he got down on one knee. Sophia said yes before he could even finish the question.",
    image: "https://images.unsplash.com/photo-1511285560982-1356c11d4606?w=600&h=800&fit=crop",
  },
];

export default function Story() {
  return (
    <section id="story" className="py-24 md:py-32 relative">
      {/* Top Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader tag="Our Love Story" title="How We Met" />

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {stories.map((story, index) => (
            <StoryCard key={index} story={story} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryCard({
  story,
  index,
}: {
  story: { year: string; title: string; text: string; image: string };
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={`${index % 2 === 1 ? "md:mt-16" : ""}`}
    >
      <div className="relative mb-8 overflow-hidden group">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[3/4]"
        >
          <Image
            src={story.image}
            alt={story.title}
            fill
            className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-600"
          />
        </motion.div>
        {/* Frame */}
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-accent/50 pointer-events-none group-hover:top-6 group-hover:left-6 group-hover:right-6 group-hover:bottom-6 transition-all duration-500" />
      </div>

      <div className="text-center md:text-left">
        <span className="font-script text-3xl text-accent block mb-2">
          {story.year}
        </span>
        <h3 className="font-heading text-2xl md:text-3xl mb-4">{story.title}</h3>
        <p className="text-text-secondary leading-relaxed">{story.text}</p>
      </div>
    </motion.div>
  );
}
