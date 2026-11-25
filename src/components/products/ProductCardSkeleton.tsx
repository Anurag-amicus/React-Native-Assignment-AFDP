import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { colors } from "@/theme/colors";

export function usePulseAnimation(): Animated.Value {
  const [pulseAnim] = useState(() => new Animated.Value(0.35));

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.85,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.35,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, [pulseAnim]);

  return pulseAnim;
}

export interface ProductCardSkeletonProps {
  pulseAnim?: Animated.Value;
}

export function ProductCardSkeleton({ pulseAnim: externalPulse }: ProductCardSkeletonProps) {
  const internalPulse = usePulseAnimation();
  const pulseAnim = externalPulse ?? internalPulse;

  return (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder}>
        <Animated.View style={[styles.shimmerBox, { opacity: pulseAnim }]} />
      </View>

      <View style={styles.content}>
        <Animated.View
          style={[styles.categorySkeleton, { opacity: pulseAnim }]}
        />

        <Animated.View
          style={[styles.titleLine1, { opacity: pulseAnim }]}
        />
        <Animated.View
          style={[styles.titleLine2, { opacity: pulseAnim }]}
        />

        <View style={styles.priceRow}>
          <Animated.View
            style={[styles.priceSkeleton, { opacity: pulseAnim }]}
          />
          <Animated.View
            style={[styles.stepperSkeleton, { opacity: pulseAnim }]}
          />
        </View>

        <Animated.View style={[styles.buttonSkeleton, { opacity: pulseAnim }]} />
      </View>
    </View>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  const pulseAnim = usePulseAnimation();
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <View style={styles.gridContainer}>
      {skeletons.map((idx) => (
        <View key={`skeleton-${idx}`} style={styles.gridItem}>
          <ProductCardSkeleton pulseAnim={pulseAnim} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    overflow: "hidden",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  imagePlaceholder: {
    width: "100%",
    height: 130,
    backgroundColor: "#f1f5f9",
    overflow: "hidden",
  },
  shimmerBox: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e2e8f0",
  },
  content: {
    padding: 10,
    width: "100%",
  },
  categorySkeleton: {
    width: "45%",
    height: 9,
    borderRadius: 4,
    backgroundColor: "#e2e8f0",
    marginBottom: 8,
  },
  titleLine1: {
    width: "90%",
    height: 12,
    borderRadius: 4,
    backgroundColor: "#e2e8f0",
    marginBottom: 5,
  },
  titleLine2: {
    width: "65%",
    height: 12,
    borderRadius: 4,
    backgroundColor: "#e2e8f0",
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    minHeight: 28,
  },
  priceSkeleton: {
    width: "40%",
    height: 16,
    borderRadius: 4,
    backgroundColor: "#e2e8f0",
  },
  stepperSkeleton: {
    width: 64,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#e2e8f0",
  },
  buttonSkeleton: {
    width: "100%",
    height: 30,
    borderRadius: 16,
    backgroundColor: "#e2e8f0",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  gridItem: {
    width: "48.5%",
  },
});
