"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Popularity", value: "popularity" },
  { label: "Discount", value: "discount" },
];

export default function SortBar({ 
  totalItems, 
  sortBy, 
  setSortBy, 
  onMobileFilterClick,
  title = "New Arrivals",
  itemLabel = "Items"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentSort = SORT_OPTIONS.find(opt => opt.value === sortBy) || SORT_OPTIONS[0];

  return (
    <div className="sticky top-[56px] z-30 -mx-4 bg-background/95 backdrop-blur-xl border-b border-fukrey-border/30 px-4 py-3 sm:top-16 sm:mx-0 sm:px-0 sm:py-4 transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* Left: Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <h1 className="text-base font-extrabold tracking-tight text-foreground sm:text-2xl">{title}</h1>
          <div className="flex items-center gap-2 sm:gap-4">
             <span className="hidden h-4 w-[1px] bg-fukrey-border sm:block" />
             <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-fukrey-muted sm:text-[10px]">
               {totalItems} {itemLabel}
             </p>
          </div>
        </div>

        {/* Right: Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Filter Toggle */}
          <button 
            onClick={onMobileFilterClick}
            className="flex items-center gap-1.5 rounded-full border border-fukrey-border bg-background px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-foreground transition-all active:scale-95 lg:hidden"
          >
            <SlidersHorizontal className="h-3 w-3" />
            Filters
          </button>

          {/* Sort Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 rounded-full border border-fukrey-border bg-background px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-foreground transition-all active:scale-95 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-widest"
            >
              <span className="hidden text-fukrey-muted sm:inline text-[10px]">Sort by:</span>
              <span className="text-foreground">{currentSort.label}</span>
              <ChevronDown className={`h-3 w-3 transition-transform sm:h-4 sm:w-4 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 origin-top-right rounded-md border border-fukrey-border bg-background shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden">
                <div className="py-1">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsOpen(false);
                      }}
                      className={`flex w-full items-center px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest transition-colors ${
                        sortBy === option.value 
                          ? "bg-fukrey-muted/10 text-amber-600" 
                          : "text-fukrey-muted hover:bg-fukrey-muted/5 hover:text-foreground"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
