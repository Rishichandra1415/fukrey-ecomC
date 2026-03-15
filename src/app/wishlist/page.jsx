"use client";

import React from "react";
import Link from "next/link";
import { Footer } from "@/components";
import { useWishlist, useCart } from "@/context";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, totalWishlistItems } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    // Add to cart with default options if necessary
    addToCart({
      ...product,
      selectedSize: product.sizes?.[0] || "M",
      selectedColor: product.colors?.[0] || "Default",
    }, 1);
    removeFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200">
        <main className="flex flex-1 items-center justify-center px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-fukrey-muted/10 text-fukrey-muted">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Your wishlist is empty</h1>
            <p className="mt-2 text-fukrey-muted">Add items that you like to your wishlist to see them here.</p>
            <Link
              href="/"
              className="mt-8 inline-block rounded-lg bg-foreground px-8 py-3 text-sm font-semibold text-background hover:opacity-90 transition-opacity"
            >
              Start Shopping
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl" style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}>
              My <span className="text-[#e8d5b0]">Wishlist</span>
            </h1>
            <p className="mt-2 text-fukrey-muted uppercase tracking-[0.2em] text-xs font-bold">
              {totalWishlistItems} saved items
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence>
              {wishlistItems.map((item) => (
                <WishlistItem 
                  key={item.id} 
                  item={item} 
                  onRemove={() => removeFromWishlist(item.id)}
                  onMoveToCart={() => handleMoveToCart(item)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function WishlistItem({ item, onRemove, onMoveToCart }) {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(item.price);

  const discountedPrice = item.discount 
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(item.price * (1 - item.discount / 100))
    : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-fukrey-border bg-background transition-all hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-fukrey-muted/5">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur-md transition-all hover:bg-black hover:text-white border border-fukrey-border/20"
          aria-label="Remove from wishlist"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {item.discount > 0 && (
          <div className="absolute top-3 left-3 z-10 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">
            -{item.discount}%
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-fukrey-muted">
            {item.category}
          </span>
          <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-600">
            ★ {item.rating}
          </div>
        </div>

        <Link href={`/product/${item.id}`} className="mt-1 block">
          <h3 className="text-sm font-bold text-foreground transition-colors hover:text-[#e8d5b0]">
            {item.name}
          </h3>
        </Link>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-base font-bold text-foreground">
            {discountedPrice || formattedPrice}
          </span>
          {discountedPrice && (
            <span className="text-xs text-fukrey-muted line-through">
              {formattedPrice}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-1 gap-2">
          <button
            onClick={onMoveToCart}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground py-2.5 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:opacity-90 active:scale-95"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add to Cart
          </button>
          <Link
            href={`/product/${item.id}`}
            className="flex w-full items-center justify-center rounded-lg border border-fukrey-border py-2.5 text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-fukrey-muted/5 active:scale-95"
          >
            View Product
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
