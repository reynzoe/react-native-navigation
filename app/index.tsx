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

export default function HomeScreen() {
  const router = useRouter();
  const { products, addToCart, cartItems } = useCartContext();
  const { colors } = useThemeContext();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.text }]}>
          Popular Gear
        </Text>
        <Pressable
          onPress={() => router.push("/cart")}
          style={[styles.cta, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.ctaText}>
            Go to Cart {cartCount ? `(${cartCount})` : ""}
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View>
              <Text style={[styles.productName, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.price, { color: colors.mutedText }]}>
                ${item.price.toFixed(2)}
              </Text>
            </View>
            <Pressable
              onPress={() => addToCart(item)}
              style={[styles.addButton, { borderColor: colors.primary }]}
            >
              <Text style={[styles.addButtonText, { color: colors.primary }]}>
                Add to Cart
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  list: {
    paddingVertical: 16,
    gap: 12,
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
  productName: {
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    marginTop: 6,
    fontSize: 14,
  },
  addButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },
  cta: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  ctaText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
});
