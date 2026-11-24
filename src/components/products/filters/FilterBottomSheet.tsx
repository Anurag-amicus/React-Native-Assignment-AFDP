import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import type { PriceRange, SortDirection, SortOption } from "@/types/filter";
import { colors } from "@/theme/colors";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import SortFilter from "./SortFilter";

export interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  categories: string[];
  selectedCategory: string | null;
  selectedPriceRange: PriceRange | null;
  selectedRating: number | null;
  selectedSort: SortOption | null;
  selectedDirection: SortDirection;
  onCategoryChange: (category: string | null) => void;
  onPriceChange: (priceRange: PriceRange | null) => void;
  onRatingChange: (rating: number | null) => void;
  onSortChange: (sort: SortOption) => void;
  onDirectionChange: (direction: SortDirection) => void;
  onClearSort: () => void;
  onResetAll: () => void;
}

export default function FilterBottomSheet({
  visible,
  onClose,
  categories,
  selectedCategory,
  selectedPriceRange,
  selectedRating,
  selectedSort,
  selectedDirection,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onSortChange,
  onDirectionChange,
  onClearSort,
  onResetAll,
}: FilterBottomSheetProps) {
  const insets = useSafeAreaInsets();

  const activeCount =
    (selectedCategory !== null ? 1 : 0) +
    (selectedPriceRange !== null ? 1 : 0) +
    (selectedRating !== null ? 1 : 0) +
    (selectedSort !== null ? 1 : 0);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Backdrop Tap to Close */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        {/* Sheet Surface */}
        <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          {/* Drag Handle Indicator */}
          <View style={styles.handleContainer}>
            <View style={styles.handleBar} />
          </View>

          {/* Header Row */}
          <View style={styles.header}>
            <View style={styles.titleGroup}>
              <Text style={styles.title}>Filter Products</Text>
              {activeCount > 0 && (
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>{activeCount} active</Text>
                </View>
              )}
            </View>

            <View style={styles.actionsGroup}>
              {activeCount > 0 && (
                <Pressable
                  onPress={onResetAll}
                  style={styles.resetButton}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel="Reset all filters"
                >
                  <Text style={styles.resetText}>Reset All</Text>
                </Pressable>
              )}

              <Pressable
                onPress={onClose}
                style={styles.closeButton}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Close filters bottom sheet"
              >
                <Ionicons name="close" size={22} color={colors.charcoal} />
              </Pressable>
            </View>
          </View>

          {/* Scrollable Filter Content */}
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* 1. Sort Options Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              <SortFilter
                selectedSort={selectedSort}
                selectedDirection={selectedDirection}
                onSortChange={onSortChange}
                onDirectionChange={onDirectionChange}
                onClearSort={onClearSort}
              />
            </View>

            {/* 2. Category Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Category</Text>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onChange={onCategoryChange}
              />
            </View>

            {/* 3. Price Range Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Price Range</Text>
              <PriceFilter
                selectedPriceRange={selectedPriceRange}
                onChange={onPriceChange}
              />
            </View>

            {/* 4. Rating Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Customer Rating</Text>
              <RatingFilter
                selectedRating={selectedRating}
                onChange={onRatingChange}
              />
            </View>
          </ScrollView>

          {/* Sticky Bottom Apply Button */}
          <View style={styles.footer}>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.applyButton,
                pressed && styles.applyButtonPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Apply filters"
            >
              <Text style={styles.applyButtonText}>
                APPLY FILTERS {activeCount > 0 ? `(${activeCount})` : ""}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  backdrop: {
    flex: 1,
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "82%",
    width: "100%",
    elevation: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  handleBar: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#cbd5e1",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  titleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.charcoal,
    letterSpacing: -0.3,
  },
  activeBadge: {
    backgroundColor: "#fff7ed",
    borderWidth: 1,
    borderColor: colors.orange,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  activeBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.orange,
  },
  actionsGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  resetButton: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  resetText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: colors.orange,
  },
  closeButton: {
    padding: 2,
  },
  scrollArea: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 16,
  },
  section: {
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.charcoal,
    letterSpacing: 0.2,
    marginBottom: 8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    backgroundColor: colors.white,
  },
  applyButton: {
    width: "100%",
    height: 46,
    backgroundColor: colors.orange,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  applyButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  applyButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.white,
    letterSpacing: 0.8,
  },
});
