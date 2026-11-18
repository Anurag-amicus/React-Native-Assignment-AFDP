import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { ButtonVariant } from "./button";

export type CardVariant = "elevated" | "bordered" | "outlined" | "flat";

export interface CardProps {
  variant?: CardVariant;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const variantCardStyles: Record<CardVariant, ViewStyle> = {
  elevated: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  bordered: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#e5e7eb",
    elevation: 0,
  },
  outlined: {
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    elevation: 0,
  },
  flat: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#f3f4f6",
    elevation: 0,
  },
};
