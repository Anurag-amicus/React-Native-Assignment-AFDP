import { View, Text, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header () {
    const insets =  useSafeAreaInsets ();
    return (
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.title}>Our Products</Text>
      </View>
    )
}

const styles = StyleSheet.create({
 header: {
    width: "100%", 
    backgroundColor: "#1087FD",
    paddingBottom: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
  }
});