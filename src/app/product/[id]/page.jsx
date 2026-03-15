"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import productsData from "@/data/products.json";
import { Footer } from "@/components";
import { useCart } from "@/context";
import { motion } from "framer-motion";

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
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [wishlistAdded, setWishlistAdded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = productsData.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="dark flex min-h-screen flex-col bg-fukrey-black">
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
    addItem(
      { ...product, selectedSize: selectedSize || product.sizes?.[0], selectedColor: selectedColor || product.colors?.[0] },
      1
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="dark flex min-h-screen flex-col bg-fukrey-black">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav className="mb-6 flex text-xs font-medium uppercase tracking-widest text-fukrey-gray-500">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/products/${product.category}`} className="hover:text-white transition-colors">
              {categoryName}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white truncate max-w-[120px] sm:max-w-none">{product.name}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16"
          >
            {/* Large product image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-fukrey-gray-900">
              <Image
                src={product.image || "/products/placeholder.png"}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {product.discount > 0 && (
                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-semibold text-black">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Product details */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <StarRating rating={product.rating} />
                <Link
                  href={`/products/${product.category}`}
                  className="text-sm text-fukrey-gray-400 hover:text-white transition-colors"
                >
                  {categoryName}
                </Link>
              </div>

              {/* Price */}
              <div className="mt-6 flex flex-wrap items-baseline gap-3">
                {discountedPrice ? (
                  <>
                    <span className="text-2xl font-bold text-white sm:text-3xl">{discountedPrice}</span>
                    <span className="text-lg text-fukrey-gray-500 line-through">{priceFormatted}</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-white sm:text-3xl">{priceFormatted}</span>
                )}
              </div>

              {/* Description */}
              <p className="mt-6 text-fukrey-gray-400 leading-relaxed">{product.description}</p>

              {/* Sizes */}
              {product.sizes?.length > 0 && (
                <div className="mt-8">
                  <p className="mb-3 text-sm font-medium text-white">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[2.75rem] rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                          selectedSize === size
                            ? "border-white bg-white text-black"
                            : "border-white/20 text-white hover:border-white/40"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {product.colors?.length > 0 && (
                <div className="mt-6">
                  <p className="mb-3 text-sm font-medium text-white">Color</p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                          selectedColor === color
                            ? "border-white bg-white text-black"
                            : "border-white/20 text-white hover:border-white/40"
                        }`}
                      >
                        {color}
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
                  className="flex-1 rounded-xl bg-white py-3.5 px-6 text-base font-semibold text-black transition-colors hover:bg-fukrey-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-fukrey-black"
                >
                  {addedToCart ? "Added to cart" : "Add to cart"}
                </button>
                <button
                  type="button"
                  onClick={() => setWishlistAdded(!wishlistAdded)}
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl border py-3.5 px-6 text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-fukrey-black ${
                    wishlistAdded
                      ? "border-amber-500 bg-amber-500/10 text-amber-500"
                      : "border-white/20 text-white hover:border-white/40"
                  }`}
                >
                  {wishlistAdded ? "✓ In wishlist" : "Add to wishlist"}
                </button>
              </div>

              <Link
                href={`/products/${product.category}`}
                className="mt-6 inline-block text-sm font-medium text-fukrey-gray-400 hover:text-white transition-colors"
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
