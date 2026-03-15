"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context";
import { formatPrice } from "@/utils/format";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const shipping = 0; // Free shipping for now
  const total = totalPrice + shipping;

  if (cart.length === 0) {
    return (
      <div className="dark flex min-h-screen flex-col bg-fukrey-black">
        <main className="flex flex-1 items-center justify-center px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-fukrey-gray-900 text-fukrey-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.112 11.55a1.125 1.125 0 0 1-1.12 1.247H4.404a1.125 1.125 0 0 1-1.12-1.247l1.112-11.55a1.125 1.125 0 0 1 1.12-1.247h14.346a1.125 1.125 0 0 1 1.12 1.247Z" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Your cart is empty</h1>
            <p className="mt-2 text-fukrey-gray-400">Looks like you haven't added anything yet.</p>
            <Link
              href="/"
              className="mt-8 inline-block rounded-lg bg-white px-8 py-3 text-sm font-semibold text-black hover:bg-fukrey-gray-200 transition-colors"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="dark flex min-h-screen flex-col bg-fukrey-black text-white">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">Your Cart ({totalItems})</h1>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Cart Items List */}
            <div className="lg:col-span-8">
              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group relative flex flex-col gap-4 rounded-2xl bg-fukrey-gray-900/40 p-4 sm:flex-row sm:items-center sm:gap-6"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-[4/5] w-24 flex-shrink-0 overflow-hidden rounded-xl bg-fukrey-gray-900 sm:w-32">
                        <Image
                          src={item.image || "/products/placeholder.png"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-semibold hover:text-fukrey-gray-300 transition-colors">
                              <Link href={`/product/${item.id}`}>{item.name}</Link>
                            </h3>
                            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-fukrey-gray-500">
                              {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                              {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                            </div>
                          </div>
                          <p className="text-lg font-bold">{formatPrice(item.price)}</p>
                        </div>

                        <div className="mt-6 flex items-center justify-between sm:mt-auto">
                          {/* Quantity Selector */}
                          <div className="flex items-center rounded-lg border border-white/10 p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-white/5 disabled:opacity-30"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-white/5"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                            className="text-xs font-medium uppercase tracking-widest text-fukrey-gray-500 hover:text-red-400 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Summary Section */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 rounded-2xl bg-white p-6 text-black shadow-xl sm:p-8">
                <h2 className="text-xl font-bold">Order Summary</h2>
                
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between text-fukrey-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-fukrey-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                  </div>
                  <div className="border-t border-fukrey-gray-100 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <button className="mt-8 w-full rounded-xl bg-black py-4 text-center text-sm font-bold uppercase tracking-widest text-white hover:bg-fukrey-gray-900 transition-colors focus:ring-2 focus:ring-black focus:ring-offset-2">
                  Proceed to Checkout
                </button>

                <p className="mt-4 text-center text-xs text-fukrey-gray-500">
                  Secure checkout with encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
