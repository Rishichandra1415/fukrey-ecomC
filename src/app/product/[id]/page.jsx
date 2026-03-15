"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import productsData from "@/data/products.json";
import {  Footer } from "@/components";
import { useCart, useWishlist } from "@/context";
import { motion, AnimatePresence } from "framer-motion";

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-lg ${i <= full ? "text-amber-400" : i === full + 1 && half ? "text-amber-400 opacity-70" : "text-fukrey-gray-600"}`}
        >
          ★
        </span>
      ))}
      <span className="ml-1 text-sm text-fukrey-gray-400">({rating})</span>
    </div>
  );
}

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const product = productsData.find((p) => p.id === id);

  // Initialize selectedVariant once product is found
  if (product && !selectedVariant) {
    setSelectedVariant(product.variants?.[0]);
  }

  // Derived images from variants
  const productImages = product?.variants?.map(v => v.image) || [];

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <main className="flex flex-1 items-center justify-center px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Product not found</h1>
            <p className="mt-2 text-fukrey-gray-400">This product may have been removed.</p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-black hover:bg-fukrey-gray-200"
            >
              Back to home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const priceFormatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price);

  const discountedPrice =
    product.discount > 0
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(product.price * (1 - product.discount / 100))
      : null;

  const categoryName = product.category.charAt(0).toUpperCase() + product.category.slice(1);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;
    
    addToCart(
      { 
        ...product, 
        productId: product.id, // User requested field
        selectedSize: selectedSize || product.sizes?.[0], 
        selectedColor: selectedVariant.color, // For context logic
        color: selectedVariant.color, // User requested field
        image: selectedVariant.image // User requested field
      },
      1
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background transition-colors duration-200">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav className="mb-6 flex text-xs font-medium uppercase tracking-widest text-fukrey-muted">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/products/${product.category}`} className="hover:text-foreground transition-colors">
              {categoryName}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground truncate max-w-[120px] sm:max-w-none">{product.name}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16"
          >
            {/* Product Gallery */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-fukrey-muted/5 border border-fukrey-border">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full"
                  >
                    <Image
                      src={productImages[activeImage] || "/products/placeholder.png"}
                      alt={`${product.name} - Image ${activeImage + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-all duration-300"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                
                {product.discount > 0 && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-foreground px-3 py-1 text-sm font-semibold text-background">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-[4/5] w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      activeImage === index 
                        ? "border-foreground" 
                        : "border-fukrey-border opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product details */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <StarRating rating={product.rating} />
                <Link
                  href={`/products/${product.category}`}
                  className="text-sm text-fukrey-muted hover:text-foreground transition-colors"
                >
                  {categoryName}
                </Link>
              </div>

              {/* Price */}
              <div className="mt-6 flex flex-wrap items-baseline gap-3">
                {discountedPrice ? (
                  <>
                    <span className="text-2xl font-bold text-foreground sm:text-3xl">{discountedPrice}</span>
                    <span className="text-lg text-fukrey-muted line-through">{priceFormatted}</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-foreground sm:text-3xl">{priceFormatted}</span>
                )}
              </div>

              {/* Description */}
              <p className="mt-6 text-fukrey-muted leading-relaxed">{product.description}</p>

              {/* Sizes */}
              {product.sizes?.length > 0 && (
                <div className="mt-8">
                  <p className="mb-3 text-sm font-medium text-foreground">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[2.75rem] rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                          selectedSize === size
                            ? "border-foreground bg-foreground text-background"
                            : "border-fukrey-border text-foreground hover:border-foreground/40"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {product.variants?.length > 0 && (
                <div className="mt-6">
                  <p className="mb-3 text-sm font-medium text-foreground">
                    Color: <span className="text-fukrey-muted">{selectedVariant?.color || ""}</span>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant, index) => (
                      <button
                        key={variant.color}
                        type="button"
                        onClick={() => {
                          setSelectedVariant(variant);
                          setActiveImage(index);
                        }}
                        className={`group relative h-10 w-10 rounded-full border-2 transition-all p-0.5 ${
                          selectedVariant?.color === variant.color
                            ? "border-foreground"
                            : "border-fukrey-border hover:border-foreground/40"
                        }`}
                        title={variant.color}
                      >
                        <div 
                          className="h-full w-full rounded-full border border-black/10" 
                          style={{ backgroundColor: variant.colorCode }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 rounded-xl bg-foreground py-3.5 px-6 text-base font-semibold text-background transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
                >
                  {addedToCart ? "Added to cart" : "Add to cart"}
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl border py-3.5 px-6 text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background ${
                    isInWishlist(product.id)
                      ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-500"
                      : "border-fukrey-border text-foreground hover:border-foreground/40"
                  }`}
                >
                  {isInWishlist(product.id) ? "✓ In wishlist" : "Add to wishlist"}
                </button>
              </div>

              <Link
                href={`/products/${product.category}`}
                className="mt-6 inline-block text-sm font-medium text-fukrey-muted hover:text-foreground transition-colors"
              >
                ← Back to {categoryName}
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
