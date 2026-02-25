"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  enable3D?: boolean;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = "",
  enable3D = false,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // 3D parallax effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { damping: 20, stiffness: 100 });
  const springY = useSpring(y, { damping: 20, stiffness: 100 });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      rotateX: enable3D ? 15 : 0,
      rotateY: enable3D ? -15 : 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
      style={{ 
        perspective: enable3D ? "1000px" : undefined,
        transformStyle: enable3D ? "preserve-3d" : undefined,
      }}
    >
      <motion.div
        style={{ 
          transform: enable3D ? "translateZ(30px)" : undefined,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
