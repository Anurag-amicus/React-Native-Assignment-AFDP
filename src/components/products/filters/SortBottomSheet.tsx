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
import type { SortDirection, SortOption } from "@/types/filter";
import { colors } from "@/theme/colors";
import SortFilter from "./SortFilter";

export interface SortBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  selectedSort: SortOption | null;
  selectedDirection: SortDirection;
  onSortChange: (sort: SortOption) => void;
  onDirectionChange: (direction: SortDirection) => void;
  onClearSort: () => void;
}

export default function SortBottomSheet({
  visible,
  onClose,
  selectedSort,
  selectedDirection,
  onSortChange,
  onDirectionChange,
  onClearSort,
}: SortBottomSheetProps) {
  const insets = useSafeAreaInsets();
  const hasActiveSort = selectedSort !== null;

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
              <Text style={styles.title}>Sort Products</Text>
              {hasActiveSort && (
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>Active</Text>
                </View>
              )}
            </View>

            <Pressable
              onPress={onClose}
              style={styles.closeButton}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Close sort bottom sheet"
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
              <SortFilter
                selectedSort={selectedSort}
                selectedDirection={selectedDirection}
                onSortChange={onSortChange}
                onDirectionChange={onDirectionChange}
                onClearSort={onClearSort}
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Button
              title="Clear Sort"
              variant="outline"
              size="medium"
              disabled={!hasActiveSort}
              onPress={onClearSort}
              style={styles.clearBtn}
            />
            <Button
              title="Apply Sort"
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
