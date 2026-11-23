import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import QuantitySelector from "@/components/common/QuantitySelector";
import { colors } from "@/theme/colors";

interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2999,
    imageUrl:
      "https://img.magnific.com/free-photo/modern-silver-headphones-with-black-earcups_9975-133619.jpg?semt=ais_hybrid&w=740&q=80",
    quantity: 1,
  },
  {
    id: 3,
    name: "Everyday Sneakers",
    category: "Fashion",
    price: 3499,
    imageUrl:
      "https://assets.myntassets.com/assets/images/31797863/2025/1/22/2a47c1c8-64a8-49ad-ac2f-61819239677c1737545922410-plaeto-Men-Sneakers-3261737545922079-5.jpg",
    quantity: 2,
  },
];

export default function CartScreen() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);

  const handleQuantityChange = (id: number, newQty: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (id: number, name: string) => {
    Alert.alert("Remove Item", `Remove ${name} from your cart?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          setItems((prev) => prev.filter((item) => item.id !== id));
        },
      },
    ]);
  };

  const handleCheckout = () => {
    Alert.alert(
      "Order Placed!",
      `Thank you for your purchase! Your order of ₹${total.toLocaleString("en-IN")} is confirmed.`,
      [{ text: "Great!", onPress: () => setItems([]) }]
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 4000 || subtotal === 0 ? 0 : 99;
  const discount = items.length > 1 ? 500 : 0;
  const total = Math.max(0, subtotal + shipping - discount);

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <Ionicons name="cart-outline" size={48} color={colors.orange} />
        </View>

        <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
        <Text style={styles.emptySubtitle}>
          Looks like you haven&apos;t added anything to your cart yet. Explore our products and discover great deals!
        </Text>

        <Pressable
          style={styles.browseButton}
          onPress={() => router.push("/explore")}
          accessibilityRole="button"
          accessibilityLabel="Start Shopping"
        >
          <Text style={styles.browseButtonText}>START SHOPPING</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => `cart-item-${item.id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerRow}>
            <Text style={styles.screenTitle}>Shopping Cart</Text>
            <Text style={styles.itemCountText}>
              {items.reduce((acc, it) => acc + it.quantity, 0)} items
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cartCard}>
            {/* Product Thumbnail */}
            <View style={styles.thumbnailContainer}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.thumbnail}
                resizeMode="contain"
              />
            </View>

            {/* Product Info & Controls */}
            <View style={styles.itemDetails}>
              <View style={styles.itemTopRow}>
                <View style={styles.titleColumn}>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                </View>

                {/* Remove Trash Button */}
                <Pressable
                  onPress={() => handleRemoveItem(item.id, item.name)}
                  hitSlop={8}
                  style={styles.removeButton}
                  accessibilityLabel={`Remove ${item.name}`}
                >
                  <Ionicons name="trash-outline" size={18} color="#ef4444" />
                </Pressable>
              </View>

              {/* Price & Stepper Row */}
              <View style={styles.itemBottomRow}>
                <Text style={styles.itemPrice}>
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </Text>

                <QuantitySelector
                  quantity={item.quantity}
                  onChange={(q) => handleQuantityChange(item.id, q)}
                  min={1}
                  max={20}
                  style={styles.stepper}
                />
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.orderSummaryCard}>
            <Text style={styles.summaryTitle}>Order Summary</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                ₹{subtotal.toLocaleString("en-IN")}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery</Text>
              <Text style={styles.summaryValue}>
                {shipping === 0 ? "FREE" : `₹${shipping}`}
              </Text>
            </View>

            {discount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.discountLabel}>Special Offer Discount</Text>
                <Text style={styles.discountValue}>
                  −₹{discount.toLocaleString("en-IN")}
                </Text>
              </View>
            )}

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>
                ₹{total.toLocaleString("en-IN")}
              </Text>
            </View>
          </View>
        }
      />

      {/* Sticky Bottom Checkout Bar */}
      <View style={styles.checkoutBar}>
        <View style={styles.checkoutPriceInfo}>
          <Text style={styles.checkoutTotalLabel}>TOTAL</Text>
          <Text style={styles.checkoutTotalValue}>
            ₹{total.toLocaleString("en-IN")}
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.checkoutButton,
            pressed && styles.checkoutButtonPressed,
          ]}
          onPress={handleCheckout}
          accessibilityRole="button"
          accessibilityLabel="Proceed to checkout"
        >
          <Text style={styles.checkoutButtonText}>PROCEED TO CHECKOUT</Text>
          <Ionicons name="arrow-forward" size={16} color={colors.white} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.charcoal,
    letterSpacing: -0.4,
  },
  itemCountText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.orange,
  },
  cartCard: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  thumbnailContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    marginRight: 12,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  itemDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  titleColumn: {
    flex: 1,
    marginRight: 8,
  },
  itemCategory: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.charcoal,
  },
  removeButton: {
    padding: 4,
  },
  itemBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.charcoal,
  },
  stepper: {
    alignSelf: "auto",
    height: 28,
  },
  orderSummaryCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.charcoal,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: colors.muted,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.charcoal,
  },
  discountLabel: {
    fontSize: 13,
    color: "#16a34a",
  },
  discountValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#16a34a",
  },
  divider: {
    height: 1,
    backgroundColor: "#f1f5f9",
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 4,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.charcoal,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.orange,
  },
  checkoutBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  checkoutPriceInfo: {
    justifyContent: "center",
  },
  checkoutTotalLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.muted,
    letterSpacing: 0.8,
  },
  checkoutTotalValue: {
    fontSize: 19,
    fontWeight: "900",
    color: colors.charcoal,
  },
  checkoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.orange,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    gap: 6,
    elevation: 2,
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  checkoutButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  checkoutButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.white,
    letterSpacing: 0.5,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#fff7ed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.charcoal,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 13.5,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 320,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: colors.orange,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
    elevation: 2,
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  browseButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
});
