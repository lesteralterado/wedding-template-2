"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// The door artwork is 736x1308; the wax seal sits on the right door at this spot.
const ART_RATIO = "736 / 1308";
const SEAL = { left: "49.7%", top: "52.75%", size: "26%" };

// Heavy, door-like ease: slow to start, glides to a stop.
const EASE_DOOR = [0.65, 0, 0.2, 1] as const;
const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

const DOOR_DURATION = 2.4;
const SEAL_BREAK = 0.45; // pause on the seal before the doors move
const HOLD_AFTER_OPEN = 2.4; // time to read the names before entering the site

type Phase = "loading" | "closed" | "opening" | "open";

const IntroContext = createContext(true);

/** True once the guest has opened the doors and the intro has left the screen. */
export const useIntroDone = () => useContext(IntroContext);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => setDone(true), []);

  return (
    <IntroContext.Provider value={done}>
      {children}
      <AnimatePresence>{!done && <IntroGate onFinish={finish} />}</AnimatePresence>
    </IntroContext.Provider>
  );
}

function IntroGate({ onFinish }: { onFinish: () => void }) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("loading");
  const loaded = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const isOpening = phase === "opening" || phase === "open";

  // Lock the page behind the gate and always start the site from the top.
  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    window.scrollTo(0, 0);
    const pending = timers.current;
    return () => {
      html.style.overflow = previous;
      pending.forEach(clearTimeout);
    };
  }, []);

  // Show the doors once the artwork is decoded; never leave guests on a blank screen.
  useEffect(() => {
    const fallback = setTimeout(() => setPhase((p) => (p === "loading" ? "closed" : p)), 3500);
    return () => clearTimeout(fallback);
  }, []);

  const handleLoad = () => {
    loaded.current += 1;
    if (loaded.current >= 3) setPhase((p) => (p === "loading" ? "closed" : p));
  };

  const open = () => {
    if (phase === "open") {
      onFinish();
      return;
    }
    if (phase !== "closed") return;
    setPhase("opening");
    const doorsDone = (reduceMotion ? 0.8 : SEAL_BREAK + DOOR_DURATION) * 1000;
    timers.current.push(
      setTimeout(() => setPhase("open"), doorsDone),
      setTimeout(onFinish, doorsDone + HOLD_AFTER_OPEN * 1000)
    );
  };

  const doorTransition = reduceMotion
    ? { duration: 0.8, ease: EASE_SOFT }
    : {
        duration: DOOR_DURATION,
        delay: SEAL_BREAK,
        ease: EASE_DOOR,
        times: [0, 0.12, 1],
        // Stay solid while swinging; only dissolve once the door is nearly edge-on.
        opacity: { duration: DOOR_DURATION, delay: SEAL_BREAK, ease: "easeIn", times: [0, 0.8, 1] },
      };

  const door = (side: "left" | "right") => {
    const dir = side === "left" ? 1 : -1;
    return (
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: `${side} center`, willChange: "transform, opacity" }}
        initial={false}
        animate={
          isOpening
            ? reduceMotion
              ? { opacity: 0 }
              : {
                  // A small push before the swing makes the doors feel weighty.
                  rotateY: [0, -1.5 * dir, 88 * dir],
                  x: ["0%", "0%", `${-4 * dir}%`],
                  opacity: [1, 1, 0],
                }
            : { rotateY: 0, x: "0%", opacity: 1 }
        }
        transition={doorTransition}
      >
        <Image
          src={`/intro/door-${side}.webp`}
          alt=""
          fill
          preload
          unoptimized
          sizes="100vw"
          draggable={false}
          onLoad={handleLoad}
          className="object-cover select-none"
        />
        {/* Shade the door as it turns away from the light, masked to the door's own shape */}
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-[#3b2f20]"
          style={{
            maskImage: `url(/intro/door-${side}.webp)`,
            WebkitMaskImage: `url(/intro/door-${side}.webp)`,
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
          }}
          initial={false}
          animate={{ opacity: isOpening && !reduceMotion ? 0.35 : 0 }}
          transition={{ duration: DOOR_DURATION, delay: SEAL_BREAK, ease: EASE_DOOR }}
        />
      </motion.div>
    );
  };

  return (
    <motion.div
      key="intro-gate"
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation"
      className="fixed inset-0 z-[100] overflow-hidden bg-[#f3ece1]"
      exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }}
      transition={{ duration: 1.1, ease: EASE_SOFT }}
    >
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

      {/* Stage: full screen on phones, a phone-shaped column on tablets and desktops */}
      <div className="relative mx-auto h-full w-full md:w-auto md:aspect-[736/1308] md:shadow-[0_0_80px_rgba(59,47,32,0.25)] [container-type:size]">
        {/* Background arch, revealed behind the doors */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={false}
          animate={{ scale: isOpening && !reduceMotion ? 1 : 1.12 }}
          transition={{ duration: DOOR_DURATION + 0.6, delay: SEAL_BREAK, ease: EASE_SOFT }}
        >
          <Image
            src="/intro/arch.webp"
            alt=""
            fill
            preload
            unoptimized
            sizes="100vw"
            onLoad={handleLoad}
            className="object-cover"
          />
        </motion.div>

        {/* Warm light spilling through the gap as the doors part */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,244,214,0.95)_0%,rgba(255,236,190,0.35)_35%,transparent_70%)]"
          initial={false}
          animate={isOpening && !reduceMotion ? { opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={{ duration: DOOR_DURATION, delay: SEAL_BREAK + 0.2, ease: "easeInOut", times: [0, 0.35, 1] }}
        />

        {/* Names inside the arch */}
        <div className="absolute inset-0 flex items-center justify-center px-[14%] pb-[6%] pointer-events-none">
          <div className="text-center">
            {[
              <span key="tag" className="block text-[10px] sm:text-xs tracking-[0.35em] uppercase text-accent">
                You are invited to the wedding of
              </span>,
              <span key="names" className="block font-script text-[clamp(2.75rem,13cqw,4.5rem)] leading-[1.1] text-text-primary my-4">
                Sophia
                <span className="block text-accent text-[0.6em] my-1">&amp;</span>
                Alexander
              </span>,
              <span key="date" className="flex items-center justify-center gap-3 font-heading text-lg tracking-[0.2em] text-text-secondary">
                <span className="w-8 h-px bg-gradient-to-r from-transparent to-accent" />
                15 · 09 · 2026
                <span className="w-8 h-px bg-gradient-to-l from-transparent to-accent" />
              </span>,
            ].map((line, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={isOpening ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 16, filter: "blur(6px)" }}
                transition={{
                  duration: 1.1,
                  delay: isOpening ? (reduceMotion ? 0.4 : SEAL_BREAK + 1.5) + i * 0.3 : 0,
                  ease: EASE_SOFT,
                }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Door artwork, scaled like object-cover so the seal hotspot stays aligned */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(100cqw,calc(100cqh*736/1308))]"
          style={{ aspectRatio: ART_RATIO }}
        >
        <motion.div
          className="absolute inset-0"
          style={{ perspective: "1400px" }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={phase === "loading" ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE_SOFT }}
        >
          {door("left")}
          {door("right")}

          {/* Seal: idle pulse, then a gold ring as it "breaks" */}
          <div
            aria-hidden
            className="absolute -translate-x-1/2 -translate-y-1/2 aspect-square pointer-events-none"
            style={{ left: SEAL.left, top: SEAL.top, width: SEAL.size }}
          >
            {phase === "closed" && (
              <motion.span
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(232,213,168,0.7)_0%,rgba(232,213,168,0)_70%)]"
                animate={{ scale: [0.9, 1.35, 0.9], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            {isOpening && !reduceMotion && (
              <>
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-accent-light"
                  initial={{ scale: 0.7, opacity: 0.9 }}
                  animate={{ scale: 2.6, opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,250,235,1)_0%,rgba(255,240,200,0)_65%)]"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1.8, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </>
            )}
          </div>
        </motion.div>
        </div>

        {/* Hint */}
        <AnimatePresence>
          {phase === "closed" && (
            <motion.div
              className="absolute inset-x-0 flex justify-center pointer-events-none"
              style={{ bottom: "calc(env(safe-area-inset-bottom) + 2.5rem)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE_SOFT }}
            >
              <motion.span
                className="rounded-full bg-white/60 backdrop-blur-sm px-5 py-2.5 text-[10px] tracking-[0.35em] uppercase text-text-primary shadow-sm"
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                Tap to open
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={open}
          aria-label={phase === "open" ? "Enter the website" : "Open the invitation"}
          className="absolute inset-0 z-10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
          style={{ WebkitTapHighlightColor: "transparent" }}
        />
      </div>
    </motion.div>
  );
}
