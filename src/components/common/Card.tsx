import { StyleSheet, View } from "react-native";
import { CardProps } from "@/types/card";
import { variantCardStyles } from "@/types/card";

export default function Card({
  variant = "elevated",
  children,
  style,
}: CardProps) {
  return <View style={[styles.base,variantCardStyles[variant],style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    width: "100%",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingTop: 18,
    paddingBottom: 16,
    backgroundColor: "#ffffff",
  },
});