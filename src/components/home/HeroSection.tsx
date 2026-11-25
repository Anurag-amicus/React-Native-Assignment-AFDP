import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { colors } from "@/theme/colors";

export default function HeroSection() {
  const router = useRouter();

  const handleExplore = () => {
    router.push("/explore");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../../../assets/herosection.png")}
          style={styles.heroImage}
          contentFit="cover"
          transition={200}
        />

        <LinearGradient
          colors={[
            "rgba(15, 23, 42, 0.88)",
            "rgba(15, 23, 42, 0.55)",
            "rgba(15, 23, 42, 0.15)",
          ]}
          locations={[0, 0.52, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradientOverlay}
        />

        <View style={styles.content}>
          <View style={styles.eyebrowBadge}>
            <Ionicons name="sparkles" size={11} color={colors.orange} />
            <Text style={styles.eyebrowText}>CURATED FOR YOU</Text>
          </View>

          <Text style={styles.headline}>
            Find The Right Products
          </Text>

          <Text style={styles.subtitle}>
            Discover quality essentials crafted for everyday style, performance, and durability.
          </Text>

          <Pressable
            onPress={handleExplore}
            style={({ pressed }) => [
              styles.ctaButton,
              pressed && styles.ctaButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Explore our product collection"
          >
            <Text style={styles.ctaText}>EXPLORE COLLECTION</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.white} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6,
    backgroundColor: colors.white,
  },
  card: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#1e293b",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    maxWidth: "80%",
    zIndex: 2,
  },
  eyebrowBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 84, 5, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(255, 84, 5, 0.4)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
    marginBottom: 8,
  },
  eyebrowText: {
    fontSize: 9,
    fontWeight: "800",
    color: colors.orange,
    letterSpacing: 1.2,
  },
  headline: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.white,
    letterSpacing: -0.4,
    lineHeight: 27,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 11.5,
    fontWeight: "500",
    color: "#cbd5e1",
    lineHeight: 16,
    marginBottom: 16,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.orange,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 6,
    elevation: 2,
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  ctaButtonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  ctaText: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.white,
    letterSpacing: 0.8,
  },
});
