"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect, type ReactNode } from "react";
import { EASE_SOFT, REVEAL_DELAY, STAGE_CLASS, useIntro } from "./IntroGate";

const WEDDING_DATE = "2027-07-15T15:00:00";

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
  const { revealed, done } = useIntro();
  const reduceMotion = useReducedMotion();
  const baseDelay = reduceMotion ? 0.3 : REVEAL_DELAY;

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
    <section id="hero" className="relative h-[100svh] overflow-hidden bg-[#f4ebdf]">
      {/* Larger screens: blurred arch fills the space around the portrait stage */}
      <div aria-hidden className="absolute inset-0 hidden md:block">
        <Image
          src="/intro/arch.webp"
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover scale-110 blur-2xl opacity-80"
        />
        <div className="absolute inset-0 bg-[#f3ece1]/40" />
      </div>

      <div className={`${STAGE_CLASS} overflow-hidden [container-type:size] md:shadow-[0_0_80px_rgba(59,47,32,0.25)]`}>
        {/* The arch eases back into place as the doors open, like stepping through them */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ scale: revealed && !reduceMotion ? 1 : 1.12 }}
          transition={{ duration: 3, delay: 0.45, ease: EASE_SOFT }}
        >
          <Image
            src="/intro/arch.webp"
            alt=""
            fill
            preload
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Invitation inside the arch */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-[12%] pt-[6cqh] pb-[4cqh]">
          <RevealLine revealed={revealed} baseDelay={baseDelay} step={0}>
            <span className="block text-[10px] sm:text-xs tracking-[0.35em] uppercase text-accent text-balance">
              You are invited to the wedding of
            </span>
          </RevealLine>

          <h1 className="font-script font-normal text-text-primary leading-[1.05] my-[2.5cqh] text-[min(14cqw,7.5cqh)]">
            <RevealLine revealed={revealed} baseDelay={baseDelay} step={1}>Cherilyn</RevealLine>
            <RevealLine revealed={revealed} baseDelay={baseDelay} step={1.5} className="text-accent text-[0.6em] my-1">
              &amp;
            </RevealLine>
            <RevealLine revealed={revealed} baseDelay={baseDelay} step={2}>Lester</RevealLine>
          </h1>

          <RevealLine revealed={revealed} baseDelay={baseDelay} step={2.6} className="w-[46cqw] max-w-[220px] -mt-[1cqh] mb-[1.5cqh]">
            <Image src="/floral/swag.webp" alt="" width={640} height={170} unoptimized className="w-full h-auto" />
          </RevealLine>

          <RevealLine revealed={revealed} baseDelay={baseDelay} step={3} className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-accent" />
            <span className="font-heading text-lg tracking-[0.2em] text-text-secondary">
              February 07, 2027
            </span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-accent" />
          </RevealLine>

          <RevealLine revealed={revealed} baseDelay={baseDelay} step={3.4}>
            <p className="text-[11px] tracking-wide text-text-secondary">
              Grand Ballroom, Ritz Carlton • New York City
            </p>
          </RevealLine>

          <RevealLine revealed={revealed} baseDelay={baseDelay} step={4} className="mt-[4cqh]">
            <div className="flex justify-center gap-2.5">
              {[
                { value: countdown.days, label: "Days" },
                { value: countdown.hours, label: "Hours" },
                { value: countdown.minutes, label: "Mins" },
                { value: countdown.seconds, label: "Secs" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="w-14 py-2 bg-white/45 backdrop-blur-[2px] border border-accent/20 rounded-md"
                >
                  <span className="block font-heading text-2xl leading-none text-accent">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="block mt-1 text-[9px] tracking-[0.2em] uppercase text-text-secondary">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </RevealLine>
        </div>

        {/* Scroll hint, once the doors are gone */}
        <motion.div
          initial={false}
          animate={{ opacity: done ? 1 : 0 }}
          transition={{ duration: 1, delay: done ? 0.8 : 0 }}
          className="absolute inset-x-0 flex flex-col items-center gap-2 pointer-events-none"
          style={{ bottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-text-secondary">Scroll</span>
          <div className="w-5 h-8 border border-accent/50 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-accent rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Each line rises into place one after another as the doors part.
function RevealLine({
  step,
  revealed,
  baseDelay,
  children,
  className = "",
}: {
  step: number;
  revealed: boolean;
  baseDelay: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={false}
      animate={revealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 16, filter: "blur(6px)" }}
      transition={{ duration: 1.1, delay: revealed ? baseDelay + step * 0.3 : 0, ease: EASE_SOFT }}
    >
      {children}
    </motion.div>
  );
}
