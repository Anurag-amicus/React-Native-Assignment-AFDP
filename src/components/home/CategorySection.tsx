import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { productService } from "@/services/productService";
import type { CategoryItem } from "@/types/product";
import { colors } from "@/theme/colors";

export default function CategorySection() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    productService.getCategories().then(setCategories);
  }, []);

  if (categories.length === 0) return null;

  const handleCategoryPress = (categoryId: number) => {
    router.push({
      pathname: "/explore",
      params: { categoryId: categoryId.toString() },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop by Category</Text>

      <View style={styles.grid}>
        {categories.map((category) => (
          <Pressable
            key={category.categoryId}
            onPress={() => handleCategoryPress(category.categoryId)}
            style={({ pressed }) => [
              styles.categoryCard,
              pressed && styles.categoryCardPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Shop ${category.name}`}
          >
            <Text style={styles.categoryName} numberOfLines={1}>
              {category.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.charcoal,
    letterSpacing: -0.3,
    textAlign: "center",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  categoryCard: {
    width: "48.5%",
    height: 48,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.charcoal,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  categoryCardPressed: {
    backgroundColor: colors.orange,
    borderColor: colors.orange,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.orange,
    letterSpacing: 0.3,
    textTransform: "capitalize",
  },
});

