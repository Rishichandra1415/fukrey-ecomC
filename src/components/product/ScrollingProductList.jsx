"use client";

import React from "react";
import ProductCard from "./ProductCard";

/**
 * ScrollingProductList component that displays products in an automatic horizontal scroll.
 * 
 * @param {Object} props
 * @param {Array} props.products - Products array to display
 * @param {string} [props.title] - Optional section title
 * @param {string} [props.speed] - Animation speed (default: "40s")
 */
export default function ScrollingProductList({ products, title, speed = "40s" }) {
  if (!products || products.length === 0) return null;

  // Duplicate products to create a seamless loop
  // We double it to ensure the container is always full and can loop smoothly
  const displayProducts = [...products, ...products];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-fukrey-bg overflow-hidden">
      <div className="container mx-auto px-4">
        {title && (
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {title}
            </h2>
            <div className="mt-2 h-1 w-20 bg-foreground" />
          </div>
        )}
      </div>

      <div className="relative mt-4 pause-on-hover">
        {/* Gradient overlays for smooth fade effect at edges */}
        <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-fukrey-bg to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-fukrey-bg to-transparent pointer-events-none" />

        <div 
          className="animate-scroll flex gap-6 px-4"
          style={{ animationDuration: speed }}
        >
          {displayProducts.map((product, index) => (
            <div 
              key={`${product.id}-${index}`} 
              className="w-[280px] flex-shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
