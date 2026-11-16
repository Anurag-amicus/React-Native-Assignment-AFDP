import Card from "../common/Card";
import Button from "../common/Button";
import { View, Text, Image, StyleSheet } from "react-native";
import type { Product } from "@/types/product";
import { Ionicons }  from "@react-native-vector-icons/ionicons"

export function ProductCard({
  name,
  category,
  price,
  rating,
  imageUrl,
}: Product) {
  const onAddtoCart = () => {
    console.log(`Added ${name} to cart`);
  };
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

        <Text style={styles.price}>₹{price.toLocaleString()}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={15} color="#f8cc0a"/>
          <Text style={styles.ratingValue}>{rating} </Text>
          <Text style={styles.ratingCount}>(21)</Text>
        </View>

        <Button title="Add to Cart" variant="primary" onPress={onAddtoCart} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0, 
    overflow: "hidden", 
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 120,
  },
  content: {
    padding: 6,
  },
  category: {
    fontSize: 12,
    color: "#888888",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1087FD",
  },
  ratingContainer: {
    flexDirection:"row",
    alignItems:"center",
    marginBottom: 16,
    marginTop:2,
    gap:2,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },
  ratingCount: {
    fontSize: 14,
    color: "#888888",
  },
});
