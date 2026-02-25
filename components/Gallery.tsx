"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "./SectionHeader";

const images = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1511285560982-1356c11d4606?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1522673607200-1645062cd958?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=600&fit=crop",
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader tag="Memories" title="Our Gallery" />

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square overflow-hidden group cursor-pointer"
            >
              <Image
                src={src}
                alt={`Wedding photo ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
