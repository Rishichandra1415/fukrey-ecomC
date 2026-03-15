# Fukrey Ecommerce

Next.js ecommerce frontend for the **Fukrey** clothing brand. App Router, Tailwind CSS, JavaScript.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

Scalable folder structure for the ecommerce frontend:

```
src/
├── app/              # Next.js App Router (routes, layouts, global CSS)
├── components/       # Reusable React components (by feature/domain)
│   ├── layout/      # Header, Footer, shell
│   ├── product/     # Product cards, details, listing
│   ├── cart/        # Cart items, summary, drawer
│   ├── ui/          # Buttons, inputs, modals
│   └── home/        # Homepage sections (Hero, HeroSection, etc.)
├── data/            # Mock data, constants, static content
├── context/         # React Context (cart, theme, auth)
├── hooks/           # Custom React hooks
├── styles/          # Extra CSS (variables, shared styles)
└── utils/           # Pure helpers (format, validation)
```

---

## Routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.jsx` | Home: hero slider, category cards, New Arrivals grid. |
| `/products/[category]` | `app/products/[category]/page.jsx` | Category listing (shirts, tshirts, jeans, trousers) with sort. |
| `/product/[id]` | `app/product/[id]/page.jsx` | Product detail: image gallery, price, sizes, colors, Add to cart, wishlist. |
| `/cart` | `app/cart/page.jsx` | Shopping cart: list items, update quantity, remove items, summary. |
| `/search` | `app/search/page.jsx` | Search results: dynamic filter with grid display. |
| `/wishlist` | `app/wishlist/page.jsx` | Wishlist page: manage saved products, move to cart. |

---

## Folder Purposes

| Folder | Purpose |
|--------|--------|
| **`src/app`** | Next.js App Router: `page.js`, `layout.js`, `globals.css`, and route segments. Defines URLs and root layout. |
| **`src/components`** | All reusable UI components. Split by feature so layout, product, cart, ui, and home stay easy to find and scale. |
| **`src/components/layout`** | Shell of the site: **Header** (logo, nav, cart icon), **Footer** (links, copyright). Used in root layout. |
| **`src/components/product`** | Product-related UI: **ProductCard**, product detail view, product grid. Used on listing and product pages. |
| **`src/components/cart`** | Cart UI: **CartItem**, cart summary, cart drawer/sidebar. Used in header and cart page. |
| **`src/components/ui`** | Generic building blocks: **Button**, Input, Modal, etc. Shared across the app. |
| **`src/components/home`** | Homepage-only sections: **Hero**, **HeroSection** (full-width banner), featured products, banners. Keeps the home page modular. |
| **`src/data`** | Static/mock data (e.g. `products.js`), constants, and content. Replace with API or CMS later. |
| **`src/context`** | React Context providers (e.g. **CartContext**). Shared state for cart, theme, or auth without prop drilling. |
| **`src/hooks`** | Custom hooks (e.g. **useMediaQuery**). Reusable state and side-effect logic. |
| **`src/styles`** | Extra CSS files: design tokens, variables, shared classes. Main globals stay in `app/globals.css`. |
| **`src/utils`** | Pure utility functions: **formatPrice**, validation, URL helpers. No React, easy to test. |

---

## Key Files (Code Overview)

### App & routes

- **`src/app/layout.js`** – Root layout: fonts, metadata, `CartProvider`, `Navbar`, and `{children}`.
- **`src/app/page.jsx`** – Home page: HeroSection, category cards, New Arrivals (ProductGrid), Footer.
- **`src/app/products/[category]/page.jsx`** – Category listing: products filtered by category, sort (price/rating), ProductGrid.
- **`src/app/product/[id]/page.jsx`** – Product detail: interactive gallery, name, price, discount, rating, sizes, colors, description, Add to cart, Add to wishlist (centralized context).
- **`src/app/cart/page.jsx`** – Shopping cart: view items, total price calculation, quantity management.
- **`src/app/search/page.jsx`** – Search results: dynamic product matching with consistent grid layout.
- **`src/app/wishlist/page.jsx`** – Wishlist: centralized store for saved items with "Move to Cart" functionality.
- **`src/app/globals.css`** – Global styles, Tailwind, Fukrey theme (dark mode, container, scrollbar).

### Components

- **`components/layout/Navbar.jsx`** – Sticky navbar: logo (left), Home / New Arrivals (center), search + wishlist + cart (right). Mobile hamburger menu, dark mode support.
- **`components/layout/Header.js`** – Legacy header; use **Navbar** for the main site header.
- **`components/layout/Footer.js`** – Site footer; add links and copyright.
- **`components/product/ProductCard.jsx`** – Premium card with interactive features:
  - **Image Slider**: Multiple images with smooth transitions and dot indicators.
  - **Color Selection**: Interactive swatches below the rating (limited to first 3 with a `+N` overflow indicator). High-contrast selection indicator (`border-2 border-black`).
  - **Select Size Overlay**: "Quick Add" functionality via Cart icon to select sizes directly from the card.
  - **Wishlist Toggle**: Independent heart button for fast saving.
  - **Toast Notifications**: Real-time feedback for Cart and Wishlist actions using **React Hot Toast**.
  - **Full Navigation**: Click anywhere else to view full product details.
- **`components/product/ProductGrid.jsx`** – Responsive grid of ProductCards used throughout the app.
- **`components/product/ProductFilter.jsx`** – Premium filtering toolbar with sorting by Price, Rating, and Highest Discount.
- **`components/cart/CartItem.js`** – One line item in the cart; receives `item` prop.
- **`components/ui/Button.js`** – Reusable button; `variant`: `primary` | `secondary`.
- **`components/home/Hero.js`** – Simple hero text block.
- **`components/home/HeroSection.jsx`** – Full-width homepage hero: fashion-style background image, headline “Fukrey – Style for Men”, subtitle “New arrivals for modern men”, Shop Now button. Responsive, Tailwind.

Each group has an **`index.js`** that re-exports components for clean imports, e.g.:

```js
import { Navbar, Footer, HeroSection, Hero, Button, ProductCard } from "@/components";
```

### Data

- **`src/data/products.json`** – Dummy product dataset for men’s clothing (20 products). Schema below.
- **`src/data/products.js`** – Optional JS export of sample products; can import from JSON for app use.

### Context

- **`src/context/CartContext.jsx`** – Comprehensive `CartProvider` and `useCart()` for cart state management.
  - **State:** `cart` (array of items)
  - **Actions:** `addToCart(product, quantity)` (persists variant color and image), `removeFromCart(productId)`, `updateQuantity(productId, quantity)`, `clearCart()`
  - **Computed values:** `totalItems`, `totalPrice`
- **`src/context/WishlistContext.jsx`** – Centralized wishlist provider.
  - **Actions:** `toggleWishlist(product)`, `isInWishlist(productId)`, `moveToCart(product)`
- **`src/context/ThemeContext.js`** – Professional `ThemeProvider` for system-wide dark mode with local persistence and smooth transitions.

Use in layout:

```js
import { CartProvider } from "@/context";

// in layout:
<CartProvider>
  <Navbar />
  {children}
</CartProvider>
```

### Hooks

- **`src/hooks/useMediaQuery.js`** – `useMediaQuery("(min-width: 768px)")` for responsive or dark-mode logic.

### Utils

- **`src/utils/format.js`** – `formatPrice(amount, currency)` for consistent price display.

---

## Product dataset

**File:** `src/data/products.json`

Dummy dataset for a men’s clothing ecommerce store: **20 products** across 4 categories.

### Categories

| Category  | Count | Examples                    |
|----------|-------|-----------------------------|
| shirts   | 5     | Oxford, Linen, Dress, Denim |
| tshirts  | 5     | Crew, V-neck, Polo, Henley  |
| jeans    | 5     | Slim, Regular, Tapered      |
| trousers | 5     | Chino, Formal, Jogger, Cargo|

### Product schema

Each product object includes:

| Field | Type | Description |
|----------------|----------|--------------------------------------------------|
| **id** | string | Unique product ID |
| **name** | string | Product title |
| **category** | string | One of: `shirts`, `tshirts`, `jeans`, `trousers` |
| **price** | number | Price in INR (e.g. 2499) |
| **discount** | number | Discount percentage (0–30) |
| **variants** | object[] | Array of color variants: `{ color, colorCode, image }` |
| **description** | string | Short product description |
| **sizes** | string[] | Available sizes (e.g. `["S","M","L","XL"]`) |
| **rating** | number | Average rating (e.g. 4.5) |

### Example usage

```js
import products from "@/data/products.json";

// Filter by category
const shirts = products.filter((p) => p.category === "shirts");

// Get product by id
const product = products.find((p) => p.id === "11");

// Price after discount
const finalPrice = product.price * (1 - product.discount / 100);
```

Image paths point to `public/products/`. Add real images under `public/products/` or replace with URLs.

---

## Product detail page

**Route:** `src/app/product/[id]/page.jsx`  
**URL:** `/product/1`, `/product/2`, … (product ID from `products.json`)

Single-product page with responsive layout: image and details side-by-side on desktop, stacked on mobile.

| Element | Description |
|--------|-------------|
| **Image Gallery** | Interactive main image with clickable thumbnails. Smooth fade transitions using Framer Motion. |
| **Product details** | Heading, category path, description, and premium star rating. |
| **Price** | INR formatting; original price with strikethrough when discount exists. |
| **Sizes** | Selectable button group for sizes. |
| **Colors** | Interactive color circles with selection sync. Updates main gallery and includes label like `Color: Grey`. |
| **Add to cart** | Integrated with `CartContext` with real-time feedback. |
| **Add to wishlist** | Integrated with `WishlistContext`, persists across navigation. |

**Not found:** Invalid `id` shows “Product not found” and a link back home.  
**Navigation:** Breadcrumb (Home / Category / Product name); “Back to [Category]” link. `ProductCard` links to `/product/[id]`.

---

## Hero section

**File:** `src/components/home/HeroSection.jsx`

Full-width homepage hero banner with:

- **Layout:** Full width, responsive min-height (70vh–80vh), centered content.
- **Background:** Fashion-style background image with gradient overlay for text readability. Fallback gradient when no image is set.
- **Copy:** Headline “Fukrey – Style for Men”, subtitle “New arrivals for modern men”.
- **Hero Slider:** Multiple slides with smooth crossfade; dot indicators; mobile-friendly background position.
- **Responsive:** Centered content; dark overlay for text contrast.

### Hero background image

Set your banner image so the hero uses it:

1. Add an image to **`public/hero-banner.jpg`** (or `.webp` / `.png`), or  
2. In `HeroSection.jsx`, set `HERO_IMAGE` to your image path or a full URL:

```js
const HERO_IMAGE = "/hero-banner.jpg";  // from public/
// or
const HERO_IMAGE = "https://example.com/your-fashion-banner.jpg";
```

If no image is present, the section still renders with a dark gradient background.

### Using the Hero on the home page

```js
import { HeroSection, Footer } from "@/components";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <main className="flex-1">{/* featured products, etc. */}</main>
      <Footer />
    </div>
  );
}
```

---

## Usage Tips

1. **Imports** – Use `@/components`, `@/context`, `@/hooks`, `@/utils`, `@/data` (ensure `jsconfig.json` or `tsconfig` has `"@/*": ["./src/*"]`).
2. **New components** – Add under the right group (layout, product, cart, ui, home), then export from that group’s `index.js` and from `components/index.js` if you want a single entry point.
3. **Cart** – Wrap the app in `CartProvider` in `app/layout.js`, then use `useCart()` in Header (cart icon count) and cart page/drawer.
4. **Styles** – Keep Fukrey theme and globals in `app/globals.css`; use `src/styles` for extra tokens or shared CSS.

---

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

---

## Tech Stack

- **Next.js** (App Router), **React 19**, **Tailwind CSS v4**, **Framer Motion**, **Lucide React**, **React Hot Toast**, **ESLint**
- **Fukrey theme:** black & white, class-based dark mode, container, smooth transitions (`tailwind.config.js`, `globals.css`)
