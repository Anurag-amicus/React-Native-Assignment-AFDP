import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { BrandFilterProps } from "@/types/filter";
import { colors } from "@/theme/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";

export default function BrandFilter({
  brands,
  selectedBrandId,
  onChange,
}: BrandFilterProps) {
  const [showMore, setShowMore] = useState(false);

  const visibleBrands = brands.slice(0, 4);
  const hiddenBrands = brands.slice(4);

  const handleBrandChange = (brandId: number) => {
    if (selectedBrandId === brandId) {
      onChange(null);
      return;
    }
    onChange(brandId);
  };

  const renderOption = (b: (typeof brands)[number]) => {
    const isChecked = selectedBrandId === b.brandId;
    return (
      <Pressable
        key={b.brandId}
        onPress={() => handleBrandChange(b.brandId)}
        style={styles.optionRow}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isChecked }}
      >
        <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
          {isChecked && <Ionicons name="checkmark" size={11} color={colors.white} />}
        </View>
        <Text style={[styles.optionText, isChecked && styles.optionTextActive]}>
          {b.name.toUpperCase()}
        </Text>
      </Pressable>
    );
  };

  const isAllChecked = selectedBrandId === null;

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

      {/* Visible Brands (First 4) */}
      {visibleBrands.map(renderOption)}

      {/* Hidden Brands (if expanded) */}
      {showMore && hiddenBrands.map(renderOption)}

      {/* More / Less Toggle */}
      {hiddenBrands.length > 0 && (
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

