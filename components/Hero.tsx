"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import LetterReveal from "./LetterReveal";
import LogoReveal from "./LogoReveal";

const WEDDING_DATE = "2026-09-15T15:00:00";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Hero() {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showContent, setShowContent] = useState(false);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const rotateX = useTransform(scrollY, [0, 500], [0, 30]);

  useEffect(() => {
    // Start content animation after logo reveal completes
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const weddingDate = new Date(WEDDING_DATE);

    const updateCountdown = () => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Logo Reveal Animation - Shows first */}
      <LogoReveal>
        <span className="font-script text-2xl text-accent tracking-widest">S & A</span>
      </LogoReveal>

      {/* Main Content - Shows after logo reveal */}
      {showContent && (
        <>
          {/* Parallax Background Elements */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute inset-0 bg-gradient-to-b from-background via-primary/50 to-background" 
          />
          <motion.div 
            style={{ y: y2 }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(212,175,55,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_80%_20%,rgba(22,33,62,0.5)_0%,transparent_50%)]" 
          />

          {/* Floating Hearts Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0, 
                  x: 0,
                  y: 400
                }}
                animate={{ 
                  opacity: [0, 0.6, 0],
                  y: -100,
                  x: Math.sin(i * 1.5) * 80,
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  delay: i * 1.2,
                  ease: "linear"
                }}
                className="absolute text-accent/20 text-2xl"
                style={{ left: `${15 + i * 15}%` }}
              >
                ♥
              </motion.div>
            ))}
          </div>

          {/* Content with 3D Transform */}
          <motion.div
            style={{ 
              opacity,
              scale,
              rotateX,
              transformStyle: "preserve-3d"
            }}
            className="relative z-10 text-center px-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="inline-block px-8 md:px-16 py-10 md:py-14 border border-accent/30 bg-card-bg/30 backdrop-blur-sm relative"
              style={{ transformStyle: "preserve-3d", transform: "translateZ(0)" }}
            >
              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-accent" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-accent" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-accent" />

              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="block text-xs tracking-[0.4em] uppercase text-accent mb-5"
              >
                You Are Invited To The Wedding Of
              </motion.span>

              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-normal leading-tight mb-8" style={{ transformStyle: "preserve-3d" }}>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                  className="block"
                >
                  <LetterReveal
                    text="Sophia"
                    direction="left-to-right"
                    delay={0.6}
                    duration={0.08}
                    letterClassName="text-5xl md:text-7xl lg:text-8xl"
                  />
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                  className="block font-script text-4xl md:text-6xl text-accent my-2"
                >
                  &
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8, duration: 1.2 }}
                  className="block"
                >
                  <LetterReveal
                    text="Alexander"
                    direction="right-to-left"
                    delay={2.4}
                    duration={0.08}
                    letterClassName="text-5xl md:text-7xl lg:text-8xl"
                  />
                </motion.span>
              </h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, duration: 1 }}
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
                transition={{ delay: 4.5, duration: 1 }}
                className="text-sm text-text-secondary tracking-wide"
              >
                Grand Ballroom, Ritz Carlton • New York City
              </motion.p>

              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 5, duration: 1 }}
                className="mt-10 pt-8 border-t border-accent/20"
              >
                <p className="text-xs tracking-[0.3em] uppercase text-text-secondary mb-4">
                  Countdown to Our Big Day
                </p>
                <div className="flex justify-center gap-3 md:gap-6">
                  {[
                    { value: countdown.days, label: "Days" },
                    { value: countdown.hours, label: "Hours" },
                    { value: countdown.minutes, label: "Minutes" },
                    { value: countdown.seconds, label: "Seconds" },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <motion.div
                        key={`${item.label}-${item.value}`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-14 md:w-16 h-14 md:h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-2"
                      >
                        <span className="font-heading text-xl md:text-2xl text-accent">
                          {String(item.value).padStart(2, '0')}
                        </span>
                      </motion.div>
                      <span className="text-xs tracking-widest text-text-secondary uppercase">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.5, duration: 1 }}
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
        </>
      )}
    </section>
  );
}
