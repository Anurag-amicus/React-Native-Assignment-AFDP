import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { colors } from "@/theme/colors";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

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

  return (
    <View style={styles.container}>
      {/* Top Overscroll Extension to seamlessly fill any pull-down bounce */}
      <View style={styles.topOverscrollExtension} />

      <View style={styles.heroWrapper}>
        {/* Hero Background Image */}
        <Image
          source={require("../../../assets/herosection.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

        {/* Multi-Stop Horizontal Gradient Overlay (Matching Next.js bg-linear-to-r) */}
        <LinearGradient
          colors={[
            "rgba(255, 248, 238, 0.95)",
            "rgba(255, 248, 238, 0.72)",
            "rgba(255, 248, 238, 0.16)",
          ]}
          locations={[0, 0.54, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradientOverlay}
        />

        {/* Hero Content */}
        <View style={styles.content}>
          {/* Tagline */}
          <Text style={styles.tagline}>ONLINE EXPRESS</Text>

          {/* Main Headline */}
          <Text style={styles.headline}>FIND THE RIGHT PRODUCTS</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Discover quality products designed to fit your everyday needs.
          </Text>

          {/* Hero Search Bar */}
          <View style={styles.searchBar}>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search products..."
              placeholderTextColor={colors.muted}
              returnKeyType="search"
              onSubmitEditing={handleSearchSubmit}
              style={styles.searchInput}
            />

            {searchQuery.length > 0 && (
              <Pressable
                onPress={() => setSearchQuery("")}
                hitSlop={8}
                style={styles.clearButton}
                accessibilityRole="button"
                accessibilityLabel="Clear search input"
              >
                <Text style={styles.clearButtonText}>×</Text>
              </Pressable>
            )}

            <Pressable
              onPress={handleSearchSubmit}
              style={styles.searchIconButton}
              accessibilityRole="button"
              accessibilityLabel="Search"
            >
              <Ionicons name="search" size={18} color={colors.orange} />
            </Pressable>
          </View>

          {/* Primary CTA Button */}
          <Pressable
            style={styles.ctaButton}
            onPress={() => router.push("/explore")}
            accessibilityRole="button"
            accessibilityLabel="Shop Now"
          >
            <Text style={styles.ctaButtonText}>SHOP NOW</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff8ee",
    position: "relative",
  },
  topOverscrollExtension: {
    position: "absolute",
    top: -600,
    left: 0,
    right: 0,
    height: 600,
    backgroundColor: "#fff8ee",
  },
  heroWrapper: {
    width: "100%",
    minHeight: 330,
    position: "relative",
    overflow: "hidden",
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 28,
    width: "100%",
    maxWidth: 320,
  },
  tagline: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    color: colors.orange,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  headline: {
    fontSize: 27,
    fontWeight: "900",
    color: colors.black,
    letterSpacing: -0.5,
    lineHeight: 33,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13.5,
    color: colors.charcoal,
    lineHeight: 19,
    marginBottom: 18,
  },
  searchBar: {
    width: "100%",
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    marginBottom: 16,
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    fontSize: 13.5,
    color: colors.charcoal,
  },
  clearButton: {
    paddingHorizontal: 8,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  clearButtonText: {
    fontSize: 18,
    color: colors.muted,
    lineHeight: 18,
  },
  searchIconButton: {
    width: 42,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  ctaButton: {
    backgroundColor: colors.orange,
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 6,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  ctaButtonText: {
    color: colors.white,
    fontSize: 13.5,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
