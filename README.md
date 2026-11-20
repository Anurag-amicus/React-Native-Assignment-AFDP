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

## 📁 Project Structure

```text
src/
├── app/
│   ├── _layout.tsx              # Root Stack navigation layout
│   ├── index.tsx                # Product listing screen with filters, search & grid
│   ├── library.tsx              # Component Library showcase screen
│   └── welcome.tsx              # Welcome screen
├── components/
│   ├── common/
│   │   ├── Button.tsx           # Reusable Button component (variants, sizes, disabled)
│   │   ├── Card.tsx             # Reusable Card container (variants)
│   │   ├── CtaCard.tsx          # Composed CTA Card component
│   │   └── QuantitySelector.tsx # Reusable stepper pill with min/max disabled bounds
│   ├── layout/
│   │   ├── Footer.tsx           # Scrollable footer with library link
│   │   └── Header.tsx           # Fixed full-width app header
│   │   └── SearchBar.tsx        # Live search bar with clear button
│   └── products/
│       ├── filters/
│       │   ├── BrandFilter.tsx     # Brand checkboxes with "More/Less"
│       │   ├── CategoryFilter.tsx  # Category checkboxes with "More/Less"
│       │   ├── FilterSidebar.tsx   # Collapsible mobile filter accordion ("FILTERS +/−")
│       │   ├── PriceFilter.tsx     # Price range checkboxes
│       │   ├── RatingFilter.tsx    # Star rating threshold checkboxes
│       │   └── SortFilter.tsx      # Radio group with expand/collapse sort directions
│       ├── ProductCard.tsx      # Composed ProductCard with dynamic total & alert
│       └── ProductCountBar.tsx  # Dynamic results count & active sort indicator
├── data/
│   └── products.json            # Product catalogue with categoryId & brandId
├── services/
│   └── productService.ts        # Async service layer for fetching, filtering & sorting
├── theme/
│   └── colors.ts                # Centralized color tokens migrated from Next.js CSS
└── types/
    ├── button.ts                # Button types, sizes, variants & styles
    ├── card.ts                  # Card & CtaCard types, variants & styles
    ├── filter.ts                # Filter props, ranges, sort options & directions
    └── product.ts               # Product, CategoryItem, BrandItem & query params
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
