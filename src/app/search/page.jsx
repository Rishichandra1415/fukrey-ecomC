"use client";

import React, { use, useMemo } from "react";
import productsData from "@/data/products.json";
import { ProductGrid, Footer } from "@/components";
import Link from "next/link";

export default function SearchPage({ searchParams }) {
  // Extract query from searchParams
  const params = use(searchParams);
  const query = params.q || "";

  // Filter products based on query
  const filteredProducts = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return productsData.filter((product) =>
      product.name.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              {query ? `Search results for "${query}"` : "Search Products"}
            </h1>
            <p className="mt-2 text-fukrey-muted">
              {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"} found
            </p>
          </div>
 
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="mt-12 text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-fukrey-muted/10 text-fukrey-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-foreground">No products found</h2>
              <p className="mt-2 text-fukrey-muted">Try checking your spelling or using more general terms.</p>
              <Link
                href="/"
                className="mt-8 inline-block rounded-lg bg-foreground px-8 py-3 text-sm font-semibold text-background hover:opacity-90 transition-opacity"
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
