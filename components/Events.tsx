"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Church, Calendar } from "lucide-react";
import SectionHeader from "./SectionHeader";

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
    <section id="events" className="py-24 md:py-32 relative bg-gradient-to-b from-background via-card-bg/30 to-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader tag="Join Us" title="Wedding Events" />

        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -10 }}
              className="bg-card-bg/50 border border-accent/10 p-10 text-center relative overflow-hidden group"
            >
              {/* Top Line Animation */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent origin-left"
              />

              <div className="text-accent mb-6 flex justify-center">
                <event.icon size={48} strokeWidth={1.5} />
              </div>

              <h3 className="font-heading text-2xl md:text-3xl mb-4 tracking-wide">
                {event.title}
              </h3>

              <div className="space-y-2">
                <p className="text-xl text-accent font-medium">{event.time}</p>
                <p className="font-heading text-lg">{event.venue}</p>
                <p className="text-text-secondary text-sm">{event.address}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
