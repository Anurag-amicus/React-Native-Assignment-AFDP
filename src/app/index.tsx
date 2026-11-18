import { FlatList, StyleSheet,View } from "react-native";
import { ProductCard } from "@/components/products/ProductCard";
import productdata from "../data/products.json";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"
export default function HomeScreen() {


  return (
    <View style={styles.container}>
      <Header/>
      <FlatList
        data={productdata}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={Footer}
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
    flex: 1,
    backgroundColor: "#ffffff",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16, // Space between fixed header and first cards
    paddingBottom: 32,
  },
  row: {
    justifyContent: "space-between",
    gap: 12,
  },
  cardWrapper: {
    flex: 1,
  },
});