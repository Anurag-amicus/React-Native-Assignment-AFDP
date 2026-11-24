import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { Product } from "@/types/product";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import QuantitySelector from "@/components/common/QuantitySelector";
import { colors } from "@/theme/colors";

export function ProductCard({
  name,
  category,
  price,
  rating,
  imageUrl,
}: Product) {
  const [quantity, setQuantity] = useState(1);
  const totalPrice = price * quantity;

  const handleAddToCart = () => {
    Alert.alert(
      "Added to Cart",
      `${quantity} × ${name}\nTotal: ₹${totalPrice.toLocaleString("en-IN")}`,
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.card}>
      {/* 1. Product Image & Floating Rating Badge */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Floating Rating Badge in Top Right */}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={10} color="#f59e0b" />
          <Text style={styles.ratingValue}>{rating.toFixed(1)}</Text>
        </View>
      </View>

      {/* 2. Product Details Content */}
      <View style={styles.content}>
        {/* Category Tag */}
        <Text style={styles.category} numberOfLines={1}>
          {category}
        </Text>

        {/* Product Title */}
        <Text style={styles.title} numberOfLines={2}>
          {name}
        </Text>

        {/* Dynamic Price & Quantity Stepper Row (Space Between) */}
        <View style={styles.priceAndQuantityRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.price} numberOfLines={1}>
              ₹{totalPrice.toLocaleString("en-IN")}
            </Text>
          </View>

          <QuantitySelector
            quantity={quantity}
            onChange={setQuantity}
            min={1}
            max={20}
            size="small"
          />
        </View>

        {/* Modern Add to Cart Pill Button */}
        <Pressable
          onPress={handleAddToCart}
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={`Add ${quantity} of ${name} to cart`}
        >
          <Ionicons name="cart-outline" size={13} color={colors.white} />
          <Text style={styles.addButtonText}>ADD TO CART</Text>
        </Pressable>
      </View>
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
  imageContainer: {
    width: "100%",
    height: 130,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  ratingBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  ratingValue: {
    fontSize: 10.5,
    fontWeight: "700",
    color: colors.charcoal,
  },
  content: {
    padding: 10,
    width: "100%",
  },
  category: {
    fontSize: 9.5,
    fontWeight: "700",
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 3,
  },
  title: {
    fontSize: 12.5,
    fontWeight: "700",
    color: colors.charcoal,
    letterSpacing: -0.2,
    lineHeight: 16,
    minHeight: 32,
    marginBottom: 6,
  },
  priceAndQuantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    width: "100%",
    minHeight: 28,
  },
  priceContainer: {
    flex: 1,
    marginRight: 6,
    justifyContent: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.charcoal,
    letterSpacing: -0.3,
  },
  unitPriceText: {
    fontSize: 9.5,
    fontWeight: "600",
    color: colors.muted,
    marginTop: 1,
  },
  addButton: {
    width: "100%",
    backgroundColor: colors.orange,
    borderRadius: 16,
    paddingVertical: 7,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    elevation: 1,
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  addButtonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  addButtonText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: colors.white,
    letterSpacing: 0.5,
  },
});
