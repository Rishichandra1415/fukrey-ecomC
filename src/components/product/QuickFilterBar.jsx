"use client";

import React from "react";

const QUICK_CATEGORIES = ["All", "Shirts", "T-Shirts", "Jeans", "Trousers"];

export default function QuickFilterBar({ activeCategory, setActiveCategory }) {
  return (
    <div className="-mx-4 flex items-center gap-2 overflow-x-auto pb-6 px-4 scrollbar-hide sm:mx-0 sm:gap-3 sm:pb-8">
      {QUICK_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat === "All" ? "" : cat.toLowerCase())}
          className={`whitespace-nowrap rounded-full px-5 py-2 text-[9px] font-black uppercase tracking-widest transition-all sm:px-6 sm:py-2.5 sm:text-[10px] ${
            (activeCategory === "" && cat === "All") || (activeCategory === cat.toLowerCase())
              ? "bg-foreground text-background shadow-lg scale-105"
              : "border border-fukrey-border bg-background text-fukrey-muted hover:border-foreground hover:text-foreground"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
