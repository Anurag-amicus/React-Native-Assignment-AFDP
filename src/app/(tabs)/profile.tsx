import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { colors } from "@/theme/colors";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

interface MenuItem {
  icon: IoniconsName;
  label: string;
  subtitle?: string;
  badge?: string;
  action: () => void;
}

export default function ProfileScreen() {
  const router = useRouter();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => Alert.alert("Signed Out", "You have been signed out successfully."),
      },
    ]);
  };

  const accountItems: MenuItem[] = [
    {
      icon: "bag-handle-outline",
      label: "My Orders",
      subtitle: "Track, return & buy again",
      badge: "1 In Transit",
      action: () => router.push("/explore"),
    },
    {
      icon: "location-outline",
      label: "Shipping Addresses",
      subtitle: "2 saved addresses",
      action: () => Alert.alert("Shipping Addresses", "Manage your delivery addresses."),
    },
    {
      icon: "card-outline",
      label: "Payment Methods",
      subtitle: "Visa ending in 4242",
      action: () => Alert.alert("Payment Methods", "Manage your credit cards and UPI."),
    },
  ];

  const preferenceItems: MenuItem[] = [
    {
      icon: "notifications-outline",
      label: "Notifications",
      subtitle: "Offers, order alerts & updates",
      action: () => Alert.alert("Notifications", "Notification settings toggled."),
    },
    {
      icon: "globe-outline",
      label: "Language & Currency",
      subtitle: "English · INR (₹)",
      action: () => Alert.alert("Region", "Current region: India (INR)."),
    },
  ];

  const supportItems: MenuItem[] = [
    {
      icon: "help-circle-outline",
      label: "Help Center & FAQ",
      subtitle: "Customer support & queries",
      action: () => Alert.alert("Help Center", "Connecting to customer support..."),
    },
    {
      icon: "shield-checkmark-outline",
      label: "Privacy Policy",
      action: () => Alert.alert("Privacy Policy", "Online Express Privacy & Terms."),
    },
  ];

  const renderSection = (title: string, items: MenuItem[]) => (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionHeader}>{title}</Text>
      {items.map((item, index) => (
        <View key={item.label}>
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.menuItemPressed,
            ]}
            onPress={item.action}
            accessibilityRole="button"
            accessibilityLabel={item.label}
          >
            <View style={styles.itemIconCircle}>
              <Ionicons name={item.icon} size={18} color={colors.charcoal} />
            </View>

            <View style={styles.itemTextContainer}>
              <Text style={styles.itemLabel}>{item.label}</Text>
              {item.subtitle && (
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              )}
            </View>

            {item.badge && (
              <View style={styles.itemBadge}>
                <Text style={styles.itemBadgeText}>{item.badge}</Text>
              </View>
            )}

            <Ionicons name="chevron-forward" size={16} color={colors.muted} />
          </Pressable>
          {index < items.length - 1 && <View style={styles.itemDivider} />}
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. User Profile Header Card */}
      <View style={styles.profileHeaderCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarInitials}>AJ</Text>
        </View>

        <View style={styles.userInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>Alex Johnson</Text>
            <View style={styles.memberBadge}>
              <Ionicons name="star" size={10} color={colors.orange} />
              <Text style={styles.memberBadgeText}>GOLD</Text>
            </View>
          </View>
          <Text style={styles.userEmail}>alex.johnson@example.com</Text>
        </View>
      </View>

      {/* 2. Quick Metrics Row */}
      <View style={styles.statsRow}>
        <Pressable
          style={styles.statCard}
          onPress={() => router.push("/explore")}
        >
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </Pressable>

        <Pressable
          style={styles.statCard}
          onPress={() => router.push("/explore")}
        >
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Wishlist</Text>
        </Pressable>

        <Pressable
          style={styles.statCard}
          onPress={() => Alert.alert("Coupons", "You have 3 active coupons available!")}
        >
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Coupons</Text>
        </Pressable>
      </View>

      {/* 3. Grouped Action Menus */}
      {renderSection("MY ACCOUNT", accountItems)}
      {renderSection("PREFERENCES", preferenceItems)}
      {renderSection("SUPPORT & LEGAL", supportItems)}

      {/* 4. Sign Out Button */}
      <Pressable
        style={({ pressed }) => [
          styles.signOutButton,
          pressed && styles.signOutButtonPressed,
        ]}
        onPress={handleSignOut}
        accessibilityRole="button"
        accessibilityLabel="Sign out"
      >
        <Ionicons name="log-out-outline" size={18} color="#ef4444" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>

      <Text style={styles.versionText}>Online Express v2.0.0 • Native Mobile</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 36,
  },
  profileHeaderCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  avatarCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    elevation: 2,
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  avatarInitials: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.white,
    letterSpacing: 0.5,
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 3,
  },
  userName: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.charcoal,
    letterSpacing: -0.3,
  },
  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#fff7ed",
    borderWidth: 1,
    borderColor: colors.orange,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 10,
  },
  memberBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: colors.orange,
    letterSpacing: 0.5,
  },
  userEmail: {
    fontSize: 12.5,
    color: colors.muted,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingVertical: 12,
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.charcoal,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.muted,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 14,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.muted,
    letterSpacing: 0.8,
    marginBottom: 10,
    marginTop: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  menuItemPressed: {
    opacity: 0.7,
  },
  itemIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 13.5,
    fontWeight: "700",
    color: colors.charcoal,
  },
  itemSubtitle: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 1,
  },
  itemBadge: {
    backgroundColor: "#fff7ed",
    borderWidth: 1,
    borderColor: colors.orange,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 8,
  },
  itemBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.orange,
  },
  itemDivider: {
    height: 1,
    backgroundColor: "#f1f5f9",
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 14,
    paddingVertical: 12,
    gap: 6,
    marginTop: 6,
    marginBottom: 16,
  },
  signOutButtonPressed: {
    opacity: 0.85,
  },
  signOutText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#ef4444",
  },
  versionText: {
    fontSize: 11,
    color: colors.muted,
    textAlign: "center",
    marginBottom: 12,
  },
});
