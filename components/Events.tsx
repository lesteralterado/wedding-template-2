"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { Church, Calendar } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Floral from "./Floral";

const events = [
  {
    icon: Church,
    title: "Ceremony",
    time: "3:00 PM",
    venue: "St. Michael's Cathedral",
    address: "421 Lexington Avenue, New York",
  },
  {
    icon: Calendar,
    title: "Reception",
    time: "6:00 PM",
    venue: "The Ritz Carlton Ballroom",
    address: "50 Central Park South, New York",
  },
];

export default function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    // Garland hangs from the top; the header sits in the open space beneath its centre.
    // The gradient softens where the artwork's bottom edge meets the plain cream.
    <section
      id="events"
      className="pt-[34vw] pb-24 md:pb-32 relative"
      style={{
        perspective: "1000px",
        backgroundColor: "#f4eadc",
        backgroundImage:
          // First layer (drawn on top) fades into the page background so the next section starts seamlessly.
          "linear-gradient(to bottom, rgba(248, 246, 243, 0), #f8f6f3), linear-gradient(to top, #f4eadc, rgba(244, 234, 220, 0) 35%), url('/sections/floral-garland-top.webp')",
        backgroundSize: "100% 10rem, 100% 150vw, 100% auto",
        backgroundPosition: "bottom, top, top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader tag="Join Us" title="Wedding Events" />

        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <EventCard key={index} event={event} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({
  event,
  index,
  isInView,
}: {
  event: { icon: typeof Church; title: string; time: string; venue: string; address: string };
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { damping: 20, stiffness: 300 });
  const mouseY = useSpring(y, { damping: 20, stiffness: 300 });
  
  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(xPct * 15);
      y.set(yPct * 15);
    }
  }
  
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ 
        rotateX: mouseY,
        rotateY: mouseX,
        transformStyle: "preserve-3d"
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 1, delay: index * 0.2, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -10 }}
      className="bg-card-bg/70 backdrop-blur-sm border border-accent/10 p-10 text-center relative overflow-hidden group cursor-pointer"
    >
      {/* Top Line Animation */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent origin-left"
      />

      <motion.div
        style={{ transform: "translateZ(30px)" }}
        className="text-accent mb-6 flex justify-center"
      >
        {/* Icon sits inside a flower wreath */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <Floral variant="wreath" delay={index * 0.2 + 0.2} className="absolute inset-0" />
          <event.icon size={36} strokeWidth={1.5} className="relative" />
        </div>
      </motion.div>

      <motion.h3
        style={{ transform: "translateZ(20px)" }}
        className="font-heading text-2xl md:text-3xl mb-4 tracking-wide"
      >
        {event.title}
      </motion.h3>

      <motion.div style={{ transform: "translateZ(10px)" }} className="space-y-2">
        <p className="text-xl text-accent font-medium">{event.time}</p>
        <p className="font-heading text-lg">{event.venue}</p>
        <p className="text-text-secondary text-sm">{event.address}</p>
      </motion.div>
    </motion.div>
  );
}
