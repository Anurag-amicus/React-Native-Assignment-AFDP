import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Footer() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
      <Text style={styles.brand}>Online Express</Text>
      <Text style={styles.copyright}>© 2026 • Quality products for everyday needs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  brand: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
    color: "#888888",
  },
});
