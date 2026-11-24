import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { CategoryFilterProps } from "@/types/filter";
import { colors } from "@/theme/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";

export default function CategoryFilter({
  categories,
  selectedCategory,
  onChange,
}: CategoryFilterProps) {
  const [showMore, setShowMore] = useState(false);

  const visibleCategories = categories.slice(0, 4);
  const hiddenCategories = categories.slice(4);

  const renderOption = (cat: string) => {
    const isChecked = selectedCategory?.toLowerCase() === cat.toLowerCase();
    return (
      <Pressable
        key={cat}
        onPress={() => onChange(isChecked ? null : cat)}
        style={styles.optionRow}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isChecked }}
      >
        <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
          {isChecked && <Ionicons name="checkmark" size={11} color={colors.white} />}
        </View>
        <Text style={[styles.optionText, isChecked && styles.optionTextActive]}>
          {cat.toUpperCase()}
        </Text>
      </Pressable>
    );
  };

  const isAllChecked = selectedCategory === null;

  return (
    <View style={styles.container}>
      {/* "All" Option */}
      <Pressable
        onPress={() => onChange(null)}
        style={styles.optionRow}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isAllChecked }}
      >
        <View style={[styles.checkbox, isAllChecked && styles.checkboxChecked]}>
          {isAllChecked && <Ionicons name="checkmark" size={11} color={colors.white} />}
        </View>
        <Text style={[styles.optionText, isAllChecked && styles.optionTextActive]}>
          All
        </Text>
      </Pressable>

      {/* Visible Categories (First 4) */}
      {visibleCategories.map(renderOption)}

      {/* Hidden Categories (if expanded) */}
      {showMore && hiddenCategories.map(renderOption)}

      {/* More / Less Toggle */}
      {hiddenCategories.length > 0 && (
        <Pressable
          onPress={() => setShowMore((prev) => !prev)}
          style={styles.moreButton}
        >
          <Text style={styles.moreText}>{showMore ? "Less" : "More"}</Text>
          <Ionicons
            name={showMore ? "chevron-up" : "chevron-down"}
            size={12}
            color={colors.charcoal}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 2,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: colors.borderDark,
    borderRadius: 3,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.orange,
    borderColor: colors.orange,
  },
  optionText: {
    fontSize: 12,
    color: colors.charcoal,
    letterSpacing: 0.3,
  },
  optionTextActive: {
    color: colors.orange,
    fontWeight: "700",
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 2,
  },
  moreText: {
    fontSize: 12,
    color: colors.charcoal,
    fontWeight: "600",
  },
});
