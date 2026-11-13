import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const handleGetStarted = () => {
    console.log("Welcome to React Native!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome! To Online Express</Text>

      <Text style={styles.description}>
        Discover quality products designed to fit your everyday needs across
        electronics, fashion, home, and more.
      </Text>

      <Pressable
        style={styles.button}
        onPress={handleGetStarted}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#ffffff",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111111",
    marginBottom: 12,
  },

  description: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 28,
  },

  button: {
    backgroundColor: "#ff5405",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
