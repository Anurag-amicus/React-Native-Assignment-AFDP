import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type CardVariant = "elevated" | "outlined" | "flat";

export interface CardProps {
  variant?: CardVariant;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const variantCardStyles: Record<CardVariant, ViewStyle> = {
  elevated: {
    elevation: 4,
  },
  outlined: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  flat: {
    backgroundColor: "#f7f7f7",
  },
};