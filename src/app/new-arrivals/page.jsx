"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import productsData from "@/data/products.json";
import { 
  Footer, 
  ProductCard, 
  FilterPanel, 
  SortBar,
  Transition 
} from "@/components";
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 12;

export default function NewArrivalsPage() {
  const [filters, setFilters] = useState({
    category: [],
    minPrice: 500,
    maxPrice: 5000,
    color: [],
    size: [],
    discount: [],
    rating: [],
    tags: [],
  });
  const [sortBy, setSortBy] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // 1. Filtering Logic
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      // Category filter
      if (filters.category.length > 0) {
        const productCat = product.category.toLowerCase();
        const match = filters.category.some(c => c.toLowerCase().includes(productCat) || productCat.includes(c.toLowerCase()));
        if (!match) return false;
      }

      const finalPrice = product.discount 
        ? product.price * (1 - product.discount / 100)
        : product.price;
      if (finalPrice < filters.minPrice || finalPrice > filters.maxPrice) return false;

      // Color filter
      if (filters.color.length > 0) {
        const hasColor = product.variants.some(v => filters.color.includes(v.color));
        if (!hasColor) return false;
      }

      // Size filter
      if (filters.size.length > 0) {
        const hasSize = product.sizes.some(s => filters.size.includes(s));
        if (!hasSize) return false;
      }

      // Discount filter
      if (filters.discount.length > 0) {
        const minDiscount = Math.min(...filters.discount.map(d => parseInt(d)));
        if (product.discount < minDiscount) return false;
      }

      // Rating filter
      if (filters.rating.length > 0) {
        const minRating = Math.min(...filters.rating);
        if (product.rating < minRating) return false;
      }

      return true;
    });
  }, [filters]);

  // 2. Sorting Logic
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => {
            const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
            const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
            return priceA - priceB;
        });
      case "price-desc":
        return sorted.sort((a, b) => {
            const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
            const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
            return priceB - priceA;
        });
      case "discount":
        return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      case "popularity":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "newest":
      default:
        // Assuming higher ID means newer
        return sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }
  }, [filteredProducts, sortBy]);

  // 3. Infinite Scroll List
  const totalItems = sortedProducts.length;
  const visibleProducts = useMemo(() => {
    return sortedProducts.slice(0, visibleCount);
  }, [sortedProducts, visibleCount]);

  const clearFilters = () => {
    setFilters({
      category: [],
      minPrice: 500,
      maxPrice: 5000,
      color: [],
      size: [],
      discount: [],
      rating: [],
      tags: [],
    });
  };

  // Reset count on filter change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [filters, sortBy]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < totalItems) {
          setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.getElementById("scroll-sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [visibleCount, totalItems]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 container mx-auto px-4 py-4 sm:py-8">
        {/* Breadcrumbs (Simplified for Mobile) */}
        <div className="mb-4 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-fukrey-muted sm:mb-6 sm:gap-2 sm:text-[10px]">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-2.5 w-2.5" />
          <span className="text-foreground">New Arrivals</span>
        </div>

        <SortBar 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
          onMobileFilterClick={() => setIsMobileFilterOpen(true)}
        />

        <div className="mt-6 flex flex-col lg:flex-row gap-8 sm:mt-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-32 h-[calc(100vh-120px)] overflow-y-auto pr-4 scrollbar-hide">
              <FilterPanel 
                filters={filters} 
                setFilters={setFilters} 
                clearFilters={clearFilters}
                itemCount={totalItems}
              />
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="flex-1">
            {visibleProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:gap-x-8 xl:gap-y-10">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="rounded-full bg-fukrey-muted/5 p-6">
                  <X className="h-10 w-10 text-fukrey-muted/40" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground">No matches found</h3>
                <p className="mt-2 text-sm text-fukrey-muted max-w-xs">
                  Try adjusting your filters or clearing them.
                </p>
                <button 
                  onClick={clearFilters}
                  className="mt-6 rounded-full bg-foreground px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-background transition-all active:scale-95"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Scroll Sentinel */}
            <div id="scroll-sentinel" className="h-20 w-full" />
            
            {visibleCount < totalItems && (
               <div className="flex justify-center py-10">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-fukrey-border border-t-amber-600" />
               </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer Overlay */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[70] w-[85%] max-w-sm bg-background p-6 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="mb-6 flex items-center justify-between border-b pb-4">
                <h2 className="text-xl font-bold uppercase tracking-tight">Filter Options</h2>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <FilterPanel 
                filters={filters} 
                setFilters={setFilters} 
                clearFilters={clearFilters}
                itemCount={totalItems}
              />
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="mt-8 w-full rounded-full bg-foreground py-4 text-xs font-bold uppercase tracking-widest text-background"
              >
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
