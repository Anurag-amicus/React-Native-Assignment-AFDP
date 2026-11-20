import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { SortDirection, SortOption } from "@/types/filter";
import { colors } from "@/theme/colors";

export interface ProductCountBarProps {
  currentCount: number;
  totalCount: number;
  searchQuery?: string;
  sortBy?: SortOption | null;
  sortOrder?: SortDirection;
}

export default function ProductCountBar({
  currentCount,
  totalCount,
  searchQuery,
  sortBy,
  sortOrder,
}: ProductCountBarProps) {
  let sortLabel: string | null = null;
  if (sortBy === "name") sortLabel = "Name";
  if (sortBy === "price") sortLabel = "Price";
  if (sortBy === "rating") sortLabel = "Ratings";

  let directionLabel: string | null = null;
  if (sortBy && sortOrder) {
    if (sortOrder === "asc") {
      directionLabel = sortBy === "name" ? "A → Z" : "Low to High";
    } else if (sortOrder === "desc") {
      directionLabel = sortBy === "name" ? "Z → A" : "High to Low";
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>
        Showing {currentCount} of {totalCount} results
        {searchQuery ? ` for "${searchQuery}"` : ""}
      </Text>

      {sortLabel && directionLabel && (
        <Text style={styles.sortText}>
          Sorted by: <Text style={styles.sortHighlight}>{sortLabel}</Text>{" "}
          {directionLabel}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  countText: {
    fontSize: 12,
    color: colors.charcoal,
  },
  sortText: {
    fontSize: 11,
    color: colors.muted,
  },
  sortHighlight: {
    color: colors.charcoal,
    fontWeight: "700",
  },
});

