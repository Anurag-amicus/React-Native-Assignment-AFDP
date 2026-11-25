import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { colors } from "@/theme/colors";

export interface FilterSortBarProps {
  hasActiveFilter: boolean;
  hasActiveSort: boolean;
  onPressFilter: () => void;
  onPressSort: () => void;
}

export default function FilterSortBar({
  hasActiveFilter,
  hasActiveSort,
  onPressFilter,
  onPressSort,
}: FilterSortBarProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPressFilter}
        style={({ pressed }) => [styles.tab, pressed && styles.tabPressed]}
        accessibilityRole="button"
        accessibilityLabel="Open category filters"
      >
        <Ionicons
          name="options-outline"
          size={16}
          color={hasActiveFilter ? colors.orange : colors.charcoal}
        />
        <Text style={[styles.tabText, hasActiveFilter && styles.tabTextActive]}>
          Filter
        </Text>
        {hasActiveFilter && <View style={styles.activeDot} />}
      </Pressable>

      <View style={styles.divider} />

      <Pressable
        onPress={onPressSort}
        style={({ pressed }) => [styles.tab, pressed && styles.tabPressed]}
        accessibilityRole="button"
        accessibilityLabel="Open sorting options"
      >
        <Ionicons
          name="swap-vertical-outline"
          size={16}
          color={hasActiveSort ? colors.orange : colors.charcoal}
        />
        <Text style={[styles.tabText, hasActiveSort && styles.tabTextActive]}>
          Sort
        </Text>
        {hasActiveSort && <View style={styles.activeDot} />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  tabPressed: {
    backgroundColor: colors.surface,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.charcoal,
  },
  tabTextActive: {
    color: colors.orange,
    fontWeight: "700",
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.orange,
  },
  divider: {
    width: 1,
    height: "60%",
    backgroundColor: colors.border,
  },
});

