"use client";

import productsData from "@/data/products.json";
import ProductCard from "./ProductCard";

/**
 * ProductGrid component that displays a responsive grid of products.
 * 
 * Grid Configuration:
 * - Desktop: 4 columns
 * - Tablet: 2 columns 
 * - Mobile: 1 column
 * 
 * @param {Object} props
 * @param {Array} [props.products] - Optional products array to override default data
 * @param {string} [props.title] - Optional section title
 */
export default function ProductGrid({ products = productsData, title }) {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {title && (
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {title}
            </h2>
            <div className="mt-2 h-1 w-20 bg-foreground" />
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg 
              className="h-16 w-16 text-fukrey-gray-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-4 text-xl font-semibold text-white">No products found</h3>
            <p className="mt-2 text-fukrey-gray-400">Try adjusting your filters or search criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
