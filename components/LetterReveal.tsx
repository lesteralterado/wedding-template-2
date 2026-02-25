"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LetterRevealProps {
  text: string;
  direction?: "left-to-right" | "right-to-left";
  className?: string;
  letterClassName?: string;
  delay?: number;
  duration?: number;
}

export default function LetterReveal({
  text,
  direction = "left-to-right",
  className = "",
  letterClassName = "",
  delay = 0,
  duration = 0.05,
}: LetterRevealProps) {
  const letters = text.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: duration,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotateY: direction === "left-to-right" ? -90 : 90,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`inline-block ${className}`}
      style={{ perspective: "1000px" }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className={`inline-block ${letterClassName}`}
          style={{ display: "inline-block", transformStyle: "preserve-3d" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
