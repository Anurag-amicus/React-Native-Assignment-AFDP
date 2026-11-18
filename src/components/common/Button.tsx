import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Link } from "expo-router";
import {
  type ButtonProps,
  variantButtonStyles,
  variantButtonTextStyles,
  sizeButtonStyles,
  sizeButtonTextStyles,
} from "@/types/button";

export default function Button({
  title,
  children,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  href,
  style,
  textStyle,
}: ButtonProps) {
  const content = children ?? title;

  const renderedContent =
    typeof content === "string" ? (
      <Text
        style={[
          styles.buttonText,
          sizeButtonTextStyles[size],
          variantButtonTextStyles[variant],
          textStyle,
        ]}
      >
        {content}
      </Text>
    ) : (
      content
    );

  const buttonElement = (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        sizeButtonStyles[size],
        variantButtonStyles[variant],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      {renderedContent}
    </Pressable>
  );

  if (href && !disabled) {
    return (
      <Link href={href} asChild>
        {buttonElement}
      </Link>
    );
  }

  return buttonElement;
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
