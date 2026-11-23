import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import HeroSection from "@/components/home/HeroSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import CategorySection from "@/components/home/CategorySection";
import { colors } from "@/theme/colors";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Hero Promo Section with Search & CTA */}
        <HeroSection />

        {/* 2. Featured Products Horizontal Scroll Section */}
        <FeaturedSection />

        {/* 3. Shop by Category Grid */}
        <CategorySection />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
});

