"use client";

import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Heart } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Floral from "./Floral";

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    attendance: "" as "" | "yes" | "no",
    guests: "1",
    meal: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputVariants = {
    focus: { borderColor: "#D4AF37", boxShadow: "0 0 0 3px rgba(212, 175, 55, 0.1)" },
    blur: { borderColor: "rgba(212, 175, 55, 0.2)", boxShadow: "none" },
  };

  return (
    <section id="rsvp" className="py-24 md:py-32 relative bg-gradient-to-b from-background via-card-bg/20 to-background">
      <div className="max-w-2xl mx-auto px-6">
        <SectionHeader tag="Your Presence" title="Kindly Respond" />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative px-[13%] pt-[24%] pb-[12%] md:pt-[20%]"
        >
          {/* Decorative frame (stretches to fit the form) */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[url('/rsvp/frame.svg')] bg-[length:100%_100%] bg-no-repeat pointer-events-none"
          />
          {/* Flower bouquet overlapping the top-left corner; margin % is relative to width, keeping its position proportional */}
          <img
            src="/rsvp/flower.svg"
            alt=""
            aria-hidden
            className="absolute top-0 left-0 w-[26%] -mt-[5%] -ml-[9%] pointer-events-none select-none z-10"
          />
          <div className="relative">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-8"
              >
                {/* A bouquet as a thank-you */}
                <Floral variant="bouquet" delay={0.2} className="w-28 mx-auto mb-6" />
                <h3 className="font-heading text-3xl mb-4">Thank You!</h3>
                <p className="text-text-secondary mb-6">
                  Your response has been received. We can&apos;t wait to celebrate with you!
                </p>
                
                {/* Animated Hearts */}
                <div className="flex justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: [0, 1, 0], y: [10, -10, -20] }}
                      transition={{
                        duration: 1.5,
                        delay: 0.3 + i * 0.15,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      <Heart className="text-accent/40" size={16} fill="#D4AF37" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name Input */}
                <motion.div
                  animate={focusedField === "name" ? "focus" : "blur"}
                  variants={inputVariants}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-5 py-4 bg-background/50 border border-accent/20 text-text-primary placeholder-text-secondary/50 focus:outline-none transition-colors"
                  />
                </motion.div>

                {/* Attendance Selection */}
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-3">
                    Will you attend?
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {[
                      { value: "yes", label: "Joyfully Accept", icon: "✓" },
                      { value: "no", label: "Regretfully Decline", icon: "✗" }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 cursor-pointer group flex-1"
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value={option.value}
                          checked={formData.attendance === option.value}
                          onChange={handleChange}
                          required
                          className="sr-only"
                        />
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex-1 px-5 py-4 border rounded-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                            formData.attendance === option.value
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-accent/20 text-text-secondary group-hover:border-accent/40"
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            formData.attendance === option.value
                              ? "border-accent bg-accent"
                              : "border-accent/30"
                          }`}>
                            {formData.attendance === option.value && (
                              <span className="w-2 h-2 bg-background rounded-full" />
                            )}
                          </span>
                          <span className="text-sm">{option.label}</span>
                        </motion.div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Guests Select */}
                <motion.div
                  animate={focusedField === "guests" ? "focus" : "blur"}
                  variants={inputVariants}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-3">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("guests")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-5 py-4 bg-background/50 border border-accent/20 text-text-primary focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                {/* Meal Select */}
                <motion.div
                  animate={focusedField === "meal" ? "focus" : "blur"}
                  variants={inputVariants}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-3">
                    Meal Preference
                  </label>
                  <div className="relative">
                    <select
                      name="meal"
                      value={formData.meal}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("meal")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-5 py-4 bg-background/50 border border-accent/20 text-text-primary focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select your meal preference</option>
                      <option value="chicken">Chicken</option>
                      <option value="beef">Beef</option>
                      <option value="fish">Fish</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ y: -3, boxShadow: "0 10px 30px rgba(212, 175, 55, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-accent to-yellow-600 text-background font-medium tracking-[0.2em] uppercase text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  {/* Button Shine Effect */}
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-white/20"
                  />
                  
                  {isSubmitting ? (
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      Sending...
                    </motion.span>
                  ) : (
                    <>
                      <span>Send Response</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight size={18} />
                      </motion.div>
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
