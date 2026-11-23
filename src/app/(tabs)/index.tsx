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
        {/* 1. Hero Promo Card */}
        <HeroSection />

        {/* 2. Shop by Category Visual Cards */}
        <CategorySection />

        {/* 3. Featured Products Horizontal Strip */}
        <FeaturedSection />
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

