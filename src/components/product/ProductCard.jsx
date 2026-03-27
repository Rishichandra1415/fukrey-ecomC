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
  
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const variantImages = selectedVariant?.images || (selectedVariant?.image ? [selectedVariant.image] : [product?.image || "/products/placeholder.png"]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setCurrentImageIndex(0); 
  };

  const toggleSizeSelector = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowSizeSelector(!showSizeSelector);
  };

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newIndex = (currentImageIndex + 1) % variantImages.length;
    setCurrentImageIndex(newIndex);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newIndex = (currentImageIndex - 1 + variantImages.length) % variantImages.length;
    setCurrentImageIndex(newIndex);
  };

  // Stable random review count based on ID
  const reviewCount = (parseInt(product?.id || "0") * 17) % 200 + 40;

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizeSelector(false);
      }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-fukrey-border bg-background shadow-sm transition-all hover:shadow-2xl"
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
              key={`${selectedVariant?.color}-${currentImageIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <Image
                src={variantImages[currentImageIndex]}
                alt={product?.name || "Product"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                priority={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {variantImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-1.5 text-foreground opacity-100 transition-all hover:bg-background sm:opacity-0 sm:group-hover:opacity-100 shadow-md"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-1.5 text-foreground opacity-100 transition-all hover:bg-background sm:opacity-0 sm:group-hover:opacity-100 shadow-md"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                {variantImages.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 w-1.5 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? "w-3 bg-foreground" 
                        : "bg-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Discount Badge */}
          {product?.discount > 0 && (
            <div className="absolute top-3 left-3 z-10 rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-lg sm:text-xs tracking-tight">
              {product.discount}% OFF
            </div>
          )}

          {/* Best Seller Badge */}
          {product?.isBestSeller && (
            <div className="absolute top-3 left-3 z-10 translate-y-6 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-lg sm:text-xs tracking-tight">
              BEST SELLER
            </div>
          )}

          {/* Quick Action Overlay (Overlay on hover) */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/40 to-transparent">
             <div className="flex w-full gap-2 mb-2 translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                <button 
                  onClick={toggleSizeSelector}
                  className="w-full flex h-10 items-center justify-center rounded-full bg-white text-black shadow-lg transition-all hover:bg-amber-600 hover:text-white active:scale-95 text-[11px] font-bold gap-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  ADD TO CART
                </button>
             </div>
          </div>

          {/* Size Selection Overlay */}
          <AnimatePresence>
            {showSizeSelector && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 p-4 text-white backdrop-blur-md"
              >
                <button
                  onClick={toggleSizeSelector}
                  className="absolute right-3 top-3 rounded-full bg-white/20 p-1 transition-colors hover:bg-white/40"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-amber-500">Pick Your Size</p>
                <div className="grid grid-cols-3 gap-2 w-full max-w-[180px]">
                  {(product?.sizes || ["S", "M", "L", "XL", "XXL"]).map((size) => (
                    <button
                      key={size}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart({
                          ...product,
                          selectedSize: size,
                          selectedColor: selectedVariant?.color || "Default"
                        }, 1);
                        setShowSizeSelector(false);
                      }}
                      className="rounded-md border border-white/20 py-2 text-xs font-semibold transition-all hover:bg-white hover:text-black active:scale-95"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600/80 sm:text-[11px]">
              {product?.category || "COLLECTION"}
            </span>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5 text-[10px] font-bold text-foreground sm:text-xs">
                <svg className="h-3 w-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {product?.rating || "4.5"}
              </div>
              <span className="text-[9px] text-fukrey-muted sm:text-[10px]">({reviewCount})</span>
            </div>
          </div>

          <h3 className="mt-1.5 text-sm font-semibold leading-tight text-foreground transition-colors group-hover:text-amber-600 sm:text-base line-clamp-1">
            {product?.name || "Premium Cotton Product"}
          </h3>

          {/* Price Section */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-base font-bold text-foreground sm:text-lg">
              {discountedPrice || formattedPrice}
            </span>
            {discountedPrice && (
              <span className="text-[10px] text-fukrey-muted line-through sm:text-sm font-medium">
                {formattedPrice}
              </span>
            )}
          </div>

          {/* Color Selector UI (More compact on mobile) */}
          {product?.variants?.length > 1 && (
            <div className="flex items-center gap-1.5 mt-2" onClick={(e) => e.stopPropagation()}>
              <div className="flex gap-1.5">
                {product.variants.slice(0, 4).map((variant, index) => (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      handleVariantSelect(variant);
                    }}
                    onMouseEnter={() => handleVariantSelect(variant)}
                    className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 sm:w-5 sm:h-5 ${
                        selectedVariant?.color === variant.color 
                          ? "ring-1 ring-amber-600 ring-offset-1 scale-110" 
                          : "border border-fukrey-border/30"
                    }`}
                    style={{ backgroundColor: variant.colorCode }}
                    title={variant.color}
                  />
                ))}
              </div>
              {product.variants.length > 4 && (
                <span className="text-[8px] font-bold text-fukrey-muted sm:text-[10px]">
                  +{product.variants.length - 4}
                </span>
              )}
            </div>
          )}
          
          <div className="mt-auto pt-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1.5 sm:gap-2">
                <span className="text-sm font-black text-foreground sm:text-lg">
                  {discountedPrice || formattedPrice}
                </span>
                {discountedPrice && (
                  <span className="text-[10px] text-fukrey-muted line-through sm:text-sm font-medium">
                    {formattedPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Social Proof Row */}
            {(product?.salesCount || (product?.stockLeft && product.stockLeft <= 5)) && (
              <div className="flex flex-wrap items-center gap-2 border-t border-fukrey-border/30 pt-2">
                {product?.salesCount && (
                  <span className="text-[8px] font-bold text-amber-600 sm:text-[9px] uppercase tracking-wider">
                    🔥 {product.salesCount}
                  </span>
                )}
                {product?.stockLeft && product.stockLeft <= 5 && (
                  <span className="text-[8px] font-bold text-red-600 sm:text-[9px] uppercase tracking-wider">
                    ⚠️ Only {product.stockLeft} left
                  </span>
                )}
              </div>
            )}
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
        className={`absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all active:scale-90 border border-fukrey-border/10 sm:h-9 sm:w-9 ${
          isWishlisted 
            ? "bg-red-500 text-white shadow-lg" 
            : "bg-white/80 text-foreground hover:bg-white hover:shadow-md"
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
