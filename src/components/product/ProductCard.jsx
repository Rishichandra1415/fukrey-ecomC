"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist, useCart } from "@/context";
import { ChevronLeft, ChevronRight, ShoppingBag, X } from "lucide-react";

/**
 * ProductCard component simplified for:
 * - Full card clickability to navigate to product details
 * - Removal of explicit overlay buttons (Add to Cart / View Details)
 * - Independent Wishlist functionality
 */
export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isWishlisted = isInWishlist(product?.id);
  
  const images = product?.variants?.map(v => v.image) || [product?.image || "/products/placeholder.png"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]);
  const [showSizeSelector, setShowSizeSelector] = useState(false);

  const handleVariantSelect = (variant, index) => {
    setSelectedVariant(variant);
    setCurrentImageIndex(index);
  };

  const toggleSizeSelector = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSizeSelector(!showSizeSelector);
  };

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
    setSelectedVariant(product.variants[newIndex]);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
    setSelectedVariant(product.variants[newIndex]);
  };

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
      className="group relative flex flex-col overflow-hidden rounded-xl border border-fukrey-border bg-background shadow-sm transition-all hover:shadow-xl"
    >
      {/* 1. Main Clickable Area (Link) */}
      <Link 
        href={`/product/${product?.id || "#"}`}
        className="flex flex-col h-full"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-fukrey-muted/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedVariant?.color || currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <Image
                src={selectedVariant?.image || images[currentImageIndex]}
                alt={product?.name || "Product"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-all duration-300 ease-out group-hover:scale-105"
                priority={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/60 p-1.5 text-foreground opacity-100 transition-all hover:bg-background sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/60 p-1.5 text-foreground opacity-100 transition-all hover:bg-background sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 w-1.5 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? "w-3 bg-amber-600" 
                        : "bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Discount Badge */}
          {product?.discount > 0 && (
            <div className="absolute top-3 left-3 z-10 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg sm:text-xs">
              -{product.discount}%
            </div>
          )}

          {/* Size Selection Overlay */}
          <AnimatePresence>
            {showSizeSelector && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/70 p-4 text-white backdrop-blur-sm"
              >
                <button
                  onClick={toggleSizeSelector}
                  className="absolute right-3 top-3 rounded-full bg-white/20 p-1 transition-colors hover:bg-white/40"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="mb-4 text-xs font-bold uppercase tracking-widest">Select Size</p>
                <div className="grid grid-cols-3 gap-2">
                  {(product?.sizes || ["S", "M", "L", "XL", "XXL"]).map((size) => (
                    <button
                      key={size}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Add to cart with selected size and variant color
                        addToCart({
                          ...product,
                          selectedSize: size,
                          selectedColor: selectedVariant?.color || "Default"
                        }, 1);
                        setShowSizeSelector(false);
                      }}
                      className="rounded border border-white/30 px-3 py-1.5 text-xs font-medium transition-all hover:bg-white hover:text-black active:scale-95"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cart Button */}
          <button
            onClick={toggleSizeSelector}
            className="absolute bottom-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-fukrey-border/20 bg-background/40 text-foreground backdrop-blur-md transition-all hover:bg-background active:scale-90"
            aria-label="Select size and add to cart"
          >
            <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] uppercase tracking-wider text-fukrey-muted sm:text-xs">{product?.category || "Men's Style"}</p>
            <div className="flex items-center gap-1 text-[10px] font-medium text-yellow-600 sm:text-xs">
              <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {product?.rating || "4.5"}
            </div>
          </div>

          {/* Color Selector UI */}
          {product?.variants?.length > 1 && (
            <div className="flex items-center gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
              <div className="flex gap-2">
                {product.variants.slice(0, 3).map((variant, index) => (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      handleVariantSelect(variant, index);
                    }}
                    className={`w-6 h-6 rounded-full cursor-pointer transition-all ${
                        selectedVariant?.color === variant.color 
                          ? "border-2 border-black" 
                          : "border border-gray-300"
                    }`}
                    style={{ backgroundColor: variant.colorCode }}
                    title={variant.color}
                  />
                ))}
              </div>
              {product.variants.length > 3 && (
                <span className="text-[10px] font-medium text-fukrey-muted sm:text-xs">
                  +{product.variants.length - 3}
                </span>
              )}
            </div>
          )}
          
          <h3 className="mt-2 text-sm font-semibold text-foreground transition-colors group-hover:text-amber-600/80 sm:text-base">
            {product?.name || "Premium Cotton Product"}
          </h3>



          <div className="mt-auto pt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-foreground sm:text-lg">
                {discountedPrice || formattedPrice}
              </span>
              {discountedPrice && (
                <span className="text-xs text-fukrey-muted line-through sm:text-sm">
                  {formattedPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* 2. Wishlist Button (Independent of Link) */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className={`absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all active:scale-90 border border-fukrey-border/20 sm:h-9 sm:w-9 ${
          isWishlisted 
            ? "bg-amber-500 text-white" 
            : "bg-background/40 text-foreground hover:bg-background"
        }`}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <svg className="h-4 w-4 sm:h-5 sm:w-5" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </motion.div>
  );
}
