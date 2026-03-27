"use client";

import React, { useState } from "react";
import { X, ChevronDown, Star } from "lucide-react";

const CATEGORIES = ["Shirts", "T-Shirts", "Jeans", "Trousers"];
const COLORS = [
  { name: "White", code: "#FFFFFF" },
  { name: "Black", code: "#000000" },
  { name: "Blue", code: "#0000FF" },
  { name: "Red", code: "#FF0000" },
  { name: "Grey", code: "#808080" },
  { name: "Navy", code: "#000080" },
];
const SIZES = ["S", "M", "L", "XL", "XXL"];
const DISCOUNTS = ["10% and above", "20% and above", "30% and above"];
const RATINGS = [4, 3];

export default function FilterPanel({ filters, setFilters, clearFilters, itemCount, title = "Filters" }) {
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    color: true,
    size: true,
    discount: true,
    rating: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (section, value) => {
    const currentValues = filters[section] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setFilters({ ...filters, [section]: newValues });
  };

  const handlePriceChange = (e) => {
    setFilters({ ...filters, maxPrice: parseInt(e.target.value) });
  };

  const handleValueToggle = (section, value) => {
    const currentValues = filters[section] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setFilters({ ...filters, [section]: newValues });
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-8 pb-10">
        {/* Quick Info & Clear All */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          <button 
            onClick={clearFilters}
            className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-wider"
          >
            Clear All
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
           {["New", "Trending", "Best Seller"].map(tag => (
             <button
               key={tag}
               onClick={() => handleCheckboxChange('tags', tag)}
               className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                 (filters.tags || []).includes(tag)
                   ? "bg-foreground text-background"
                   : "bg-fukrey-muted/10 text-fukrey-muted hover:bg-fukrey-muted/20"
               }`}
             >
               {tag}
             </button>
           ))}
        </div>

        {/* Categories */}
        <div className="border-b pb-6">
          <button 
            onClick={() => toggleSection('category')}
            className="flex w-full items-center justify-between py-2 text-sm font-bold uppercase tracking-widest text-foreground"
          >
            Category
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.category ? "" : "-rotate-90"}`} />
          </button>
          {openSections.category && (
            <div className="mt-4 space-y-3">
              {CATEGORIES.map((cat) => (
                <label key={cat} className="flex items-center group cursor-pointer">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="peer h-4 w-4 appearance-none rounded border border-fukrey-border bg-background transition-all checked:bg-foreground" 
                      checked={(filters.category || []).includes(cat)}
                      onChange={() => handleCheckboxChange('category', cat)}
                    />
                    <div className="pointer-events-none absolute inset-0 hidden items-center justify-center text-background peer-checked:flex">
                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                  </div>
                  <span className="ml-3 text-sm text-fukrey-muted group-hover:text-foreground transition-colors">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="border-b pb-6">
          <button 
            onClick={() => toggleSection('price')}
            className="flex w-full items-center justify-between py-2 text-sm font-bold uppercase tracking-widest text-foreground"
          >
            Price
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.price ? "" : "-rotate-90"}`} />
          </button>
          {openSections.price && (
            <div className="mt-4 space-y-4">
              <input 
                type="range" 
                min="500" 
                max="5000" 
                step="100"
                value={filters.maxPrice || 5000}
                onChange={handlePriceChange}
                className="w-full accent-foreground h-1 bg-fukrey-muted/20 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex items-center justify-between text-xs font-bold text-fukrey-muted uppercase">
                <span>₹500</span>
                <span className="text-foreground bg-fukrey-muted/10 px-2 py-1 rounded">₹{filters.maxPrice || 5000}</span>
              </div>
            </div>
          )}
        </div>

        {/* Colors */}
        <div className="border-b pb-6">
          <button 
            onClick={() => toggleSection('color')}
            className="flex w-full items-center justify-between py-2 text-sm font-bold uppercase tracking-widest text-foreground"
          >
            Color
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.color ? "" : "-rotate-90"}`} />
          </button>
          {openSections.color && (
            <div className="mt-4 flex flex-wrap gap-3">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleValueToggle('color', color.name)}
                  className={`relative h-7 w-7 rounded-full border border-fukrey-border transition-all hover:scale-110 ${
                    (filters.color || []).includes(color.name)
                      ? "ring-2 ring-amber-600 ring-offset-2 scale-110"
                      : ""
                  }`}
                  style={{ backgroundColor: color.code }}
                  title={color.name}
                >
                   {(filters.color || []).includes(color.name) && color.name === 'White' && (
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-1 w-1 rounded-full bg-black"></div>
                     </div>
                   )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sizes */}
        <div className="border-b pb-6">
          <button 
            onClick={() => toggleSection('size')}
            className="flex w-full items-center justify-between py-2 text-sm font-bold uppercase tracking-widest text-foreground"
          >
            Size
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.size ? "" : "-rotate-90"}`} />
          </button>
          {openSections.size && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => handleValueToggle('size', size)}
                  className={`flex h-10 items-center justify-center rounded border text-xs font-bold transition-all active:scale-95 ${
                    (filters.size || []).includes(size)
                      ? "bg-foreground text-background border-foreground"
                      : "border-fukrey-border text-fukrey-muted hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Discount */}
        <div className="border-b pb-6">
          <button 
            onClick={() => toggleSection('discount')}
            className="flex w-full items-center justify-between py-2 text-sm font-bold uppercase tracking-widest text-foreground"
          >
            Discount
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.discount ? "" : "-rotate-90"}`} />
          </button>
          {openSections.discount && (
            <div className="mt-4 space-y-3">
              {DISCOUNTS.map((d) => (
                <label key={d} className="flex items-center group cursor-pointer">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="peer h-4 w-4 appearance-none rounded border border-fukrey-border transition-all checked:bg-foreground" 
                      checked={(filters.discount || []).includes(d)}
                      onChange={() => handleCheckboxChange('discount', d)}
                    />
                    <div className="pointer-events-none absolute inset-0 hidden items-center justify-center text-background peer-checked:flex">
                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                  </div>
                  <span className="ml-3 text-sm text-fukrey-muted group-hover:text-foreground transition-colors">
                    {d}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="border-b pb-6">
          <button 
            onClick={() => toggleSection('rating')}
            className="flex w-full items-center justify-between py-2 text-sm font-bold uppercase tracking-widest text-foreground"
          >
            Rating
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.rating ? "" : "-rotate-90"}`} />
          </button>
          {openSections.rating && (
            <div className="mt-4 space-y-3">
              {RATINGS.map((r) => (
                <label key={r} className="flex items-center group cursor-pointer">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="peer h-4 w-4 appearance-none rounded border border-fukrey-border transition-all checked:bg-foreground" 
                      checked={(filters.rating || []).includes(r)}
                      onChange={() => handleCheckboxChange('rating', r)}
                    />
                    <div className="pointer-events-none absolute inset-0 hidden items-center justify-center text-background peer-checked:flex">
                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                  </div>
                  <div className="ml-3 flex items-center gap-1.5 text-sm text-fukrey-muted group-hover:text-foreground transition-colors font-medium">
                    {r} + <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" /> & above
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
