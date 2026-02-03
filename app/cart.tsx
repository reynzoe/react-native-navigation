import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useCartContext } from "../contexts/CartContext";
import { useThemeContext } from "../contexts/ThemeContext";

export default function CartScreen() {
  const router = useRouter();
  const { cartItems, addToCart, removeFromCart, cartTotal } = useCartContext();
  const { colors } = useThemeContext();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              Your cart is empty
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.mutedText }]}>
              Add something from Home to get started.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={styles.itemInfo}>
              <Text style={[styles.productName, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.price, { color: colors.mutedText }]}>
                ${item.totalPrice.toFixed(2)}
              </Text>
            </View>
            <View style={styles.controls}>
              <Pressable
                onPress={() => removeFromCart(item)}
                style={[styles.controlButton, { borderColor: colors.border }]}
              >
                <Text style={[styles.controlText, { color: colors.text }]}>
                  -
                </Text>
              </Pressable>
              <Text style={[styles.quantity, { color: colors.text }]}>
                {item.quantity}
              </Text>
              <Pressable
                onPress={() => addToCart(item)}
                style={[styles.controlButton, { borderColor: colors.border }]}
              >
                <Text style={[styles.controlText, { color: colors.text }]}>
                  +
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <View
        style={[
          styles.summary,
          { borderColor: colors.border, backgroundColor: colors.surface },
        ]}
      >
        <Text style={[styles.summaryText, { color: colors.text }]}>
          Total: ${cartTotal.toFixed(2)}
        </Text>
        <Pressable
          onPress={() => router.push("/checkout")}
          style={[styles.checkoutButton, { backgroundColor: colors.primary }]}
          disabled={!cartItems.length}
        >
          <Text style={styles.checkoutText}>Go to Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  list: {
    gap: 12,
    paddingBottom: 140,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  itemInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    marginTop: 6,
    fontSize: 14,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  controlText: {
    fontSize: 18,
    fontWeight: "600",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "600",
    minWidth: 20,
    textAlign: "center",
  },
  summary: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "700",
  },
  checkoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  checkoutText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: "center",
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
  },
});
