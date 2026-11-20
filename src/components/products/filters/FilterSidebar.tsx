import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import type { BrandItem, CategoryItem } from "@/types/product";
import type { PriceRange, SortDirection, SortOption } from "@/types/filter";
import { colors } from "@/theme/colors";
import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import SortFilter from "./SortFilter";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const minimalAnimation = {
  duration: 220,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

export interface FilterSidebarProps {
  categories: CategoryItem[];
  brands: BrandItem[];
  selectedCategoryId: number | null;
  selectedBrandId: number | null;
  selectedPriceRange: PriceRange | null;
  selectedRating: number | null;
  selectedSort: SortOption | null;
  selectedDirection: SortDirection;
  isOpen?: boolean;
  onToggle?: () => void;
  onCategoryChange: (categoryId: number | null) => void;
  onBrandChange: (brandId: number | null) => void;
  onPriceChange: (priceRange: PriceRange | null) => void;
  onRatingChange: (rating: number | null) => void;
  onSortChange: (sort: SortOption) => void;
  onDirectionChange: (direction: SortDirection) => void;
  onClearSort: () => void;
}

export default function FilterSidebar({
  categories,
  brands,
  selectedCategoryId,
  selectedBrandId,
  selectedPriceRange,
  selectedRating,
  selectedSort,
  selectedDirection,
  isOpen,
  onToggle,
  onCategoryChange,
  onBrandChange,
  onPriceChange,
  onRatingChange,
  onSortChange,
  onDirectionChange,
  onClearSort,
}: FilterSidebarProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isExpanded = isOpen !== undefined ? isOpen : internalOpen;

  const handleToggle = () => {
    LayoutAnimation.configureNext(minimalAnimation);
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen((prev) => !prev);
    }
  };

  return (
    <View style={styles.container}>
      {/* Collapsible Accordion Header */}
      <Pressable
        onPress={handleToggle}
        style={[styles.headerButton, isExpanded && styles.headerButtonOpen]}
        accessibilityRole="button"
        accessibilityLabel="Toggle filters"
        accessibilityState={{ expanded: isExpanded }}
      >
        <Text style={styles.headerTitle}>FILTERS</Text>
        <Text style={styles.headerToggle}>{isExpanded ? "−" : "+"}</Text>
      </Pressable>

      {/* Accordion Body */}
      {isExpanded && (
        <View style={styles.body}>
          {/* Category Filter Section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Category</Text>
            <CategoryFilter
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onChange={onCategoryChange}
            />
          </View>

          {/* Brand Filter Section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Brand</Text>
            <BrandFilter
              brands={brands}
              selectedBrandId={selectedBrandId}
              onChange={onBrandChange}
            />
          </View>

          {/* Price Filter Section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Price</Text>
            <PriceFilter
              selectedPriceRange={selectedPriceRange}
              onChange={onPriceChange}
            />
          </View>

          {/* Rating Filter Section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Rating</Text>
            <RatingFilter
              selectedRating={selectedRating}
              onChange={onRatingChange}
            />
          </View>

          {/* Sort Filter Section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Sort by</Text>
            <SortFilter
              selectedSort={selectedSort}
              selectedDirection={selectedDirection}
              onSortChange={onSortChange}
              onDirectionChange={onDirectionChange}
              onClearSort={onClearSort}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    marginBottom: 12,
    overflow: "hidden",
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 2,
    borderBottomColor: colors.orange,
  },
  headerButtonOpen: {
    borderBottomWidth: 2,
    borderBottomColor: colors.orange,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.charcoal,
    letterSpacing: 0.5,
  },
  headerToggle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.orange,
    lineHeight: 18,
  },
  body: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    gap: 14,
  },
  section: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.charcoal,
    marginBottom: 8,
  },
});
