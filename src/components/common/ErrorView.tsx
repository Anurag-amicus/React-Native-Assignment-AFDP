import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import Button from "@/components/common/Button";
import { colors } from "@/theme/colors";

export interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorView({
  message = "Please try again later.",
  onRetry,
}: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="alert-circle-outline" size={40} color="#ef4444" />
      </View>

      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{message}</Text>

      {onRetry && (
        <Button
          title="Try Again"
          variant="primary"
          size="medium"
          onPress={onRetry}
          style={styles.retryButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 36,
    paddingHorizontal: 24,
    width: "100%",
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fef2f2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.charcoal,
    marginBottom: 6,
    textAlign: "center",
  },
  message: {
    fontSize: 13,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 16,
  },
  retryButton: {
    minWidth: 120,
    borderRadius: 22,
  },
});

