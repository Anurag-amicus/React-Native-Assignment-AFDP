import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { PriceFilterProps } from "@/types/filter";
import { colors } from "@/theme/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";

const priceOptions: { label: string; min: number; max: number | null }[] = [
  { label: "₹0 - ₹10,000", min: 0, max: 10000 },
  { label: "₹10,000 - ₹50,000", min: 10000, max: 50000 },
  { label: "₹50,000 - ₹1,00,000", min: 50000, max: 100000 },
  { label: "₹1,00,000 & above", min: 100000, max: null },
];

export default function PriceFilter({
  selectedPriceRange,
  onChange,
}: PriceFilterProps) {
  const handlePriceChange = (min: number, max: number | null) => {
    if (
      selectedPriceRange?.min === min &&
      selectedPriceRange?.max === max
    ) {
      onChange(null);
      return;
    }
    onChange({ min, max });
  };

  return (
    <View style={styles.container}>
      {priceOptions.map((opt) => {
        const isChecked =
          selectedPriceRange?.min === opt.min &&
          selectedPriceRange?.max === opt.max;

        return (
          <Pressable
            key={`${opt.min}-${opt.max}`}
            onPress={() => handlePriceChange(opt.min, opt.max)}
            style={styles.optionRow}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: isChecked }}
          >
            <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
              {isChecked && (
                <Ionicons name="checkmark" size={11} color={colors.white} />
              )}
            </View>
            <Text
              style={[styles.optionText, isChecked && styles.optionTextActive]}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
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
});

