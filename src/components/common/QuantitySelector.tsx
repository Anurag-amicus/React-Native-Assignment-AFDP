import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "@/theme/colors";
import Button from "./Button";

export type QuantitySelectorProps = {
  quantity: number;
  onChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 50,
  disabled = false,
  style,
}: QuantitySelectorProps) {
  const atMin = quantity <= min;
  const atMax = quantity >= max;

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
        styles.selector,
        disabled && styles.selectorDisabled,
        style,
      ]}
    >
      {/* Decrease Button using Reusable Button */}
      <Button
        variant="generic"
        disabled={disabled || atMin}
        onPress={handleDecrease}
        style={[styles.stepButton, styles.stepLeft]}
        textStyle={[styles.stepText, atMin && styles.stepTextDisabled]}
      >
        −
      </Button>

      {/* Current Quantity */}
      <View style={styles.countBox}>
        <Text style={styles.countText}>{quantity}</Text>
      </View>

      {/* Increase Button using Reusable Button */}
      <Button
        variant="generic"
        disabled={disabled || atMax}
        onPress={handleIncrease}
        style={[styles.stepButton, styles.stepRight]}
        textStyle={[styles.stepText, atMax && styles.stepTextDisabled]}
      >
        +
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  selector: {
    flexDirection: "row",
    alignItems: "center",
    height: 32,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.white,
    alignSelf: "center",
  },
  selectorDisabled: {
    opacity: 0.5,
  },
  stepButton: {
    width: 32,
    height: 32,
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  stepLeft: {
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  stepRight: {
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  stepText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.black,
    lineHeight: 20,
  },
  stepTextDisabled: {
    color: colors.muted,
  },
  countBox: {
    width: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  countText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.black,
  },
});
