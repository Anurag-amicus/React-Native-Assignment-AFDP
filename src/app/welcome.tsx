import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { colors } from "@/theme/colors";

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    console.log("Welcome to React Native!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome! To Online Express</Text>

      <Text style={styles.description}>
        Discover quality products designed to fit your everyday needs across
        electronics, fashion, home, and more.
      </Text>

      <Pressable
        style={styles.button}
        onPress={handleGetStarted}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>

      <Pressable
        style={styles.browseButton}
        onPress={() => router.push("/products")}
        accessibilityRole="button"
      >
        <Text style={styles.browseButtonText}>Browse Products</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    color: colors.charcoal,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: colors.muted,
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.orange,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
    maxWidth: 280,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  browseButton: {
    marginTop: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.orange,
    backgroundColor: "transparent",
    width: "100%",
    maxWidth: 280,
    alignItems: "center",
  },
  browseButtonText: {
    color: colors.orange,
    fontSize: 16,
    fontWeight: "bold",
  },
});
