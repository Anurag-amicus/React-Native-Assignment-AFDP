import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import type { BrandItem, CategoryItem } from "@/types/product";
import type { PriceRange, SortOption } from "@/types/filter";
import { colors } from "@/theme/colors";

export interface FilterChipBarProps {
  categories: CategoryItem[];
  brands: BrandItem[];
  selectedCategoryId: number | null;
  selectedBrandId: number | null;
  selectedPriceRange: PriceRange | null;
  selectedRating: number | null;
  selectedSort: SortOption | null;
  onOpenFilter: () => void;
  onClearAll: () => void;
}

export default function FilterChipBar({
  categories,
  brands,
  selectedCategoryId,
  selectedBrandId,
  selectedPriceRange,
  selectedRating,
  selectedSort,
  onOpenFilter,
  onClearAll,
}: FilterChipBarProps) {
  const activeCount =
    (selectedCategoryId !== null ? 1 : 0) +
    (selectedBrandId !== null ? 1 : 0) +
    (selectedPriceRange !== null ? 1 : 0) +
    (selectedRating !== null ? 1 : 0) +
    (selectedSort !== null ? 1 : 0);

  const selectedCategoryName = categories.find(
    (c) => c.categoryId === selectedCategoryId
  )?.name;

  const selectedBrandName = brands.find(
    (b) => b.brandId === selectedBrandId
  )?.name;

  const chips: {
    key: string;
    label: string;
    isActive: boolean;
    icon?: React.ComponentProps<typeof Ionicons>["name"];
    badge?: number;
    action: () => void;
  }[] = [
    {
      key: "all_filters",
      label: "Filters",
      isActive: activeCount > 0,
      icon: "options-outline",
      badge: activeCount > 0 ? activeCount : undefined,
      action: onOpenFilter,
    },
    {
      key: "category",
      label: selectedCategoryName ? `${selectedCategoryName}` : "Category ▾",
      isActive: selectedCategoryId !== null,
      action: onOpenFilter,
    },
    {
      key: "brand",
      label: selectedBrandName ? `${selectedBrandName}` : "Brand ▾",
      isActive: selectedBrandId !== null,
      action: onOpenFilter,
    },
    {
      key: "price",
      label: selectedPriceRange
        ? `₹${selectedPriceRange.min / 1000}k+`
        : "Price ▾",
      isActive: selectedPriceRange !== null,
      action: onOpenFilter,
    },
    {
      key: "rating",
      label: selectedRating ? `★ ${selectedRating}+` : "Rating ▾",
      isActive: selectedRating !== null,
      action: onOpenFilter,
    },
    {
      key: "sort",
      label: selectedSort ? `Sort: ${selectedSort}` : "Sort ▾",
      isActive: selectedSort !== null,
      action: onOpenFilter,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={chips}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            onPress={item.action}
            style={({ pressed }) => [
              styles.chip,
              item.isActive && styles.chipActive,
              pressed && styles.chipPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Filter by ${item.label}`}
          >
            {item.icon && (
              <Ionicons
                name={item.icon}
                size={14}
                color={item.isActive ? colors.orange : colors.charcoal}
                style={styles.chipIcon}
              />
            )}
            <Text
              style={[
                styles.chipText,
                item.isActive && styles.chipTextActive,
              ]}
              numberOfLines={1}
            >
              {item.label}
            </Text>
            {item.badge !== undefined && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
          </Pressable>
        )}
        ListFooterComponent={
          activeCount > 0 ? (
            <Pressable
              onPress={onClearAll}
              style={styles.clearChip}
              accessibilityRole="button"
              accessibilityLabel="Clear all filters"
            >
              <Ionicons name="close-circle-outline" size={14} color="#ef4444" />
              <Text style={styles.clearText}>Clear</Text>
            </Pressable>
          ) : undefined
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 2,
    gap: 8,
    alignItems: "center",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    gap: 4,
  },
  chipActive: {
    backgroundColor: "#fff7ed",
    borderColor: colors.orange,
  },
  chipPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  chipIcon: {
    marginRight: 2,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.charcoal,
  },
  chipTextActive: {
    color: colors.orange,
    fontWeight: "700",
  },
  badge: {
    backgroundColor: colors.orange,
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 3,
  },
  badgeText: {
    fontSize: 9.5,
    fontWeight: "800",
    color: colors.white,
    lineHeight: 11,
  },
  clearChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
    gap: 4,
  },
  clearText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#ef4444",
  },
});
