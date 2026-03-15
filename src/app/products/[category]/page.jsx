"use client";

import { use, useState, useMemo } from "react";
import productsData from "@/data/products.json";
import { 
  ProductGrid, 
  ProductFilter,
  Footer 
} from "@/components";
import { motion } from "framer-motion";

/**
 * Dynamic Category Page:
 * - Filters products from products.json by category slug
 * - Provides sorting options (Price, Rating, Discount)
 * - Premium dark theme layout
 */
export default function CategoryPage({ params }) {
  const { category } = use(params);
  const [sortBy, setSortBy] = useState("featured");

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...productsData].filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );

    if (sortBy === "price-low") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      products.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "discount") {
      products.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    }

    return products;
  }, [category, sortBy]);

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="flex min-h-screen flex-col bg-background transition-colors duration-200">

      <main className="flex-1">
        {/* Category Header */}
        <section className="relative overflow-hidden bg-fukrey-muted/5 py-12 md:py-20">
          <div className="container relative z-10 mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <nav className="mb-4 flex text-xs font-medium uppercase tracking-widest text-fukrey-muted">
                <span className="hover:text-foreground transition-colors cursor-pointer">Shop</span>
                <span className="mx-2">/</span>
                <span className="text-foreground">{categoryName}</span>
              </nav>
              <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-6xl md:text-7xl">
                {categoryName}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-fukrey-muted">
                Discover our curated collection of premium {category.toLowerCase()}. Engineered for style and comfort.
              </p>
            </motion.div>
          </div>
          
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-foreground/5 to-transparent" />
        </section>

        {/* Product Filter/Sort Toolbar */}
        <ProductFilter 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
          totalProducts={filteredProducts.length} 
        />

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} />
      </main>

      <Footer />
    </div>
  );
}
