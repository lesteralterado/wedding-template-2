"use client";

import { motion } from "framer-motion";
import Floral from "./Floral";

export default function Footer() {
  return (
    <footer className="py-20 relative">
      {/* Top Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Closing card: the couple framed in the floral oval */}
      <div className="relative w-[78vw] max-w-[340px] aspect-[480/640] mx-auto text-center">
        <Floral variant="oval-frame" className="absolute inset-0" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-[22%] pb-[16%]"
        >
          <div className="flex flex-col items-center">
            <span className="font-heading text-2xl md:text-3xl">Cherilyn</span>
            <span className="font-script text-xl text-accent">&</span>
            <span className="font-heading text-2xl md:text-3xl">Lester</span>
          </div>

          <p className="text-sm text-text-secondary italic text-balance">
            Thank you for being part of our special day
          </p>

          <div className="font-script text-xl text-accent">
            February 07, 2027
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
