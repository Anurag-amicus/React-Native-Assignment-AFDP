# Online Express — React Native Assignments

A modern e-commerce mobile application built with **React Native**, **Expo Router**, and **TypeScript**.

---

## 📋 Assignment Overview

### Assignment 1 — Setup & Hello React Native

**Problem Statement:**
Set up a new React Native application using Expo with TypeScript. Create a Welcome screen with an app title, description, and button. Clicking the button should log a message to the console.

**Key Deliverables & Implementation:**

- **Project Setup:** Initialized an Expo project with TypeScript and file-based routing (`expo-router`).
- **Welcome Screen UI:** Built a clean landing screen displaying the store title (_"Online Express"_), an introductory description, and action buttons.
- **Button Interaction:** Implemented a `<Pressable>` button that logs `"Welcome to React Native!"` to the console upon pressing.
- **Routing & Navigation:** Preserved the Welcome Screen at `src/app/welcome.tsx` with an additional navigation button to browse products (`router.push("/")`).

**Relevant Files:**

- [`src/app/welcome.tsx`](src/app/welcome.tsx) (Initial commit: `371d14b`)

---

### Assignment 2 — Product Card Component & Grid Listing

**Problem Statement:**
Create a reusable `ProductCard` component with an image, title, price, rating, and an "Add to Cart" button using React Native components and `StyleSheet`. Display 4+ cards in a responsive layout with TypeScript typing.

**Key Deliverables & Implementation:**

1. **Reusable Core Components:**
   - **`Card` ([`src/components/common/Card.tsx`](src/components/common/Card.tsx)):** Reusable container supporting multiple variants (`elevated`, `outlined`, `flat`) using `variantCardStyles`.
   - **`Button` ([`src/components/common/Button.tsx`](src/components/common/Button.tsx)):** Reusable button supporting multiple variants (`primary`, `secondary`, `outline`) managing container and text contrast styles.

2. **TypeScript Strict Typing:**
   - [`src/types/product.ts`](src/types/product.ts): Defines the `Product` data model (`id`, `name`, `category`, `price`, `rating`, `imageUrl`).
   - [`src/types/card.ts`](src/types/card.ts): Strongly typed `CardProps` and `CardVariant`.
   - [`src/types/button.ts`](src/types/button.ts): Strongly typed `ButtonProps` and `ButtonVariant`.

3. **Product Card Component ([`src/components/products/ProductCard.tsx`](src/components/products/ProductCard.tsx)):**
   - Composes the reusable `Card` and `Button` components.
   - Remote image loading with `resizeMode="cover"` and rounded corner clipping (`overflow: "hidden"`).
   - Category tag and single-line truncated title (`numberOfLines={1}`).
   - Formatted INR price display (`₹{price.toLocaleString()}`).
   - Star rating row using `@react-native-vector-icons/ionicons` vertically centered with the rating score and review count.
   - "Add to Cart" interaction displaying a native feedback alert (`Alert.alert`) and logging the action.

4. **Responsive 2-Column Grid Layout ([`src/app/index.tsx`](src/app/index.tsx)):**
   - Uses React Native's performant, virtualized `<FlatList>` with `numColumns={2}`.
   - Row spacing handled via `columnWrapperStyle` and equal card distribution with `flex: 1`.
   - Displays 8 products from [`src/data/products.json`](src/data/products.json).

5. **Fixed Full-Width App Header:**
   - Fixed header at the top outside of the scrollable list.
   - Integrated with `useSafeAreaInsets` from `react-native-safe-area-context` for seamless notch and status bar spacing on iOS and Android.

---

### Assignment 3 — Reusable Button & Card Library

**Problem Statement:**
Build reusable Button and Card components with multiple variants, sizes and disabled states.

**Key Deliverables & Implementation:**

1. **Enhanced Button Component ([`src/components/common/Button.tsx`](src/components/common/Button.tsx)):**
   - **5 Variants:** `primary`, `secondary`, `outline`, `danger`, and `generic` with coordinated container and text contrast styles.
   - **3 Sizes:** `small` (12px text / compact padding), `medium` (14px text / standard), and `large` (16px text / spacious padding).
   - **Disabled State:** `disabled?: boolean` prop that dims opacity (`0.5`), disables interactions, and sets accessible screen reader states.
   - **Flexible Children/Title:** Supports passing either `title="Label"` or nested `children` (icons, spinners, custom text).
   - **Tactile Pressed Feedback:** Smooth scale and opacity reduction on touch (`{ scale: 0.98 }`).
   - **Routing Link:** Built-in `href` prop utilizing Expo Router's `<Link asChild>`.

2. **Enhanced Card Component ([`src/components/common/Card.tsx`](src/components/common/Card.tsx)):**
   - **Variants:** `elevated` (3D shadow depth), `bordered` / `outlined` (2px boundary border), and `flat` (subtle surface background).
   - Clean container accepting custom layout and styling overrides.

---

### Assignment 4 — Quantity Selector & Dynamic Total

**Problem Statement:**
Build quantity selector with + and - buttons, dynamic total calculation and Add to Cart alert using useState.

**Key Deliverables & Implementation:**

1. **Centralized Theme Tokens ([`src/theme/colors.ts`](src/theme/colors.ts)):**
   - Migrated CSS variables from Next.js `@theme` (`orange`, `charcoal`, `border`, `surface`, etc.) to a centralized TypeScript color system for unified mobile styling.

2. **Pure QuantitySelector Component ([`src/components/common/QuantitySelector.tsx`](src/components/common/QuantitySelector.tsx)):**
   - Clean stepper pill with decrease (`−`) and increase (`+`) buttons and numeric quantity display.
   - Disabled button states when reaching `min` (default 1) or `max` (default 50).
   - Fully controlled component via `quantity` and `onChange(newQuantity)`.

3. **Dynamic Total & Alert Integration in ProductCard ([`src/components/products/ProductCard.tsx`](src/components/products/ProductCard.tsx)):**
   - Stateful local quantity managed via `useState(1)`.
   - Real-time dynamic total calculation: `totalPrice = price * quantity`.
   - Styled to match the Next.js product card with orange uppercase title, rating stars, unit price, quantity stepper, dynamic total, and "ADD TO CART" button.
   - Native `Alert.alert` dialog triggered on Add to Cart showing item count, product name, and formatted total price.

---

### Assignment 5 — Mini Product List Screen with Filters & Search

**Problem Statement:**
Create FlatList-based product listing with category filters and product count.

**Key Deliverables & Implementation:**

1. **Collapsible Mobile Filter Sidebar ([`src/components/products/filters/FilterSidebar.tsx`](src/components/products/filters/FilterSidebar.tsx)):**
   - Full mobile port of Next.js `Sidebar.tsx` with an interactive collapsible accordion (`FILTERS +/−`).
   - Integrates 5 sub-filter modules:
     - **Category Filter:** Multiple categories with active checkbox states and dynamic "More / Less" expansion.
     - **Brand Filter:** Brand options with checkboxes and "More / Less" expansion.
     - **Price Filter:** Bounded price ranges (`₹0 - ₹10,000`, `₹10,000 - ₹50,000`, etc.).
     - **Rating Filter:** Star threshold options (`★★★★ & above`, `★★★ & above`).
     - **Sort Filter:** Multi-field sorting (`Name`, `Price`, `Ratings`) with expandable directions (`A → Z`, `Low to High`, etc.) and a clear `×` button.

2. **Real-Time Search Bar ([`src/components/layout/SearchBar.tsx`](src/components/layout/SearchBar.tsx)):**
   - Live search input with instant filtering across product names, categories, and brands, featuring a quick-clear button.

3. **Dynamic Results Count Bar ([`src/components/products/ProductCountBar.tsx`](src/components/products/ProductCountBar.tsx)):**
   - Live results counter displaying `"Showing X of Y results"`, active query terms, and current sort direction.

4. **Async Service Architecture ([`src/services/productService.ts`](src/services/productService.ts)):**
   - Future-ready API layer with `getProducts(params)`, `getCategories()`, and `getBrands()`, decoupling UI components from the underlying data source.

5. **Integrated Product Grid ([`src/app/index.tsx`](src/app/index.tsx)):**
   - 2-column virtualized `<FlatList>` with sticky `<Header />`, collapsible filter accordion, product count status, and clean empty state (`"No products found"`).

---

### Assignment 6 — Static Home Screen & Modern Native Architecture

**Problem Statement:**
Build Home Screen with header, hero banner, categories, featured products and footer navigation.

**Key Deliverables & Implementation:**

1. **Native Bottom Tab Navigation ([`src/app/(tabs)/_layout.tsx`](src/app/(tabs)/_layout.tsx)):**
   - 4-tab thumb navigation (`Home`, `Explore`, `Cart`, `Profile`) with active brand tint, replacing the desktop website footer.

2. **Top App Bar & Floating Search Pill ([`src/components/layout/TopAppBar.tsx`](src/components/layout/TopAppBar.tsx)):**
   - Safe area status bar, brand logo on left, cart with live badge on right, and an integrated floating bubble search pill.

3. **Curated Hero Promo Card ([`src/components/home/HeroSection.tsx`](src/components/home/HeroSection.tsx)):**
   - Rounded promo card (`borderRadius: 20`) with high-res photography, dark scrim gradient, and "Explore Collection" CTA (no discount badges).

4. **Visual Category Cards ([`src/components/home/CategorySection.tsx`](src/components/home/CategorySection.tsx)):**
   - Horizontal scrolling cards with rounded borders (`borderRadius: 16`), distinct category icons, and high-res background imagery.

5. **Featured Products Strip ([`src/components/home/FeaturedSection.tsx`](src/components/home/FeaturedSection.tsx)):**
   - Horizontal scroll strip showcasing featured products using the modernized `ProductCard`.

6. **Native Enhancements Across App:**
   - **Cleaner Product Card Anatomy ([`src/components/products/ProductCard.tsx`](src/components/products/ProductCard.tsx)):** Soft elevation, floating rating badge, and streamlined Add to Cart pill.
   - **Filter Chips & Bottom Sheet ([`src/components/products/filters/FilterBottomSheet.tsx`](src/components/products/filters/FilterBottomSheet.tsx)):** Sticky quick-filter chips and native slide-up modal.
   - **Dedicated Cart & Profile ([`src/app/(tabs)/cart.tsx`](src/app/(tabs)/cart.tsx), [`src/app/(tabs)/profile.tsx`](src/app/(tabs)/profile.tsx)):** Interactive checkout and native account menu.

---

### Assignment 7 — Fetch & Display Products from REST API

**Problem Statement:**
Use `useEffect` and `fetch`/Axios to load products from API with loading, error and success states.

**Key Deliverables & Implementation:**

1. **Pure Fetch API Client ([`src/services/apiClient.ts`](src/services/apiClient.ts)):**
   - Lightweight, standalone fetch wrapper returning a strongly typed `ApiResult<T>` discriminated union (`{ success: true, data: T } | { success: false, status: number, error: string }`).
   - Standardizes JSON/text error parsing and intercepts `AbortError` cleanly with status `499` ("Request was cancelled.").

2. **Live REST API Integration ([`src/services/productService.ts`](src/services/productService.ts)):**
   - Directly fetches live catalog data from FakeStore API (`https://fakestoreapi.com/products` and `https://fakestoreapi.com/products/categories`).
   - Maps raw `ProductResponse` DTOs into clean domain `Product` models with INR price scaling.
   - Executes client-side multi-faceted filtering (string category matching, price range, rating threshold) and multi-field sorting on the fetched product array.
   - Returns structured `ApiResult` directly without throwing uncaught exceptions.

3. **Animated Skeleton Loading Cards ([`src/components/products/ProductCardSkeleton.tsx`](src/components/products/ProductCardSkeleton.tsx)):**
   - Native animated looping pulse skeleton card replicating the exact visual layout and dimensions of `ProductCard` (image placeholder, category badge, 2-line title, price, and action button).
   - Provides `ProductGridSkeleton` for 2-column virtualized list loading, eliminating jarring spinners.

4. **Error & Retry Handling ([`src/app/(tabs)/explore.tsx`](src/app/(tabs)/explore.tsx)):**
   - User-friendly error view displaying an alert circle icon, clear status message, and an interactive **"Try Again"** button to retry failed requests.

5. **Pull-to-Refresh Functionality:**
   - Native `RefreshControl` integrated into the Explore screen's `FlatList` with brand color palette (`colors.orange`), allowing smooth pull-down refreshes without unmounting the list or interrupting user flow.

6. **`AbortController` Lifecycle Cleanup:**
   - Full `AbortController` integration in `useEffect` across Explore Screen and Home Screen sections (`FeaturedSection` & `CategorySection`).
   - Automatically cancels pending requests on rapid filter/search inputs or screen unmounts, preventing state leaks and out-of-order responses.

7. **Production Performance & Architecture Optimizations:**
   - **`useDebounce` Hook ([`src/hooks/useDebounce.ts`](src/hooks/useDebounce.ts)):** 300ms debounce on search queries to eliminate redundant API/filter computations on every keystroke.
   - **Pure `async / await` Architecture:** All legacy `.then` and `Promise.resolve().then` chains converted to standard `try / catch / finally` blocks with early unmount guards (`isCurrent`).
   - **Route Params as Single Source of Truth:** Replaced redundant mirrored local state and render-time comparisons with Expo Router's `router.setParams()`.
   - **Optimized Image Pipeline (`expo-image`):** Integrated `expo-image` across `ProductCard`, `CategorySection`, `HeroSection`, and `cart` with `memory-disk` cache policies and fade transitions (`transition={200}`).
   - **Synchronized Skeleton Pulse (`usePulseAnimation`):** Unified skeleton pulse timer driving all cards simultaneously, preventing duplicate animation loops.
   - **Virtualized FlatList Tuning:** Configured `initialNumToRender`, `maxToRenderPerBatch`, `windowSize`, and `removeClippedSubviews` for smooth 60fps scrolling and reduced memory consumption on mobile.

---

### Assignment 8 — Product Listing with Search & Filter

**Problem Statement:**
Implement real-time search, category filter, sorting and empty states in product listing.

**Key Deliverables & Implementation:**

1. **Dual Action Toolbar ([`src/components/products/filters/FilterSortBar.tsx`](src/components/products/filters/FilterSortBar.tsx)):**
   - 50/50 split mobile action bar positioned directly beneath the live SearchBar:
     - **Left (`Filter`):** Shows options icon with active badge dot, opening the Category Filter bottom sheet.
     - **Right (`Sort`):** Shows swap vertical icon with active badge dot, opening the Sort bottom sheet.

2. **Category Filter Slide-Up Sheet ([`src/components/products/filters/FilterBottomSheet.tsx`](src/components/products/filters/FilterBottomSheet.tsx)):**
   - Dedicated category bottom sheet with drag handle, active count indicator, `"Reset"` action, and the full category checkbox hierarchy (`All`, `Electronics`, `Jewelery`, `Men's Clothing`, `Women's Clothing`, and `More / Less`).

3. **Sort Slide-Up Sheet ([`src/components/products/filters/SortBottomSheet.tsx`](src/components/products/filters/SortBottomSheet.tsx)):**
   - Dedicated sorting bottom sheet with `"Clear"` action, expandable sort direction selectors (`Price: Low to High / High to Low`, `Rating: High to Low`, `Name: A → Z / Z → A`), and a sticky `"APPLY SORT"` footer.

4. **High-Performance In-Memory Filter Engine (`useMemo` in [`src/app/(tabs)/explore.tsx`](src/app/(tabs)/explore.tsx)):**
   - Fetches FakeStore API data once on mount or pull-to-refresh, eliminating redundant network roundtrips.
   - Combines debounced search, active category, and sort criteria with 0ms latency and zero skeleton flickering when toggling filters.

5. **Empty State UI:**
   - Displays a clean search illustration, friendly message, and a one-tap `"Reset All Filters"` button that restores default listings.

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── _layout.tsx              # Root Stack navigation layout with TopAppBar
│   ├── (tabs)/                  # Native bottom tab navigator
│   │   ├── _layout.tsx          # 4-tab bar (Home, Explore, Cart, Profile)
│   │   ├── index.tsx            # Home screen (Hero, Categories, Featured)
│   │   ├── explore.tsx          # Product catalog with search, filter chips & grid
│   │   ├── cart.tsx             # Dedicated cart screen with steppers & checkout
│   │   └── profile.tsx          # Dedicated profile screen with account settings
│   ├── library.tsx              # Component Library showcase screen
│   └── welcome.tsx              # Welcome screen
├── components/
│   ├── common/
│   │   ├── Button.tsx           # Reusable Button component (variants, sizes, disabled)
│   │   ├── Card.tsx             # Reusable Card container (variants)
│   │   ├── CtaCard.tsx          # Composed CTA Card component
│   │   ├── ErrorView.tsx        # Reusable error state component with retry action
│   │   └── QuantitySelector.tsx # Reusable stepper pill with min/max disabled bounds
│   ├── home/
│   │   ├── CategorySection.tsx  # Visual category cards horizontal scroll
│   │   ├── FeaturedSection.tsx  # Featured products horizontal strip
│   │   └── HeroSection.tsx      # Curated Hero promo card (no discount badges)
│   ├── layout/
│   │   ├── SearchBar.tsx        # Floating bubble search pill
│   │   └── TopAppBar.tsx        # Brand logo, cart badge & floating search bar
│   └── products/
│       ├── filters/
│       │   ├── CategoryFilter.tsx    # Category checkboxes with "More/Less"
│       │   ├── FilterBottomSheet.tsx # Category slide-up filter sheet modal
│       │   ├── FilterSortBar.tsx     # 50/50 Dual action bar (Filter left, Sort right)
│       │   ├── SortBottomSheet.tsx   # Sorting slide-up sheet modal
│       │   └── SortFilter.tsx        # Radio group with expand/collapse sort directions
│       ├── ProductCard.tsx           # Modern ProductCard with floating rating & add pill
│       ├── ProductCardSkeleton.tsx   # Pulsing animated skeleton loading card & grid
│       └── ProductCountBar.tsx       # Dynamic results count & active sort indicator
├── hooks/
│   └── useDebounce.ts           # Reusable generic debounce hook with timer cleanup
├── services/
│   ├── apiClient.ts             # Lightweight fetch wrapper with AbortError handling & ApiResult
│   └── productService.ts        # Async service layer for fetching, filtering & sorting
├── theme/
│   └── colors.ts                # Centralized color tokens
└── types/
    ├── api.ts                   # ApiResult, ApiSuccess, ApiFailure discriminated union
    ├── button.ts                # Button types, sizes, variants & styles
    ├── card.ts                  # Card & CtaCard types, variants & styles
    ├── filter.ts                # Filter props, ranges, sort options & directions
    └── product.ts               # Product, ProductResponse & query params
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npx expo start
```

### 3. Open the App

- Scan the QR code using **Expo Go** on Android or iOS.
- Press `a` to open in an Android Emulator.
- Press `i` to open in an iOS Simulator.
- Press `w` to run on Web.
