"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LogoRevealProps {
  children: ReactNode;
  className?: string;
}

export default function LogoReveal({ children, className = "" }: LogoRevealProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 50,
        position: "fixed",
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        position: "relative",
        top: "auto",
        left: "auto",
        x: 0,
        y: 0,
      }}
      transition={{
        duration: 2,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}
