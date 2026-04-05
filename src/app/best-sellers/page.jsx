"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import productsData from "@/data/products.json";
import { 
  Footer, 
  ProductCard, 
  FilterPanel, 
  SortBar,
} from "@/components";
import TopPicks from "@/components/product/TopPicks";
import QuickFilterBar from "@/components/product/QuickFilterBar";
import { ChevronRight, X, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 12;

export default function BestSellersPage() {
  const [filters, setFilters] = useState({
    category: [],
    minPrice: 500,
    maxPrice: 5000,
    color: [],
    size: [],
    discount: [],
    rating: [],
    tags: ["Best Seller"], // Default to Best Sellers
  });
  const [sortBy, setSortBy] = useState("popularity");
  const [activeQuickCat, setActiveQuickCat] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // 1. Filtering Logic
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      // Quick Category Filter
      if (activeQuickCat && product.category.toLowerCase() !== activeQuickCat) return false;

      // Category filter (Sidebar)
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

      // Rating filter
      if (filters.rating.length > 0) {
        const minRating = Math.min(...filters.rating);
        if (product.rating < minRating) return false;
      }

      return true;
    });
  }, [filters, activeQuickCat]);

  // 2. Sorting Logic
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case "popularity":
        return sorted.sort((a, b) => (b.rating || 0) * (b.isBestSeller ? 1.5 : 1) - (a.rating || 0) * (a.isBestSeller ? 1.5 : 1));
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
      case "newest":
        return sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  // Top Picks (Highest rated Best Sellers)
  const topPicks = useMemo(() => {
    return productsData
      .filter(p => p.isBestSeller || p.rating >= 4.5)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);
  }, []);

  // Infinite Scroll List
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
    setActiveQuickCat("");
  };

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [filters, sortBy, activeQuickCat]);

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
      <main className="flex-1 container mx-auto px-4 py-6 sm:py-10">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="mb-3 flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.2em] text-fukrey-muted sm:mb-4 sm:text-[10px]">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-2 w-2" />
            <span className="text-foreground">Best Sellers</span>
          </div>
          <div className="flex flex-col gap-2 sm:gap-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:gap-5">
              <h1 className="flex items-center gap-2 text-2xl font-black uppercase tracking-tighter text-foreground sm:text-6xl">
                <Flame className="h-6 w-6 text-amber-500 sm:h-12 sm:w-12 animate-pulse" />
                Best Sellers
              </h1>
            </div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-fukrey-muted sm:text-lg sm:tracking-[0.3em]">
              Most loved by customers
            </p>
          </div>
        </div>

        {/* Top Picks Section */}
        <TopPicks products={topPicks} />

        {/* Quick Filter Bar */}
        <QuickFilterBar activeCategory={activeQuickCat} setActiveCategory={setActiveQuickCat} />

        {/* Sort Bar (Sticky) */}
        <SortBar 
          totalItems={totalItems} 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
          onMobileFilterClick={() => setIsMobileFilterOpen(true)}
          title="Best Sellers"
          itemLabel="Best Sellers"
        />

        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0">
             <div className="sticky top-32 h-[calc(100vh-140px)] overflow-y-auto pr-4 scrollbar-hide">
                <FilterPanel 
                  filters={filters} 
                  setFilters={setFilters} 
                  clearFilters={clearFilters}
                  itemCount={totalItems}
                  title="Refine Best Sellers"
                />
             </div>
          </div>

          {/* Product Grid Area */}
          <div className="flex-1">
            {visibleProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-2 md:grid-cols-3 xl:gap-x-8 xl:gap-y-10">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="rounded-full bg-fukrey-muted/5 p-8">
                  <X className="h-12 w-12 text-fukrey-muted/30" />
                </div>
                <h3 className="mt-6 text-2xl font-black text-foreground uppercase tracking-tight">No matches found</h3>
                <p className="mt-3 text-sm font-bold text-fukrey-muted max-w-xs uppercase tracking-widest">
                  Try adjusting your filters or search terms.
                </p>
                <button 
                  onClick={clearFilters}
                  className="mt-8 rounded-full bg-foreground px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-background transition-all active:scale-95 shadow-xl"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Scroll Sentinel */}
            <div id="scroll-sentinel" className="h-24 w-full" />
            
            {visibleCount < totalItems && (
               <div className="flex justify-center py-12">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-fukrey-border border-t-amber-500 shadow-lg" />
               </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer Overlay (Reused from New Arrivals for consistency) */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md lg:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-[70] w-[85%] max-w-sm bg-background p-8 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="mb-8 flex items-center justify-between border-b border-fukrey-border pb-6">
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">Filter Options</h2>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="h-7 w-7" />
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
                className="mt-10 w-full rounded-full bg-foreground py-5 text-[10px] font-black uppercase tracking-[0.2em] text-background shadow-2xl"
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
