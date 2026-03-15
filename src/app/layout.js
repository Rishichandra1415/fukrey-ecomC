import { Geist, Geist_Mono } from "next/font/google";
import { Navbar, Transition } from "@/components";
import { CartProvider, WishlistProvider } from "@/context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fukrey | Men's Clothing",
  description: "Fukrey – Your style, redefined.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <WishlistProvider>
            <Transition>
              <Navbar />
              {children}
            </Transition>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
