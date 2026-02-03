import React from "react";
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
import { useCartContext } from "../contexts/CartContext";
import { useThemeContext } from "../contexts/ThemeContext";

export default function CheckoutScreen() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCartContext();
  const { colors } = useThemeContext();

  const handleCheckout = () => {
    Alert.alert("Checkout successful", undefined, [
      {
        text: "OK",
        onPress: () => {
          clearCart();
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              Nothing to checkout
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.mutedText }]}>
              Add items on Home before checking out.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.row,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Image source={{ uri: item.image }} style={styles.thumbnail} />
            <View style={styles.rowBody}>
              <Text style={[styles.productName, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.quantity, { color: colors.mutedText }]}>
                Qty {item.quantity}
              </Text>
            </View>
            <Text style={[styles.price, { color: colors.text }]}>
              ${item.totalPrice.toFixed(2)}
            </Text>
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
          onPress={handleCheckout}
          style={({ pressed }) => [
            styles.checkoutButton,
            {
              backgroundColor: colors.primary,
              opacity: pressed || !cartItems.length ? 0.7 : 1,
            },
          ]}
          disabled={!cartItems.length}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
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
  row: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: 12,
  },
  rowBody: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
  },
  quantity: {
    marginTop: 4,
    fontSize: 12,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
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
