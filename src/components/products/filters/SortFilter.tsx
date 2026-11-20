import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { SortDirection, SortFilterProps, SortOption } from "@/types/filter";
import { colors } from "@/theme/colors";

export default function SortFilter({
  selectedSort,
  selectedDirection,
  onSortChange,
  onDirectionChange,
  onClearSort,
}: SortFilterProps) {
  const renderSortOption = (
    key: SortOption,
    label: string,
    ascLabel: string,
    descLabel: string
  ) => {
    const isSelected = selectedSort === key;

    return (
      <View key={key} style={styles.sortGroup}>
        {/* Main Radio Row */}
        <View style={styles.radioHeader}>
          <Pressable
            onPress={() => onSortChange(key)}
            style={styles.radioRow}
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected }}
          >
            <View style={[styles.radioCircle, isSelected && styles.radioCircleActive]}>
              {isSelected && <View style={styles.radioDot} />}
            </View>
            <Text style={[styles.radioText, isSelected && styles.radioTextActive]}>
              {label}
            </Text>
          </Pressable>

          {/* Clear Button (×) */}
          {isSelected && (
            <Pressable
              onPress={onClearSort}
              hitSlop={8}
              style={styles.clearButton}
              accessibilityLabel={`Clear ${label} sort`}
            >
              <Text style={styles.clearText}>×</Text>
            </Pressable>
          )}
        </View>

        {/* Direction Options (Visible when selected) */}
        {isSelected && (
          <View style={styles.directionContainer}>
            <Pressable
              onPress={() => onDirectionChange("asc")}
              style={styles.directionRow}
              accessibilityRole="radio"
              accessibilityState={{ checked: selectedDirection === "asc" }}
            >
              <View
                style={[
                  styles.radioCircleSmall,
                  selectedDirection === "asc" && styles.radioCircleActive,
                ]}
              >
                {selectedDirection === "asc" && <View style={styles.radioDotSmall} />}
              </View>
              <Text
                style={[
                  styles.directionText,
                  selectedDirection === "asc" && styles.directionTextActive,
                ]}
              >
                {ascLabel}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => onDirectionChange("desc")}
              style={styles.directionRow}
              accessibilityRole="radio"
              accessibilityState={{ checked: selectedDirection === "desc" }}
            >
              <View
                style={[
                  styles.radioCircleSmall,
                  selectedDirection === "desc" && styles.radioCircleActive,
                ]}
              >
                {selectedDirection === "desc" && <View style={styles.radioDotSmall} />}
              </View>
              <Text
                style={[
                  styles.directionText,
                  selectedDirection === "desc" && styles.directionTextActive,
                ]}
              >
                {descLabel}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderSortOption("name", "Name", "A → Z", "Z → A")}
      {renderSortOption("price", "Price", "Low to High", "High to Low")}
      {renderSortOption("rating", "Ratings", "Low to High", "High to Low")}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  sortGroup: {
    width: "100%",
  },
  radioHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.borderDark,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  radioCircleSmall: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: colors.borderDark,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  radioCircleActive: {
    borderColor: colors.orange,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.orange,
  },
  radioDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.orange,
  },
  radioText: {
    fontSize: 12,
    color: colors.charcoal,
  },
  radioTextActive: {
    color: colors.orange,
    fontWeight: "600",
  },
  clearButton: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  clearText: {
    fontSize: 18,
    lineHeight: 18,
    color: colors.orange,
    fontWeight: "700",
  },
  directionContainer: {
    marginLeft: 24,
    marginTop: 6,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: colors.orange,
    gap: 6,
  },
  directionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  directionText: {
    fontSize: 11,
    color: colors.charcoal,
  },
  directionTextActive: {
    color: colors.orange,
    fontWeight: "600",
  },
});

