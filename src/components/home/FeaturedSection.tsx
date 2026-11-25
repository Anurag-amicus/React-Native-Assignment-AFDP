import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { ProductCard } from "@/components/products/ProductCard";
import {
  ProductCardSkeleton,
  usePulseAnimation,
} from "@/components/products/ProductCardSkeleton";
import { productService } from "@/services/productService";
import ErrorView from "@/components/common/ErrorView";
import type { Product } from "@/types/product";
import { colors } from "@/theme/colors";

export default function FeaturedSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pulseAnim = usePulseAnimation();
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    let isCurrent = true;

    async function fetchFeatured() {
      try {
        const res = await productService.getProducts({}, { signal: controller.signal });
        if (!isCurrent) return;
        if (res.success) {
          setProducts(res.data.products.slice(0, 8));
          setError(null);
        } else if (res.status !== 499) {
          setError(res.error || "Failed to load featured products");
        }
      } catch (err) {
        if (isCurrent && !(err instanceof Error && err.name === "AbortError")) {
          setError("Network error loading featured products");
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    }

    fetchFeatured();

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Featured Products</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        >
          {[1, 2, 3, 4].map((id) => (
            <View key={id} style={styles.cardWrapper}>
              <ProductCardSkeleton pulseAnim={pulseAnim} />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  if (error && products.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Featured Products</Text>
        </View>
        <ErrorView message="Please try again later." />
      </View>
    );
  }

  if (products.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Featured Products</Text>

        <Pressable
          onPress={() => router.push("/explore")}
          style={styles.viewAllButton}
          accessibilityRole="button"
          accessibilityLabel="View all products"
        >
          <Text style={styles.viewAllText}>View All</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.orange} />
        </Pressable>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => `featured-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={3}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard {...item} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.white,
    paddingVertical: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.charcoal,
    letterSpacing: -0.3,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.orange,
  },
  listContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  cardWrapper: {
    width: 200,
  },
});
