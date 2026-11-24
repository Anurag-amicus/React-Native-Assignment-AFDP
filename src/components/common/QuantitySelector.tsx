import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { colors } from "@/theme/colors";

export type QuantitySelectorProps = {
  quantity: number;
  onChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
  size?: "small" | "medium";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 50,
  size = "medium",
  disabled = false,
  style,
}: QuantitySelectorProps) {
  const atMin = quantity <= min;
  const atMax = quantity >= max;
  const isSmall = size === "small";

  const handleDecrease = () => {
    if (disabled || atMin) return;
    onChange(Math.max(min, quantity - 1));
  };

  const handleIncrease = () => {
    if (disabled || atMax) return;
    onChange(Math.min(max, quantity + 1));
  };

  return (
    <View
      style={[
        styles.container,
        isSmall && styles.containerSmall,
        disabled && styles.containerDisabled,
        style,
      ]}
    >
      {/* Decrease Button */}
      <Pressable
        onPress={handleDecrease}
        disabled={disabled || atMin}
        hitSlop={4}
        style={({ pressed }) => [
          styles.stepButton,
          isSmall && styles.stepButtonSmall,
          pressed && !atMin && styles.stepButtonPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Decrease quantity"
        accessibilityState={{ disabled: disabled || atMin }}
      >
        <Ionicons
          name="remove"
          size={isSmall ? 13 : 15}
          color={disabled || atMin ? "#94a3b8" : colors.charcoal}
        />
      </Pressable>

      {/* Numeric Display */}
      <View style={[styles.countContainer, isSmall && styles.countContainerSmall]}>
        <Text style={[styles.countText, isSmall && styles.countTextSmall]}>
          {quantity}
        </Text>
      </View>

      {/* Increase Button */}
      <Pressable
        onPress={handleIncrease}
        disabled={disabled || atMax}
        hitSlop={4}
        style={({ pressed }) => [
          styles.stepButton,
          isSmall && styles.stepButtonSmall,
          pressed && !atMax && styles.stepButtonPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Increase quantity"
        accessibilityState={{ disabled: disabled || atMax }}
      >
        <Ionicons
          name="add"
          size={isSmall ? 13 : 15}
          color={disabled || atMax ? "#94a3b8" : colors.charcoal}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 16,
    height: 30,
    overflow: "hidden",
  },
  containerSmall: {
    height: 26,
    borderRadius: 13,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  stepButton: {
    width: 28,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  stepButtonSmall: {
    width: 24,
  },
  stepButtonPressed: {
    backgroundColor: "#e2e8f0",
  },
  countContainer: {
    minWidth: 26,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  countContainerSmall: {
    minWidth: 22,
    paddingHorizontal: 2,
  },
  countText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: colors.charcoal,
  },
  countTextSmall: {
    fontSize: 11,
    fontWeight: "700",
  },
});
