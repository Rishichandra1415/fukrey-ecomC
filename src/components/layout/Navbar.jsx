"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart, useWishlist, useTheme } from "@/context";
import productsData from "@/data/products.json";
import Image from "next/image";

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

function HomeIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function NewIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  );
}

function AboutIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ContactIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function SunIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l.707.707M6.343 6.343l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  );
}

function FlameIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.99 7.99 0 0120 13a7.99 7.99 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14l-1.121 2.121z" />
    </svg>
  );
}

function MoonIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}

function ThemeToggle({ className }) {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) return <div className={`h-9 w-9 ${className}`} />;

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full text-fukrey-muted hover:text-foreground hover:bg-fukrey-muted/10 transition-colors ${className}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
    </button>
  );
}

function SearchBar({ searchQuery, setSearchQuery, handleSearchSubmit, searchFocused, setSearchFocused, className, inputClassName }) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  useEffect(() => {
    if (q) {
      setSearchQuery(q);
    }
  }, [q, setSearchQuery]);

  const liveResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return productsData
      .filter((p) => p.name.toLowerCase().includes(lowerQuery))
      .slice(0, 5);
  }, [searchQuery]);

  return (
    <div className={`relative ${className}`}>
      <form
        onSubmit={handleSearchSubmit}
        className={`flex items-center gap-2 rounded-full border bg-fukrey-muted/10 transition-all duration-200 ${
          searchFocused ? "border-fukrey-border ring-1 ring-fukrey-border/50" : "border-fukrey-border/20"
        }`}
      >
        <SearchIcon className="ml-3 h-4 w-4 text-fukrey-muted shrink-0" />
        <input
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`py-2 pr-3 bg-transparent text-sm text-foreground placeholder:text-fukrey-muted/60 outline-none ${inputClassName}`}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
          aria-label="Search products"
        />
      </form>

      {searchFocused && liveResults.length > 0 && (
        <div className="absolute top-full right-0 z-[60] mt-2 w-72 sm:w-80 rounded-xl border border-fukrey-border bg-background p-2 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-1">
            {liveResults.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setSearchFocused(false)}
                className="flex items-center gap-3 rounded-lg p-2 hover:bg-fukrey-muted/10 transition-colors group"
              >
                <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded bg-fukrey-muted/5 border border-fukrey-border">
                  <Image 
                    src={product.image || product.variants?.[0]?.image || product.variants?.[0]?.images?.[0] || "/products/placeholder.png"} 
                    alt={product.name} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium text-foreground">{product.name}</p>
                  <p className="text-xs text-fukrey-muted capitalize">{product.category}</p>
                </div>
                <p className="text-xs font-bold text-foreground">₹{product.price}</p>
              </Link>
            ))}
            <button
              onClick={handleSearchSubmit}
              className="mt-1 border-t border-fukrey-border pt-2 text-center text-xs font-semibold text-fukrey-muted hover:text-foreground transition-colors"
            >
              View all results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();

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
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/new-arrivals", label: "New Arrivals", icon: NewIcon },
    { href: "/best-sellers", label: "Best Sellers", icon: FlameIcon },
    { href: "/about", label: "About", icon: AboutIcon },
    { href: "/contact", label: "Contact Us", icon: ContactIcon },
  ];

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full border-b border-fukrey-border bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 transition-colors duration-200"
        role="banner"
      >
        <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between gap-4 px-4">
          <Link
            href="/"
            className="shrink-0 text-xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
            aria-label="Fukrey home"
          >
            Fukrey
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-fukrey-muted hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <Suspense fallback={<div className="h-10 w-44 rounded-full bg-fukrey-muted/10 animate-pulse" />}>
              <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearchSubmit={handleSearchSubmit}
                searchFocused={searchFocused}
                setSearchFocused={setSearchFocused}
                inputClassName="w-32 lg:w-44"
              />
            </Suspense>
            <Link
              href="/wishlist"
              className="relative p-2 rounded-full text-fukrey-muted hover:text-foreground hover:bg-fukrey-muted/10 transition-colors"
              aria-label={`Wishlist with ${totalWishlistItems} items`}
            >
              <WishlistIcon className="h-5 w-5" />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background ring-2 ring-background">
                  {totalWishlistItems}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative p-2 rounded-full text-fukrey-muted hover:text-foreground hover:bg-fukrey-muted/10 transition-colors"
              aria-label={`Cart with ${totalItems} items`}
            >
              <CartIcon className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background ring-2 ring-background">
                  {totalItems}
                </span>
              )}
            </Link>
            <ThemeToggle />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/cart"
              className="relative p-2 rounded-full text-fukrey-muted hover:text-foreground transition-colors"
              aria-label={`Cart with ${totalItems} items`}
            >
              <CartIcon className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
                  {totalItems}
                </span>
              )}
            </Link>
            <ThemeToggle className="text-fukrey-muted hover:text-foreground hover:bg-fukrey-muted/10" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-fukrey-muted hover:bg-fukrey-muted/10 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-out ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute left-0 right-0 top-14 sm:top-16 bottom-0 overflow-y-auto border-t border-fukrey-border bg-background shadow-xl transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-y-0" : "-translate-y-2"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <Suspense fallback={<div className="h-12 w-full rounded-full bg-fukrey-muted/10 animate-pulse" />}>
              <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearchSubmit={handleSearchSubmit}
                searchFocused={searchFocused}
                setSearchFocused={setSearchFocused}
                className="flex-1"
                inputClassName="flex-1 py-3"
              />
            </Suspense>
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-3 text-sm font-medium text-fukrey-muted hover:text-foreground rounded-lg px-3 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              ))}
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 text-sm font-medium text-fukrey-muted hover:text-foreground rounded-lg px-3 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <WishlistIcon className="h-5 w-5" />
                  Wishlist
                </div>
                {totalWishlistItems > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background ring-2 ring-background">
                    {totalWishlistItems}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
