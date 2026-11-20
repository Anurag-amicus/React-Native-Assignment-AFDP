import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import type { Product } from "@/types/product";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import Card from "../common/Card";
import Button from "../common/Button";
import QuantitySelector from "../common/QuantitySelector";
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
    console.log(`Added ${quantity} × ${name} to cart`);
    Alert.alert(
      "Added to Cart",
      `${quantity} × ${name}\nTotal: ₹${totalPrice.toLocaleString("en-IN")}`,
      [{ text: "OK" }]
    );
  };

  return (
    <Card variant="elevated" style={styles.card}>
      {/* 1. Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* 2. Product Details */}
      <View style={styles.content}>
        {/* Title: Left Aligned */}
        <Text style={styles.title} numberOfLines={1}>
          {name.toUpperCase()}
        </Text>

        {/* Space-Between Row: Category (Left) & Rating (Right) */}
        <View style={styles.metaRow}>
          <Text style={styles.category} numberOfLines={1}>
            {category}
          </Text>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={11} color="#f59e0b" />
            <Text style={styles.ratingValue}>{rating.toFixed(1)}</Text>
          </View>
        </View>

        {/* Price Row: Centered */}
        <View style={styles.priceRow}>
          <Text style={styles.unitPrice}>₹{price.toLocaleString("en-IN")}</Text>
          {quantity > 1 && (
            <Text style={styles.totalPrice}>
              (₹{totalPrice.toLocaleString("en-IN")})
            </Text>
          )}
        </View>

        {/* Quantity Stepper: Centered */}
        <QuantitySelector
          quantity={quantity}
          onChange={setQuantity}
          style={styles.quantitySelector}
        />

        {/* Full-width Add to Cart Button (No Text Wrapping) */}
        <Button
          title="ADD TO CART"
          variant="primary"
          size="small"
          onPress={handleAddToCart}
          style={styles.addButton}
          textStyle={styles.addButtonText}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: "hidden",
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  imageContainer: {
    width: "100%",
    height: 110,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    paddingVertical: 2,
    paddingHorizontal: 2,
    width: "100%",
  },
  title: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.orange,
    textAlign: "left",
    alignSelf: "flex-start",
    letterSpacing: 0.3,
    marginBottom: 4,
    width: "100%",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 6,
  },
  category: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    flexShrink: 1,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  ratingValue: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.charcoal,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    gap: 4,
    marginBottom: 6,
    width: "100%",
  },
  unitPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.black,
  },
  totalPrice: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.muted,
  },
  quantitySelector: {
    marginBottom: 8,
    alignSelf: "center",
  },
  addButton: {
    width: "100%",
    paddingVertical: 8,
    borderRadius: 4,
  },
  addButtonText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
    textAlign: "center",
  },
});
