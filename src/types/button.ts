import type { ReactNode } from "react";
import type { StyleProp, ViewStyle, TextStyle } from "react-native";
import type { Href } from "expo-router";

export type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "generic";
export type ButtonSize = "small" | "medium" | "large";

export type ButtonProps = {
  title?: string;
  children?: ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  href?: Href;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

// Container styles for each variant
export const variantButtonStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: "#1087FD",
    borderColor: "#1087FD",
    borderWidth: 1.5,
  },
  secondary: {
    backgroundColor: "#ffffff",
    borderColor: "#222222",
    borderWidth: 1.5,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#1087FD",
  },
  danger: {
    backgroundColor: "#dc2626",
    borderColor: "#dc2626",
    borderWidth: 1.5,
  },
  generic: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
};

// Text color styles for each variant
export const variantButtonTextStyles: Record<ButtonVariant, TextStyle> = {
  primary: {
    color: "#ffffff",
  },
  secondary: {
    color: "#222222",
  },
  outline: {
    color: "#1087FD",
  },
  danger: {
    color: "#ffffff",
  },
  generic: {
    color: "#333333",
  },
};

// Size styles for button container
export const sizeButtonStyles: Record<ButtonSize, ViewStyle> = {
  small: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  medium: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  large: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
};

// Size styles for button text
export const sizeButtonTextStyles: Record<ButtonSize, TextStyle> = {
  small: {
    fontSize: 12,
  },
  medium: {
    fontSize: 14,
  },
  large: {
    fontSize: 16,
  },
};
