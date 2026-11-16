import { StyleProp, ViewStyle, TextStyle } from "react-native";

export type ButtonVariant = "primary" | "secondary" | "outline";

export type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
};

// Container styles for each variant
export const variantButtonStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: "#ff5405",
  },
  secondary: {
    backgroundColor: "#222222",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#ff5405",
  },
};

// Text color styles for each variant
export const variantButtonTextStyles: Record<ButtonVariant, TextStyle> = {
  primary: {
    color: "#ffffff",
  },
  secondary: {
    color: "#ffffff",
  },
  outline: {
    color: "#ff5405",
  },
};