"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, SlidersHorizontal, ArrowDownAZ, ArrowUpAZ, Star, Tag } from "lucide-react";

/**
 * ProductFilter Component
 * Provides a premium UI for sorting and filtering products.
 * 
 * @param {Object} props
 * @param {string} props.sortBy - Current sort method
 * @param {Function} props.setSortBy - Function to update sort method
 * @param {number} props.totalProducts - Total count of products showing
 */
export default function ProductFilter({ sortBy, setSortBy, totalProducts }) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { id: "featured", label: "Featured", icon: SlidersHorizontal },
    { id: "price-low", label: "Price: Low to High", icon: ArrowDownAZ },
    { id: "price-high", label: "Price: High to Low", icon: ArrowUpAZ },
    { id: "rating", label: "Top Rated", icon: Star },
    { id: "discount", label: "Biggest Discount", icon: Tag },
  ];

  const currentOption = sortOptions.find(opt => opt.id === sortBy) || sortOptions[0];

  return (
    <section className="sticky top-14 z-30 border-y border-fukrey-border bg-background/80 py-3 backdrop-blur-xl transition-colors duration-200 sm:top-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
          </div>

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex w-full items-center justify-between gap-3 rounded-xl border border-fukrey-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-foreground/20 hover:bg-fukrey-muted/5 active:scale-95 sm:w-64"
            >
              <div className="flex items-center gap-2">
                <currentOption.icon className="h-4 w-4 text-fukrey-muted" />
                <span>{currentOption.label}</span>
              </div>
              <ChevronDown className={`h-4 w-4 text-fukrey-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-black/5 sm:hidden"
                    onClick={() => setIsOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    className="absolute right-0 top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-fukrey-border bg-background p-1.5 shadow-2xl backdrop-blur-3xl sm:w-64"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          setSortBy(option.id);
                          setIsOpen(false);
                        }}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                          sortBy === option.id
                            ? "bg-foreground text-background"
                            : "text-foreground hover:bg-fukrey-muted/10"
                        }`}
                      >
                        <option.icon className={`h-4 w-4 ${sortBy === option.id ? "text-background" : "text-fukrey-muted"}`} />
                        {option.label}
                        {sortBy === option.id && (
                          <motion.div 
                            layoutId="active-check"
                            className="ml-auto"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
