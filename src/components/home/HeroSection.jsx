"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/** Add images to public folder: hero-banner.jpg, hero-banner-2.jpg, hero-banner-3.jpg (or use your own paths) */
const HERO_SLIDES = [
  "/hero-banner.jpg",
  "/hero-banner-2.jpg",
  "/hero-banner-3.jpg",
  "/hero-banner-4.png",
  "/hero-banner-5.png",
];

const SLIDE_DURATION_MS = 5000;
const TRANSITION_MS = 700;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      className="relative w-full min-h-[70vh] sm:min-h-[80vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden"
      aria-label="Hero banner"
    >
      {/* 1) Fallback gradient (behind slides) */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br from-fukrey-gray-900 via-fukrey-gray-800 to-black dark:from-black dark:via-fukrey-gray-900 dark:to-fukrey-offblack"
        aria-hidden="true"
      />

      {/* 2) Slider – multiple background images with crossfade */}
      {HERO_SLIDES.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 z-0 bg-cover bg-[center_top] bg-no-repeat transition-opacity duration-700 ease-out"
          style={{
            backgroundImage: `url(${src})`,
            opacity: index === currentSlide ? 1 : 0,
            transitionDuration: `${TRANSITION_MS}ms`,
          }}
          role="img"
          aria-hidden={index !== currentSlide}
        />
      ))}

      {/* 3) Overlay for text readability - slightly stronger on mobile */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 dark:from-black/80 dark:via-black/50 dark:to-black/90 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl font-bold tracking-tight text-white drop-shadow-xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Fukrey – Style for Men
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-4 sm:mt-6 text-base sm:text-xl text-white/90 max-w-xl mx-auto drop-shadow-md md:text-2xl"
        >
          New arrivals for modern men
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/new-arrivals"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-black shadow-lg transition-all duration-200 hover:bg-white/90 hover:scale-[1.05] active:scale-[0.95] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>

      {/* Slide indicators (dots) */}
      <div
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2"
        role="tablist"
        aria-label="Hero slides"
      >
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent ${
              index === currentSlide
                ? "w-8 bg-white"
                : "w-2.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
