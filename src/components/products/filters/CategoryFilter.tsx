import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { CategoryFilterProps } from "@/types/filter";
import { colors } from "@/theme/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";

export default function CategoryFilter({
  categories,
  selectedCategoryId,
  onChange,
}: CategoryFilterProps) {
  const [showMore, setShowMore] = useState(false);

  const visibleCategories = categories.slice(0, 4);
  const hiddenCategories = categories.slice(4);

  const handleCategoryChange = (categoryId: number) => {
    if (selectedCategoryId === categoryId) {
      onChange(null);
      return;
    }
    onChange(categoryId);
  };

  const renderOption = (cat: (typeof categories)[number]) => {
    const isChecked = selectedCategoryId === cat.categoryId;
    return (
      <Pressable
        key={cat.categoryId}
        onPress={() => handleCategoryChange(cat.categoryId)}
        style={styles.optionRow}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isChecked }}
      >
        <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
          {isChecked && <Ionicons name="checkmark" size={11} color={colors.white} />}
        </View>
        <Text style={[styles.optionText, isChecked && styles.optionTextActive]}>
          {cat.name.toUpperCase()}
        </Text>
      </Pressable>
    );
  };

  const isAllChecked = selectedCategoryId === null;

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
    borderWidth: 1.5,
    borderColor: colors.borderDark,
    borderRadius: 3,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    borderColor: colors.orange,
    backgroundColor: colors.orange,
  },
  optionText: {
    fontSize: 12,
    color: colors.charcoal,
  },
  optionTextActive: {
    color: colors.orange,
    fontWeight: "600",
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  moreText: {
    fontSize: 12,
    color: colors.charcoal,
    fontWeight: "600",
  },
});

