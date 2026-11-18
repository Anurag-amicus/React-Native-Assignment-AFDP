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

## 📁 Project Structure

```text
src/
├── app/
│   ├── _layout.tsx              # Root Stack navigation layout
│   ├── index.tsx                # Assignment 2: Product grid screen with fixed header
│   └── welcome.tsx              # Assignment 1: Welcome screen
├── components/
│   ├── common/
│   │   ├── Button.tsx           # Reusable Button component (variants, sizes, disabled)
│   │   └── Card.tsx             # Reusable Card container (variants)
│   ├── layout/
│   │   ├── Footer.tsx           # Scrollable footer with library link
│   │   └── Header.tsx           # Fixed full-width app header
│   └── products/
│       └── ProductCard.tsx      # Composed ProductCard component
├── data/
│   └── products.json            # Mock product catalogue (8 items)
└── types/
    ├── button.ts                # Button types, sizes, variants & styles
    ├── card.ts                  # Card & CtaCard types, variants & styles
    └── product.ts               # Product interface definition
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
