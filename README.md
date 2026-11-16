# Online Express — React Native Assignments

A modern e-commerce mobile application built with **React Native**, **Expo Router**, and **TypeScript**.

---

## 📋 Assignment Overview

### Assignment 1 — Setup & Hello React Native

#### Problem Statement
Set up a new React Native application using Expo with TypeScript. Create a Welcome screen with an app title, description, and button. Clicking the button should log a message to the console.

#### Key Deliverables & Implementation
- **Project Setup:** Initialized an Expo project with TypeScript and file-based routing (`expo-router`).
- **Welcome Screen UI:** Built a clean landing screen displaying the store title (*"Online Express"*), an introductory description, and action buttons.
- **Button Interaction:** Implemented a `<Pressable>` button that logs `"Welcome to React Native!"` to the console upon pressing.
- **Routing & Navigation:** Preserved the Welcome Screen at `src/app/welcome.tsx` with an additional navigation button to browse products (`router.push("/")`).

**Relevant Files:**
- [`src/app/welcome.tsx`](src/app/welcome.tsx) (Initial commit: `371d14b`)

---

### Assignment 2 — Product Card Component & Grid Listing

#### Problem Statement
Create a reusable `ProductCard` component with an image, title, price, rating, and an "Add to Cart" button using React Native components and `StyleSheet`. Display 4+ cards in a responsive layout with TypeScript typing.

#### Key Deliverables & Implementation

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

## 📁 Project Structure

```text
src/
├── app/
│   ├── _layout.tsx              # Root Stack navigation layout
│   ├── index.tsx                # Assignment 2: Product grid screen with fixed header
│   └── welcome.tsx              # Assignment 1: Welcome screen
├── components/
│   ├── common/
│   │   ├── Button.tsx           # Reusable Button component with variants
│   │   └── Card.tsx             # Reusable Card container with variants
│   └── products/
│       └── ProductCard.tsx      # Composed ProductCard component
├── data/
│   └── products.json            # Mock product catalogue (8 items)
└── types/
    ├── button.ts                # Button type definitions & variant styles
    ├── card.ts                  # Card type definitions & variant styles
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
