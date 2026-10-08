"use client";

import Image from "next/image";
import { useRef, type CSSProperties, type PointerEvent } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

// Both layers are 1600x1066 and share the same framing, so they stack pixel-perfect.
const SCENE_RATIO = "1600 / 1066";
// Where the couple sit in the frame (fraction of the scene width).
const COUPLE_CENTER = 0.57;

// Deterministic pollen field (no Math.random, so server and client render the same).
const POLLEN = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${30 + ((i * 53) % 60)}%`,
  size: 2 + (i % 3),
  duration: `${8 + (i % 5) * 1.6}s`,
  delay: `${-(i * 1.3)}s`,
  drift: `${((i % 2 ? 1 : -1) * (12 + (i * 7) % 30))}px`,
  opacity: 0.35 + (i % 4) * 0.15,
}));

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Full-screen "living photo" of the couple: the cut-out couple and the meadow are
 * separate layers, so the camera can move through them for a real sense of depth.
 */
export default function CoupleMoment() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const shown = inView || !!reduceMotion;

  // Scroll parallax: the far field moves least, the couple moves most.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const farY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const meadowY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const coupleY = useTransform(scrollYProgress, [0, 1], ["5%", "-2%"]);
  const captionY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  // Mouse parallax on desktop: layers shift in opposite directions.
  const pointerX = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const meadowX = useTransform(smoothX, (v) => v * -10);
  const coupleX = useTransform(smoothX, (v) => v * 14);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
  };

  const still = !!reduceMotion;

  // Phones show the couple large at the bottom with the meadow rising above them;
  // wide screens let the scene cover the whole section.
  const sceneStyle = {
    "--w": "max(100cqw, min(150cqh, 175cqw))",
    width: "var(--w)",
    aspectRatio: SCENE_RATIO,
    left: `clamp(calc(100cqw - var(--w)), calc(50cqw - ${COUPLE_CENTER} * var(--w)), 0px)`,
    maskImage: "linear-gradient(to bottom, transparent 0%, #000 22%)",
    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 22%)",
  } as CSSProperties;

  return (
    <section
      ref={ref}
      id="moment"
      aria-label="Cherilyn and Lester"
      onPointerMove={onPointerMove}
      onPointerLeave={() => pointerX.set(0)}
      className="relative h-[100svh] min-h-[560px] overflow-hidden bg-[#b8925a] [container-type:size]"
    >
      {/* Far field: fills the space above the scene on tall phone screens */}
      <motion.div style={still ? undefined : { y: farY }} className="absolute -inset-[8%]">
        <div className={`absolute inset-0 ${still ? "" : "moment-drift"}`}>
          <Image
            src="/moment/meadow.webp"
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="object-cover object-top blur-[6px] scale-110"
          />
        </div>
      </motion.div>

      {/* Scene: meadow plate and couple share one box so they stay aligned */}
      <div className="absolute bottom-0" style={sceneStyle}>
        <motion.div
          style={still ? undefined : { y: meadowY, x: meadowX }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ scale: shown ? 1.12 : 1.3 }}
            transition={{ duration: still ? 0 : 3.2, ease: EASE_SOFT }}
          >
            <div className={`absolute inset-0 ${still ? "" : "moment-drift"}`}>
              <Image src="/moment/meadow.webp" alt="" fill unoptimized sizes="175vw" className="object-cover" />
            </div>
          </motion.div>
        </motion.div>

        {/* The couple: rack focus from soft to sharp as the camera settles */}
        <motion.div
          style={still ? undefined : { y: coupleY, x: coupleX }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0"
            style={{ transformOrigin: `${COUPLE_CENTER * 100}% 100%` }}
            initial={false}
            animate={
              shown
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 1.06, filter: "blur(10px)" }
            }
            transition={{ duration: still ? 0.6 : 2.2, delay: still ? 0 : 0.4, ease: EASE_SOFT }}
          >
            <div className={`absolute inset-0 ${still ? "" : "moment-breathe"}`}>
              <Image
                src="/moment/couple.webp"
                alt="Cherilyn and Lester sitting together in a golden meadow"
                fill
                unoptimized
                sizes="175vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Golden-hour light from the upper right */}
      <div
        aria-hidden
        className={`absolute -top-[20%] -right-[20%] w-[90cqw] h-[90cqw] max-w-[900px] max-h-[900px] rounded-full pointer-events-none mix-blend-screen bg-[radial-gradient(circle,rgba(255,214,140,0.85)_0%,rgba(255,190,110,0.35)_35%,transparent_70%)] ${still ? "opacity-60" : "moment-sun"}`}
      />

      {/* Light leak that sweeps across once as the scene comes into view */}
      {!still && (
        <motion.div
          aria-hidden
          className="absolute -inset-y-[20%] -left-1/2 w-1/2 pointer-events-none mix-blend-screen bg-[linear-gradient(90deg,transparent_0%,rgba(255,220,160,0.5)_50%,transparent_100%)]"
          style={{ skewX: -14 }}
          initial={{ x: "0%", opacity: 0 }}
          animate={shown ? { x: "400%", opacity: [0, 1, 1, 0] } : { x: "0%", opacity: 0 }}
          transition={{ duration: 2.6, delay: 0.8, ease: "easeInOut" }}
        />
      )}

      {/* Pollen drifting up through the light */}
      {!still && (
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          {POLLEN.map((p, i) => (
            <span
              key={i}
              className="moment-pollen absolute rounded-full bg-[#fff3d6] blur-[1px]"
              style={
                {
                  left: p.left,
                  top: p.top,
                  width: p.size,
                  height: p.size,
                  "--d": p.duration,
                  "--delay": p.delay,
                  "--dx": p.drift,
                  "--o": p.opacity,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}

      {/* Cinematic finish: vignette and film grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(60,40,15,0.35)_100%)]"
      />
      <div
        aria-hidden
        className={`absolute -inset-[10%] pointer-events-none opacity-[0.12] mix-blend-overlay ${still ? "" : "moment-grain"}`}
        style={{ backgroundImage: GRAIN }}
      />

      {/* Soft hand-off from the Hero and into Our Story */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[10%] bg-gradient-to-b from-[#f4ebdf] to-transparent pointer-events-none" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[12%] bg-gradient-to-t from-[#f4eadc] to-transparent pointer-events-none" />

      {/* Caption: above the couple on phones, in the open field on the left on wide screens */}
      <motion.div
        style={still ? undefined : { y: captionY }}
        className="absolute inset-x-0 top-[14%] px-6 text-center md:top-[36%] md:left-[7%] md:right-auto md:max-w-md md:text-left"
      >
        <motion.span
          className="block text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/90 [text-shadow:0_1px_12px_rgba(60,40,15,0.5)]"
          initial={false}
          animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 1.2, delay: 1.4, ease: EASE_SOFT }}
        >
          Together since 2020
        </motion.span>
        <motion.h2
          className="mt-3 font-script font-normal text-5xl md:text-7xl text-white [text-shadow:0_2px_24px_rgba(60,40,15,0.45)]"
          initial={false}
          animate={shown ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(6px)" }}
          transition={{ duration: 1.4, delay: 1.7, ease: EASE_SOFT }}
        >
          Cherilyn &amp; Lester
        </motion.h2>
      </motion.div>
    </section>
  );
}
