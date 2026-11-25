import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import Button from "@/components/common/Button";
import { colors } from "@/theme/colors";
import CategoryFilter from "./CategoryFilter";

export interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onReset: () => void;
}

export default function FilterBottomSheet({
  visible,
  onClose,
  categories,
  selectedCategory,
  onCategoryChange,
  onReset,
}: FilterBottomSheetProps) {
  const insets = useSafeAreaInsets();
  const hasActiveFilter = selectedCategory !== null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <View style={styles.handleContainer}>
            <View style={styles.handleBar} />
          </View>

          <View style={styles.header}>
            <View style={styles.titleGroup}>
              <Text style={styles.title}>Filter Products</Text>
              {hasActiveFilter && (
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>1 active</Text>
                </View>
              )}
            </View>

            <Pressable
              onPress={onClose}
              style={styles.closeButton}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Close filter bottom sheet"
            >
              <Ionicons name="close" size={22} color={colors.charcoal} />
            </Pressable>
          </View>

          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Category</Text>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onChange={onCategoryChange}
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Button
              title="Clear Filter"
              variant="outline"
              size="medium"
              disabled={!hasActiveFilter}
              onPress={onReset}
              style={styles.clearBtn}
            />
            <Button
              title="Apply Filter"
              variant="primary"
              size="medium"
              onPress={onClose}
              style={styles.applyBtn}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  backdrop: {
    flex: 1,
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "80%",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  handleContainer: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 6,
  },
  handleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.borderDark,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  titleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.charcoal,
    letterSpacing: -0.3,
  },
  activeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: colors.orangeLight,
  },
  activeBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.orange,
  },
  closeButton: {
    padding: 4,
  },
  scrollArea: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  section: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.charcoal,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  clearBtn: {
    flex: 1,
    borderRadius: 24,
  },
  applyBtn: {
    flex: 1.2,
    borderRadius: 24,
  },
});
