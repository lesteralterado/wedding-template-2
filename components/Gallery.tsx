"use client";

import Image from "next/image";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

const images = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=600&fit=crop",
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    if (typeof window !== 'undefined') {
      document.body.style.overflow = "hidden";
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    if (typeof window !== 'undefined') {
      document.body.style.overflow = "unset";
    }
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    
    if (direction === "prev") {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
       
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateImage("prev");
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateImage("next");
      }
      if (e.key === "Escape") closeLightbox();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedImage]);

  return (
    <section id="gallery" className="py-24 md:py-32 relative" style={{ perspective: "1000px" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader tag="Memories" title="Our Gallery" />

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {images.map((src, index) => (
            <GalleryItem 
              key={index} 
              src={src} 
              index={index} 
              isInView={isInView} 
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <X className="text-white" size={24} />
            </motion.button>

            {/* Navigation Buttons */}
            <motion.button
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => { e.stopPropagation(); navigateImage("prev"); }}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="text-white" size={28} />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => { e.stopPropagation(); navigateImage("next"); }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="text-white" size={28} />
            </motion.button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[80vh] w-full mx-20"
              onClick={(e) => e.stopPropagation()}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src={images[selectedImage]}
                alt={`Wedding photo ${selectedImage + 1}`}
                width={800}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
               
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full">
                <span className="text-white text-sm">
                  {selectedImage + 1} / {images.length}
                </span>
              </div>
            </motion.div>

            {/* Keyboard Hints */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs">
              Use ← → arrow keys or click to navigate • ESC to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// GalleryItem with 3D Tilt Effect
function GalleryItem({
  src,
  index,
  isInView,
  onClick,
}: {
  src: string;
  index: number;
  isInView: boolean;
  onClick: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { damping: 20, stiffness: 300 });
  const mouseY = useSpring(y, { damping: 20, stiffness: 300 });
  
  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = itemRef.current?.getBoundingClientRect();
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
      ref={itemRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ 
        rotateX: mouseY,
        rotateY: mouseX,
        transformStyle: "preserve-3d"
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
      className="relative aspect-square overflow-hidden group cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotateX: 5 }}
        transition={{ duration: 0.4 }}
        className="w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src={src}
          alt={`Wedding photo ${index + 1}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </motion.div>
      
      {/* Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-t from-accent/40 via-transparent to-transparent"
        style={{ transform: "translateZ(10px)" }}
      />
      
      {/* 3D Floating Border */}
      <motion.div
        className="absolute inset-2 border border-white/30 pointer-events-none"
        style={{ transform: "translateZ(20px)" }}
      />
       
      {/* Zoom Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 10 }}
        whileHover={{ opacity: 1, scale: 1, y: 0 }}
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}
