"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/**
 * ProductCard component featuring:
 * - Hover animations with Framer Motion
 * - Mobile responsive layout
 * - Add to Cart, View Details, and Wishlist actions
 */
export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product?.price || 0);

  const discountedPrice = product?.discount 
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(product.price * (1 - product.discount / 100))
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-fukrey-white/10 bg-fukrey-offblack shadow-sm transition-all hover:shadow-xl dark:border-fukrey-gray-800"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-fukrey-gray-900">
        <Image
          src={product?.image || "/products/placeholder.png"}
          alt={product?.name || "Product"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          priority={false}
        />

        {/* Discount Badge */}
        {product?.discount > 0 && (
          <div className="absolute top-3 left-3 z-10 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold text-white shadow-lg">
            -{product.discount}%
          </div>
        )}

        {/* Wishlist Button */}
        <button 
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black active:scale-95"
          aria-label="Add to wishlist"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Hover Actions (Desktop) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-x-0 bottom-0 z-20 hidden p-4 sm:block"
            >
              <div className="flex flex-col gap-2">
                <button className="w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/90 active:scale-[0.98]">
                  Add to Cart
                </button>
                <Link 
                  href={`/product/${product?.id || "#"}`}
                  className="flex w-full items-center justify-center rounded-lg bg-black/60 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-black/80"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-wider text-fukrey-gray-400">{product?.category || "Men's Style"}</p>
          <div className="flex items-center gap-1 text-xs font-medium text-yellow-500">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {product?.rating || "4.5"}
          </div>
        </div>
        
        <h3 className="mt-1 text-sm font-semibold text-white transition-colors group-hover:text-white/80 sm:text-base">
          {product?.name || "Premium Cotton Product"}
        </h3>

        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white">
              {discountedPrice || formattedPrice}
            </span>
            {discountedPrice && (
              <span className="text-sm text-fukrey-gray-500 line-through">
                {formattedPrice}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="mt-4 flex flex-col gap-2 sm:hidden">
          <button className="w-full rounded-lg bg-white px-4 py-2 text-xs font-bold text-black active:scale-[0.98]">
            Add to Cart
          </button>
          <Link 
            href={`/product/${product?.id || "#"}`}
            className="flex w-full items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-xs font-bold text-white active:scale-[0.98]"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
