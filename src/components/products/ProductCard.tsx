import Card from "../common/Card";
import Button from "../common/Button";
import {View,Text, Image, StyleSheet } from "react-native";
import type { Product } from "@/types/product";

export function ProductCard({ name, category, price, rating, imageUrl }: Product) {
    return (
        <Card variant="elevated" style={styles.card}>
     
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        
        <Text style={styles.category}>{category}</Text>
        
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.price}>₹{price.toLocaleString()}</Text>
          <Text style={styles.rating}>★ {rating}</Text>
        </View>
        
        <Button
          title="Add to Cart"
          variant="primary"
        />
      </View>
    </Card>
    )
}

const styles = StyleSheet.create({
  card: {
    padding: 0, // Reset padding so image goes edge-to-edge if desired
    overflow: "hidden", // Ensures image corners clip to the card's rounded border
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 180,
  },
  content: {
    padding: 16,
  },
  category: {
    fontSize: 12,
    color: "#888888",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row", // Places price and rating on the same line
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff5405",
  },
  rating: {
    fontSize: 14,
    color: "#666666",
  },
});