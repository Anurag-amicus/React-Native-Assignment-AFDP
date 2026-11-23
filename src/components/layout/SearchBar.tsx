import React from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { colors } from "@/theme/colors";

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  onClear,
  placeholder = "Search products...",
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={18}
        color={colors.orange}
        style={styles.searchIcon}
      />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {value.length > 0 && (
        <Pressable
          onPress={() => {
            onChangeText("");
            onClear?.();
          }}
          style={styles.iconButton}
          hitSlop={8}
          accessibilityLabel="Clear search"
        >
          <Ionicons name="close-circle" size={18} color={colors.muted} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f5f7",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 22,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 13,
    color: colors.black,
    paddingVertical: 0,
  },
  iconButton: {
    marginLeft: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});

