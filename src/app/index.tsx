import {FlatList,StyleSheet, Text,View } from "react-native";
import { ProductCard } from "@/components/products/ProductCard";
import productdata from "../data/products.json"

export default function HomeScreen() {
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Online Express</Text>
    </View>
  );
  return (
    <FlatList
      data={productdata}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row} 
      contentContainerStyle={styles.listContainer}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <ProductCard {...item} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
    borderRadius: 12,
    backgroundColor: "#1087FD"
  },
  title:{
    fontSize:24,
    fontWeight:500,
    color:"#ffffff",
    padding:5
  },
  row: {
    justifyContent: "space-between", 
    gap: 12,
  },
  cardWrapper: {
    flex: 1, 
  },
});
