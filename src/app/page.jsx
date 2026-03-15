"use client";

import productsData from "@/data/products.json";
import { 
  Navbar, 
  HeroSection, 
  CategoryCard, 
  ProductGrid, 
  Footer,
  Transition 
} from "@/components";

/**
 * Homepage layout assembling:
 * 1. Navbar (Sticky)
 * 2. HeroSection (Banner Slider)
 * 3. CategoryCards (Shirts, T-Shirts, Jeans, Trousers)
 * 4. New Arrivals (First 8 products)
 * 5. Footer
 */
export default function Home() {
  // Load first 8 products for "New Arrivals"
  const newArrivals = productsData.slice(0, 8);

  const categories = [
    { title: "Shirts", image: "/images/categories/shirts.png", href: "/products/shirts" },
    { title: "T-Shirts", image: "/images/categories/t-shirts.png", href: "/products/tshirts" },
    { title: "Jeans", image: "/images/categories/jeans.png", href: "/products/jeans" },
    { title: "Trousers", image: "/images/categories/trousers.png", href: "/products/trousers" },
  ];

  return ( 
    <div className="flex min-h-screen flex-col">

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Category Cards Section */}
        <section className="py-16 md:py-24 bg-fukrey-bg">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Browse Categories
              </h2>
              <div className="mt-2 h-1 w-20 bg-foreground" />
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((cat) => (
                <CategoryCard 
                  key={cat.title} 
                  title={cat.title} 
                  image={cat.image} 
                  href={cat.href} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals Section */}
        <ProductGrid 
          title="New Arrivals" 
          products={newArrivals} 
        />
        
        {/* Promotion / Feature Section (Optional but good for WOW factor) */}
        {/* <section className="relative overflow-hidden py-16 text-white md:py-24">
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-6xl">
              FUKREY EXCLUSIVE
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-fukrey-gray-300">
              Limited edition collections designed for the modern man. Style that speaks for itself.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <button className="rounded-full bg-white px-8 py-3 text-sm font-bold text-black transition-all hover:scale-105 active:scale-95">
                Join the Club
              </button>
              <button className="rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-bold backdrop-blur-sm transition-all hover:bg-white/20">
                View Collection
              </button>
            </div>
          </div>
          Decorative Background Elements
          <div className="absolute top-1/2 left-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-1/2 right-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
        </section> */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
