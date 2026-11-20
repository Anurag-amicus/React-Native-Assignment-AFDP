import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { colors } from "@/theme/colors";

export type CardVariant = "elevated" | "bordered" | "outlined" | "flat";

export interface CardProps {
  variant?: CardVariant;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const variantCardStyles: Record<CardVariant, ViewStyle> = {
  elevated: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  bordered: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    elevation: 0,
  },
  outlined: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    elevation: 0,
  },
  flat: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 0,
  },
};
