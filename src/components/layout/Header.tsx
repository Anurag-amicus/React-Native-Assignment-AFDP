import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { colors } from "@/theme/colors";
import SidebarDrawer from "./SidebarDrawer";

export interface HeaderProps {
  cartCount?: number;
}

export default function Header({ cartCount = 0 }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* 1. Distinct Phone Status Bar / Safe Area Strip */}
      <View style={[styles.safeAreaBar, { height: insets.top }]} />
      <StatusBar style="light" />

      {/* 2. Main App Header Bar */}
      <View style={styles.header}>
        <View style={styles.headerInner}>
          {/* Left: Burger Menu Button + Separator + Logo */}
          <View style={styles.leftContainer}>
            <Pressable
              onPress={() => setSidebarOpen(true)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Open navigation menu"
              style={styles.burgerButton}
            >
              <Ionicons name="menu" size={24} color={colors.charcoal} />
            </Pressable>

            {/* Vertical Separator Divider (Matching Next.js layout) */}
            <View style={styles.divider} />

            {/* Brand Logo */}
            <Pressable
              onPress={() => router.push("/")}
              accessibilityRole="button"
              accessibilityLabel="Online Express Logo, Go to Home"
              style={styles.logoPressable}
            >
              <Text style={styles.logoOnline}>ONLINE</Text>
              <Text style={styles.logoExpress}>EXPRESS</Text>
            </Pressable>
          </View>

          {/* Right: Cart Icon with Badge (Matching Next.js mobile web view) */}
          <View style={styles.rightContainer}>
            <Pressable
              onPress={() => setSidebarOpen(true)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Shopping cart"
              style={styles.cartButton}
            >
              <Ionicons name="cart-outline" size={22} color={colors.charcoal} />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {cartCount > 99 ? "99+" : cartCount}
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </View>

      {/* Slide-in Navigation Sidebar Drawer */}
      <SidebarDrawer
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaBar: {
    width: "100%",
    backgroundColor: colors.orange,
  },
  header: {
    width: "100%",
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    zIndex: 10,
  },
  headerInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    minHeight: 36,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  burgerButton: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: colors.borderDark,
    marginHorizontal: 10,
  },
  logoPressable: {
    justifyContent: "center",
  },
  logoOnline: {
    fontSize: 8.5,
    fontWeight: "700",
    letterSpacing: 2,
    color: colors.muted,
    lineHeight: 10,
  },
  logoExpress: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: -0.5,
    color: colors.charcoal,
    lineHeight: 20,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartButton: {
    padding: 6,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadge: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: colors.orange,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadgeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: "700",
    lineHeight: 11,
  },
});
