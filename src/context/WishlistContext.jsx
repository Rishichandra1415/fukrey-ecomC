"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("fukrey-wishlist");
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("fukrey-wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isInitialized]);

  const addToWishlist = useCallback((product) => {
    setWishlistItems((prevItems) => {
      // Check if product already exists in wishlist
      if (prevItems.some((item) => item.id === product.id)) {
        return prevItems;
      }
      return [...prevItems, product];
    });
    toast.success("Added to wishlist!");
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems((prevItems) => 
      prevItems.filter((item) => item.id !== productId)
    );
    toast.success("Removed from wishlist.");
  }, []);

  const toggleWishlist = useCallback((product) => {
    const isAdding = !wishlistItems.some((item) => item.id === product.id);
    
    setWishlistItems((prevItems) => {
      const exists = prevItems.some((item) => item.id === product.id);
      if (exists) {
        return prevItems.filter((item) => item.id !== product.id);
      }
      return [...prevItems, product];
    });

    if (isAdding) {
      toast.success("Added to wishlist!");
    } else {
      toast.success("Removed from wishlist.");
    }
  }, [wishlistItems]);

  const isInWishlist = useCallback((productId) => {
    return wishlistItems.some((item) => item.id === productId);
  }, [wishlistItems]);

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  const totalWishlistItems = useMemo(() => wishlistItems.length, [wishlistItems]);

  const value = useMemo(() => ({
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    totalWishlistItems
  }), [wishlistItems, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, clearWishlist, totalWishlistItems]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
