import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { colors } from "@/theme/colors";

export default function CartScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="cart-outline" size={48} color={colors.orange} />
        </View>

        <Text style={styles.title}>Your Cart is Empty</Text>
        <Text style={styles.subtitle}>
          Looks like you haven&apos;t added anything to your cart yet. Explore our products and find great deals!
        </Text>

        <Pressable
          style={styles.browseButton}
          onPress={() => router.push("/explore")}
          accessibilityRole="button"
          accessibilityLabel="Start Shopping"
        >
          <Text style={styles.browseButtonText}>START SHOPPING</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyContainer: {
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.orangeLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.charcoal,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 28,
  },
  browseButton: {
    backgroundColor: colors.orange,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
    maxWidth: 240,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  browseButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
});

