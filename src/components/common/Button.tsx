import { Pressable, StyleSheet, Text } from "react-native";
import { variantButtonStyles,variantButtonTextStyles, type ButtonProps } from "@/types/button";

export default function Button({ title, onPress, style ,variant = "primary" } : ButtonProps) {
  return (
    <Pressable style={[styles.button,variantButtonStyles[variant],style]} onPress={onPress} accessibilityRole="button">
      <Text style={[styles.buttonText,variantButtonTextStyles[variant]]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center", 
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});