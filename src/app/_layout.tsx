import React from "react";
import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import TopAppBar from "@/components/layout/TopAppBar";
import { colors } from "@/theme/colors";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <TopAppBar />
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
