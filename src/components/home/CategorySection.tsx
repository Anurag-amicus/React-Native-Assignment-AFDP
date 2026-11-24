import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { productService } from "@/services/productService";
import { colors } from "@/theme/colors";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

interface CategoryMeta {
  icon: IoniconsName;
  imageUrl: string;
  subtitle: string;
}

const CATEGORY_META_BY_NAME: Record<string, CategoryMeta> = {
  electronics: {
    icon: "laptop-outline",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    subtitle: "Audio & Tech",
  },
  jewelery: {
    icon: "diamond-outline",
    imageUrl:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
    subtitle: "Fine Jewels",
  },
  "men's clothing": {
    icon: "shirt-outline",
    imageUrl:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80",
    subtitle: "Men's Apparel",
  },
  "women's clothing": {
    icon: "woman-outline",
    imageUrl:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80",
    subtitle: "Women's Fashion",
  },
};

const DEFAULT_META: CategoryMeta = {
  icon: "pricetag-outline",
  imageUrl:
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&q=80",
  subtitle: "Explore Items",
};

export default function CategorySection() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    let isCurrent = true;

    productService
      .getCategories({ signal: controller.signal })
      .then((res) => {
        if (!isCurrent) return;
        if (res.success) {
          setCategories(res.data);
        }
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Shop by Category</Text>
            <Text style={styles.subtitle}>Curated collections designed for you</Text>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        >
          {[1, 2, 3, 4].map((id) => (
            <View key={id} style={[styles.categoryCard, styles.skeletonCard]} />
          ))}
        </ScrollView>
      </View>
    );
  }

  if (categories.length === 0) return null;

  const handleCategoryPress = (category: string) => {
    router.push({
      pathname: "/explore",
      params: { category },
    });
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Shop by Category</Text>
          <Text style={styles.subtitle}>Curated collections designed for you</Text>
        </View>

        <Pressable
          onPress={() => router.push("/explore")}
          style={styles.viewAllButton}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="View all categories"
        >
          <Text style={styles.viewAllText}>See All</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.orange} />
        </Pressable>
      </View>

      {/* Modern Visual Category Cards Horizontal Strip */}
      <FlatList
        data={categories}
        keyExtractor={(item) => `cat-${item}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const meta =
            CATEGORY_META_BY_NAME[item.toLowerCase()] ?? DEFAULT_META;

          return (
            <Pressable
              onPress={() => handleCategoryPress(item)}
              style={({ pressed }) => [
                styles.categoryCard,
                pressed && styles.categoryCardPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Shop ${item} category`}
            >
              {/* Background Image */}
              <Image
                source={{ uri: meta.imageUrl }}
                style={styles.cardImage}
                resizeMode="cover"
              />

              {/* Scrim Gradient for Readability */}
              <LinearGradient
                colors={[
                  "rgba(15, 23, 42, 0.15)",
                  "rgba(15, 23, 42, 0.45)",
                  "rgba(15, 23, 42, 0.85)",
                ]}
                locations={[0, 0.5, 1]}
                style={styles.scrimGradient}
              />

              {/* Top Category Icon Badge */}
              <View style={styles.iconCircle}>
                <Ionicons name={meta.icon} size={16} color={colors.orange} />
              </View>

              {/* Bottom Title & Subtitle */}
              <View style={styles.textContainer}>
                <Text style={styles.categoryName} numberOfLines={1}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
                <Text style={styles.categorySubtitle} numberOfLines={1}>
                  {meta.subtitle}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.white,
    paddingVertical: 18,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  title: {
    fontSize: 19,
    fontWeight: "800",
    color: colors.charcoal,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.muted,
    marginTop: 2,
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
  categoryCard: {
    width: 136,
    height: 168,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  skeletonCard: {
    backgroundColor: colors.surface,
  },
  categoryCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  cardImage: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
  },
  scrimGradient: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
  },
  iconCircle: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.white,
    letterSpacing: -0.2,
    lineHeight: 18,
  },
  categorySubtitle: {
    fontSize: 10.5,
    fontWeight: "500",
    color: "#cbd5e1",
    marginTop: 2,
  },
});
