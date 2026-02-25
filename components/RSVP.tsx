"use client";

import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    attendance: "",
    guests: "1",
    meal: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <section id="rsvp" className="py-24 md:py-32 relative bg-gradient-to-b from-background via-card-bg/20 to-background">
      <div className="max-w-2xl mx-auto px-6">
        <SectionHeader tag="Your Presence" title="Kindly Respond" />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="bg-card-bg/50 border border-accent/10 p-8 md:p-12"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-br from-accent to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check size={40} className="text-background" />
                </motion.div>
                <h3 className="font-heading text-3xl mb-4">Thank You!</h3>
                <p className="text-text-secondary">
                  Your response has been received. We can't wait to celebrate
                  with you!
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-5 py-4 bg-background/50 border border-accent/20 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-3">
                    Will you attend?
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="attendance"
                        value="yes"
                        checked={formData.attendance === "yes"}
                        onChange={handleChange}
                        required
                        className="sr-only"
                      />
                      <span
                        className={`w-5 h-5 border rounded-full flex items-center justify-center transition-colors ${
                          formData.attendance === "yes"
                            ? "border-accent bg-accent"
                            : "border-accent/30 group-hover:border-accent/60"
                        }`}
                      >
                        {formData.attendance === "yes" && (
                          <span className="w-2 h-2 bg-background rounded-full" />
                        )}
                      </span>
                      <span className="text-text-secondary group-hover:text-text-primary transition-colors">
                        Joyfully Accept
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="attendance"
                        value="no"
                        checked={formData.attendance === "no"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span
                        className={`w-5 h-5 border rounded-full flex items-center justify-center transition-colors ${
                          formData.attendance === "no"
                            ? "border-accent bg-accent"
                            : "border-accent/30 group-hover:border-accent/60"
                        }`}
                      >
                        {formData.attendance === "no" && (
                          <span className="w-2 h-2 bg-background rounded-full" />
                        )}
                      </span>
                      <span className="text-text-secondary group-hover:text-text-primary transition-colors">
                        Regretfully Decline
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-3">
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-background/50 border border-accent/20 text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-3">
                    Meal Preference
                  </label>
                  <select
                    name="meal"
                    value={formData.meal}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-background/50 border border-accent/20 text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select your meal preference</option>
                    <option value="chicken">Chicken</option>
                    <option value="beef">Beef</option>
                    <option value="fish">Fish</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                  </select>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-accent to-yellow-600 text-background font-medium tracking-[0.2em] uppercase text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Response</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
