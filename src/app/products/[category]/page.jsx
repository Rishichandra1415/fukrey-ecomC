"use client";

import { use, useState, useMemo } from "react";
import productsData from "@/data/products.json";
import { 
  Navbar, 
  ProductGrid, 
  Footer 
} from "@/components";
import { motion } from "framer-motion";

/**
 * Dynamic Category Page:
 * - Filters products from products.json by category slug
 * - Provides sorting options (Price, Rating)
 * - Premium dark theme layout
 */
export default function CategoryPage({ params }) {
  const { category } = use(params);
  const [sortBy, setSortBy] = useState("featured");

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = productsData.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );

    if (sortBy === "price-low") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      products.sort((a, b) => b.rating - a.rating);
    }

    return products;
  }, [category, sortBy]);

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="dark flex min-h-screen flex-col bg-fukrey-black">
      <Navbar />

      <main className="flex-1">
        {/* Category Header */}
        <section className="relative overflow-hidden bg-fukrey-offblack py-12 md:py-20">
          <div className="container relative z-10 mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <nav className="mb-4 flex text-xs font-medium uppercase tracking-widest text-fukrey-gray-500">
                <span className="hover:text-white transition-colors cursor-pointer">Shop</span>
                <span className="mx-2">/</span>
                <span className="text-white">{categoryName}</span>
              </nav>
              <h1 className="text-4xl font-extrabold tracking-tighter text-white sm:text-6xl md:text-7xl">
                {categoryName}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-fukrey-gray-400">
                Discover our curated collection of premium {category.toLowerCase()}. Engineered for style and comfort.
              </p>
            </motion.div>
          </div>
          
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent" />
        </section>

        {/* Filter & Toolbar */}
        <section className="border-y border-white/5 bg-fukrey-black/50 py-4 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-between px-4">
            <p className="text-sm font-medium text-fukrey-gray-400">
              Showing <span className="text-white">{filteredProducts.length}</span> products
            </p>
            
            <div className="flex items-center gap-4">
              <label htmlFor="sort" className="hidden text-xs font-bold uppercase tracking-wider text-fukrey-gray-500 sm:block">
                Sort By
              </label>
              <select 
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-white/10 bg-fukrey-offblack px-4 py-2 text-sm text-white focus:border-white/30 focus:outline-none transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} />
      </main>

      <Footer />
    </div>
  );
}
