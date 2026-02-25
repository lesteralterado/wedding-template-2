"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/50 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(212,175,55,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_80%_20%,rgba(22,33,62,0.5)_0%,transparent_50%)]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="inline-block px-8 md:px-16 py-10 md:py-14 border border-accent/30 bg-card-bg/30 backdrop-blur-sm relative"
        >
          {/* Corner Decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-accent" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-accent" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-accent" />

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="block text-xs tracking-[0.4em] uppercase text-accent mb-5"
          >
            You Are Invited To The Wedding Of
          </motion.span>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-normal leading-tight mb-8">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="block"
            >
              Sophia
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="block font-script text-4xl md:text-6xl text-accent my-2"
            >
              &
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="block"
            >
              Alexander
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center justify-center gap-5 mb-4"
          >
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-accent" />
            <span className="text-lg md:text-xl font-heading tracking-widest text-text-secondary">
              September 15, 2026
            </span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-accent" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-sm text-text-secondary tracking-wide"
          >
            Grand Ballroom, Ritz Carlton • New York City
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-text-secondary">
          Scroll
        </span>
        <div className="w-5 h-8 border border-accent/50 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-accent rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
