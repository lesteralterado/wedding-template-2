"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-20 relative">
      {/* Top Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            <span className="font-heading text-2xl md:text-3xl">Cherilyn</span>
            <span className="font-script text-xl text-accent">&</span>
            <span className="font-heading text-2xl md:text-3xl">Lester</span>
          </div>

          <p className="text-text-secondary italic">
            Thank you for being part of our special day
          </p>

          <div className="font-script text-2xl text-accent">
            September 15, 2026
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
