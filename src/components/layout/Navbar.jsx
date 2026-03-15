"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

function SearchIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function WishlistIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function CartIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

function MenuIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Lock body scroll when mobile menu is open so the page doesn't scroll behind the overlay
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/new-arrivals", label: "New Arrivals" },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full border-b border-white/5 bg-fukrey-black/90 backdrop-blur-md supports-[backdrop-filter]:bg-fukrey-black/70 transition-colors duration-200"
        role="banner"
      >
        <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between gap-4 px-4">
          {/* Left: Logo */}
          <Link
            href="/"
            className="shrink-0 text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity"
            aria-label="Fukrey home"
          >
            Fukrey
          </Link>

          {/* Center: Nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-fukrey-gray-400 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right: Search, Wishlist, Cart (desktop) */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <div
              className={`flex items-center gap-2 rounded-full border bg-white/5 transition-all duration-200 ${
                searchFocused
                  ? "border-white/20 ring-1 ring-white/10"
                  : "border-white/5"
              }`}
            >
              <SearchIcon className="ml-3 h-4 w-4 text-fukrey-gray-400 shrink-0" />
              <input
                type="search"
                placeholder="Search..."
                className="w-32 lg:w-44 py-2 pr-3 bg-transparent text-sm text-white placeholder:text-fukrey-gray-500 outline-none"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                aria-label="Search products"
              />
            </div>
            <Link
              href="/wishlist"
              className="p-2 rounded-full text-fukrey-gray-700 hover:text-black hover:bg-fukrey-gray-100 dark:text-fukrey-gray-300 dark:hover:text-white dark:hover:bg-fukrey-gray-800 transition-colors"
              aria-label="Wishlist"
            >
              <WishlistIcon className="h-5 w-5" />
            </Link>
            <Link
              href="/cart"
              className="p-2 rounded-full text-fukrey-gray-700 hover:text-black hover:bg-fukrey-gray-100 dark:text-fukrey-gray-300 dark:hover:text-white dark:hover:bg-fukrey-gray-800 transition-colors"
              aria-label="Cart"
            >
              <CartIcon className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile: Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/cart"
              className="p-2 rounded-full text-fukrey-gray-400 hover:text-white transition-colors"
              aria-label="Cart"
            >
              <CartIcon className="h-5 w-5" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-fukrey-gray-400 hover:bg-white/5 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu: fixed overlay so it doesn't push page content down */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-out ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop – taps close menu, blocks scroll */}
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
        {/* Panel – below navbar (h-14 sm:h-16), scrollable if content is long */}
        <div
          className="absolute left-0 right-0 top-14 sm:top-16 bottom-0 max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/5 bg-fukrey-offblack shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3">
              <SearchIcon className="h-4 w-4 text-fukrey-gray-400 shrink-0" />
              <input
                type="search"
                placeholder="Search..."
                className="flex-1 py-3 bg-transparent text-sm text-white placeholder:text-fukrey-gray-500 outline-none"
                aria-label="Search products"
              />
            </div>
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 text-sm font-medium text-fukrey-gray-300 hover:text-white rounded-lg px-3 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-3 text-sm font-medium text-fukrey-gray-300 hover:text-white"
            >
              <WishlistIcon className="h-5 w-5" />
              Wishlist
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
