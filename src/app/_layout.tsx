import React from "react";
import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import Header from "@/components/layout/Header";
import { colors } from "@/theme/colors";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.white },
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
});
