import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { RatingFilterProps } from "@/types/filter";
import { colors } from "@/theme/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";

const ratingOptions = [
  { label: "★★★★ & above", value: 4 },
  { label: "★★★ & above", value: 3 },
];

export default function RatingFilter({
  selectedRating,
  onChange,
}: RatingFilterProps) {
  const handleRatingChange = (val: number) => {
    if (selectedRating === val) {
      onChange(null);
      return;
    }
    onChange(val);
  };

  return (
    <View style={styles.container}>
      {ratingOptions.map((opt) => {
        const isChecked = selectedRating === opt.value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => handleRatingChange(opt.value)}
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

