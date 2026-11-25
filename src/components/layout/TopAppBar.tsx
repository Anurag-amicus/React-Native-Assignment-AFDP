import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { colors } from "@/theme/colors";

export interface TopAppBarProps {
  cartCount?: number;
}

export default function TopAppBar({ cartCount = 0 }: TopAppBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");

  const isHomeScreen =
    pathname === "/" ||
    pathname === "/index" ||
    pathname.startsWith("/(tabs)/index") ||
    pathname === "";

  const handleSearchSubmit = () => {
    const trimmed = searchQuery.trim();
    if (trimmed) {
      router.push({
        pathname: "/explore",
        params: { search: trimmed },
      });
    } else {
      router.push("/explore");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <View style={[styles.safeAreaBar, { height: insets.top }]} />
      <StatusBar style="light" />

      <View style={styles.container}>
        <View style={styles.topRow}>
          <Pressable
            onPress={() => router.push("/(tabs)")}
            accessibilityRole="button"
            accessibilityLabel="Online Express, Go to Home"
            style={styles.brandContainer}
            hitSlop={6}
          >
            <View style={styles.brandIconCircle}>
              <Ionicons name="bag-handle" size={17} color={colors.white} />
            </View>
            <View style={styles.brandTextGroup}>
              <Text style={styles.brandOnline}>ONLINE</Text>
              <Text style={styles.brandExpress}>EXPRESS</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => router.push("/cart")}
            accessibilityRole="button"
            accessibilityLabel={`Shopping cart with ${cartCount} items`}
            style={styles.cartButton}
            hitSlop={8}
          >
            <Ionicons name="cart-outline" size={24} color={colors.charcoal} />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {cartCount > 99 ? "99+" : cartCount}
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        {isHomeScreen && (
          <View style={styles.searchPillWrapper}>
            <View style={styles.searchPill}>
              <Ionicons
                name="search"
                size={18}
                color={colors.orange}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search products, categories..."
                placeholderTextColor={colors.muted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
                onSubmitEditing={handleSearchSubmit}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {searchQuery.length > 0 ? (
                <Pressable
                  onPress={handleClearSearch}
                  hitSlop={8}
                  style={styles.clearButton}
                  accessibilityLabel="Clear search"
                >
                  <Ionicons name="close-circle" size={18} color={colors.muted} />
                </Pressable>
              ) : (
                <Pressable
                  onPress={handleSearchSubmit}
                  hitSlop={6}
                  style={styles.searchActionButton}
                  accessibilityLabel="Submit search"
                >
                  <Ionicons name="arrow-forward" size={16} color={colors.orange} />
                </Pressable>
              )}
            </View>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaBar: {
    width: "100%",
    backgroundColor: colors.orange,
  },
  container: {
    width: "100%",
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f5",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    zIndex: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 40,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
    elevation: 1,
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  brandTextGroup: {
    justifyContent: "center",
  },
  brandOnline: {
    fontSize: 8.5,
    fontWeight: "800",
    letterSpacing: 2,
    color: colors.orange,
    lineHeight: 10,
  },
  brandExpress: {
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: -0.4,
    color: colors.charcoal,
    lineHeight: 19,
  },
  cartButton: {
    padding: 6,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 40,
    minHeight: 40,
  },
  cartBadge: {
    position: "absolute",
    top: 4,
    right: 4,
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
  searchPillWrapper: {
    width: "100%",
    paddingTop: 8,
    paddingBottom: 4,
  },
  searchPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f5f7",
    borderRadius: 22,
    height: 42,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 13,
    color: colors.black,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  searchActionButton: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});

