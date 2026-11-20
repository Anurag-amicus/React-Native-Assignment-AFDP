import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";

export default function Footer() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
      <Text style={styles.brand}>Online Express</Text>
      <Text style={styles.copyright}>© 2026 • Quality products for everyday needs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  brand: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.charcoal,
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
    color: colors.muted,
  },
});
