"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * CategoryCard component for the homepage categories section.
 * Features a hover animation using Framer Motion and Tailwind CSS.
 * 
 * @param {Object} props
 * @param {string} props.title - Category title
 * @param {string} props.image - Path to category image
 * @param {string} props.href - Navigation path
 */
export default function CategoryCard({ title, image, href }) {
  return (
    <Link href={href} className="group relative block overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10 transition-shadow hover:shadow-2xl">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="relative aspect-[4/5] w-full cursor-pointer"
      >
        {/* Image */}
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:brightness-90"
          priority
        />

        {/* Dynamic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <motion.h3 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-2xl font-bold tracking-tight text-white md:text-3xl"
          >
            {title}
          </motion.h3>
          
          <motion.div
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            className="mt-2 h-0.5 bg-white/60"
          />
          
          <p className="mt-3 inline-flex items-center text-sm font-medium text-white">
            Explore Collection
            <svg 
              className="ml-2 h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
