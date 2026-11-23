import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { colors } from "@/theme/colors";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={40} color={colors.orange} />
        </View>

        <Text style={styles.name}>Welcome, Guest</Text>
        <Text style={styles.email}>guest@onlineexpress.com</Text>
      </View>

      {/* Profile Menu Actions */}
      <View style={styles.menuSection}>
        <Pressable
          style={styles.menuItem}
          onPress={() => router.push("/explore")}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons name="bag-handle-outline" size={20} color={colors.charcoal} />
            <Text style={styles.menuItemText}>My Orders</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.muted} />
        </Pressable>

        <Pressable
          style={styles.menuItem}
          onPress={() => router.push("/cart")}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons name="cart-outline" size={20} color={colors.charcoal} />
            <Text style={styles.menuItemText}>Cart</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.muted} />
        </Pressable>

        <Pressable style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="location-outline" size={20} color={colors.charcoal} />
            <Text style={styles.menuItemText}>Shipping Addresses</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.muted} />
        </Pressable>

        <Pressable style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="settings-outline" size={20} color={colors.charcoal} />
            <Text style={styles.menuItemText}>Account Settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.muted} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  profileHeader: {
    alignItems: "center",
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.orangeLight,
    borderWidth: 2,
    borderColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.charcoal,
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
    color: colors.muted,
  },
  menuSection: {
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.charcoal,
  },
});

