import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePathname, useRouter } from "expo-router";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { colors } from "@/theme/colors";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.78, 300);

export interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

interface NavItemConfig {
  key: string;
  label: string;
  href: "/" | "/products";
  icon: IoniconsName;
  iconActive: IoniconsName;
  isActive: (pathname: string) => boolean;
}

const NAV_ITEMS: NavItemConfig[] = [
  {
    key: "home",
    label: "Home",
    href: "/",
    icon: "home-outline",
    iconActive: "home",
    isActive: (pathname) => pathname === "/" || pathname === "/welcome" || pathname === "/home",
  },
  {
    key: "products",
    label: "Products",
    href: "/products",
    icon: "grid-outline",
    iconActive: "grid",
    isActive: (pathname) =>
      pathname === "/products" || pathname.startsWith("/products"),
  },
];

export default function SidebarDrawer({ isOpen, onClose }: SidebarDrawerProps) {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();

  const [visible, setVisible] = useState(isOpen);
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setVisible(false);
      });
    }
  }, [isOpen, fadeAnim, slideAnim]);

  const handleNavigate = (href: "/" | "/products", active: boolean) => {
    onClose();
    if (!active) {
      router.push(href);
    }
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.modalRoot}>
        {/* Semi-transparent Dimmed Backdrop Overlay */}
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
        </TouchableWithoutFeedback>

        {/* Slide-in Sidebar Panel */}
        <Animated.View
          style={[
            styles.drawerPanel,
            {
              width: DRAWER_WIDTH,
              paddingTop: insets.top + 8,
              paddingBottom: Math.max(insets.bottom, 16),
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          {/* Drawer Header with Logo & Close Button */}
          <View style={styles.drawerHeader}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoOnline}>ONLINE</Text>
              <Text style={styles.logoExpress}>EXPRESS</Text>
            </View>

            <Pressable
              onPress={onClose}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Close navigation menu"
              style={styles.closeButton}
            >
              <Ionicons name="close" size={22} color={colors.charcoal} />
            </Pressable>
          </View>

          {/* Navigation Links */}
          <View style={styles.navList}>
            {NAV_ITEMS.map((item) => {
              const active = item.isActive(pathname);
              return (
                <Pressable
                  key={item.key}
                  onPress={() => handleNavigate(item.href, active)}
                  accessibilityRole="button"
                  accessibilityLabel={`${item.label} page`}
                  accessibilityState={{ selected: active }}
                  style={[
                    styles.navItem,
                    active && styles.navItemActive,
                  ]}
                >
                  <Ionicons
                    name={active ? item.iconActive : item.icon}
                    size={20}
                    color={active ? colors.orange : colors.muted}
                    style={styles.navIcon}
                  />
                  <Text
                    style={[
                      styles.navLabel,
                      active && styles.navLabelActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Drawer Footer */}
          <View style={styles.drawerFooter}>
            <Text style={styles.footerBrand}>ONLINE EXPRESS MOBILE</Text>
            <Text style={styles.footerVersion}>Version 1.0.0</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    flexDirection: "row",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  drawerPanel: {
    height: "100%",
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 16,
    justifyContent: "space-between",
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logoContainer: {
    justifyContent: "center",
  },
  logoOnline: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 2,
    color: colors.muted,
  },
  logoExpress: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: -0.5,
    color: colors.charcoal,
    lineHeight: 20,
  },
  closeButton: {
    padding: 6,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  navList: {
    flex: 1,
    paddingTop: 12,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderLeftWidth: 3.5,
    borderLeftColor: "transparent",
    marginBottom: 4,
  },
  navItemActive: {
    backgroundColor: colors.orangeLight,
    borderLeftColor: colors.orange,
  },
  navIcon: {
    marginRight: 14,
  },
  navLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.charcoal,
  },
  navLabelActive: {
    color: colors.orange,
    fontWeight: "700",
  },
  drawerFooter: {
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerBrand: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    color: colors.subtle,
    marginBottom: 2,
  },
  footerVersion: {
    fontSize: 10,
    color: colors.muted,
  },
});
