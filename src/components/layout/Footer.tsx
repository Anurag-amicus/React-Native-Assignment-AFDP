import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { colors } from "@/theme/colors";

export default function Footer() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
      <Text style={styles.brand}>Online Express</Text>
      <Text style={styles.copyright}>© 2026 • Quality products for everyday needs</Text>

      {/* Simple Footer Navigation Links (Without active highlight) */}
      <View style={styles.navRow}>
        <Pressable
          onPress={() => router.push("/")}
          style={styles.navButton}
          accessibilityRole="button"
          accessibilityLabel="Go to Home"
        >
          <Text style={styles.navText}>Home</Text>
        </Pressable>

        <Text style={styles.divider}>•</Text>

        <Pressable
          onPress={() => router.push("/explore")}
          style={styles.navButton}
          accessibilityRole="button"
          accessibilityLabel="Go to Products"
        >
          <Text style={styles.navText}>Products</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    backgroundColor: colors.white,
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  brand: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.charcoal,
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 10,
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  navButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  navText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.muted,
  },
  divider: {
    fontSize: 12,
    color: colors.borderDark,
  },
});
