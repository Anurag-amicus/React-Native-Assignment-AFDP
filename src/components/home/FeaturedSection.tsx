import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { ProductCard } from "@/components/products/ProductCard";
import { productService } from "@/services/productService";
import type { Product } from "@/types/product";
import { colors } from "@/theme/colors";

export default function FeaturedSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    productService.getProducts({}).then((res) => {
      setProducts(res.products);
    });
  }, []);

  if (products.length === 0) return null;

  return (
    <View style={styles.container}>
      {/* Section Header */}
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

      {/* Horizontal Scroll List */}
      <FlatList
        data={products}
        keyExtractor={(item) => `featured-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
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

