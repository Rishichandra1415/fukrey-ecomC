"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { Sparkles, Trophy, Star } from "lucide-react";

export default function TopPicks({ products }) {
  if (!products || products.length === 0) return null;

  // Assign special labels to top picks
  const labels = ["🔥 Top Pick", "⭐ Highest Rated", "👑 Customer Favorite", "✨ Trending Now", "🏆 Best Seller"];

  return (
    <section className="mb-10 sm:mb-16">
      <div className="mb-4 sm:mb-8 flex items-center gap-3">
        <div className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-amber-500/10 text-amber-600">
          <Trophy className="h-4 w-4 sm:h-7 sm:w-7" />
        </div>
        <div>
          <h2 className="text-lg sm:text-3xl font-black uppercase tracking-tight text-foreground leading-none">Top Picks</h2>
          <p className="mt-1 text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-fukrey-muted">Curated just for you</p>
        </div>
      </div>

      <div className="-mx-4 flex gap-4 overflow-x-auto pb-6 px-4 scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-3 sm:gap-8">
        {products.slice(0, 3).map((product, index) => (
          <div key={product.id} className="relative group min-w-[280px] sm:min-w-0">
            <div className="absolute -top-2 -right-2 z-30 rotate-6 rounded-md bg-foreground px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-background shadow-xl transition-transform group-hover:rotate-0 group-hover:scale-110 sm:-top-3 sm:-right-3 sm:rotate-12 sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-[10px]">
              {labels[index % labels.length]}
            </div>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
