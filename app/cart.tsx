import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useCartContext } from "../contexts/CartContext";
import { useThemeContext } from "../contexts/ThemeContext";
import { cartStyles } from "../styles/cartStyles";

export default function CartScreen() {
  const router = useRouter();
  const { cartItems, addToCart, removeFromCart, cartTotal } = useCartContext();
  const { colors, mode } = useThemeContext();

  return (
    <View style={[cartStyles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={cartStyles.list}
        ListEmptyComponent={
          <View style={cartStyles.emptyState}>
            <Text style={[cartStyles.emptyTitle, { color: colors.text }]}>
              Your bag is empty
            </Text>
            <Text style={[cartStyles.emptySubtitle, { color: colors.mutedText }]}>
              Add something from Home to get started.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              cartStyles.card,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Image source={{ uri: item.image }} style={cartStyles.thumbnail} />
            <View style={cartStyles.itemInfo}>
              <Text style={[cartStyles.productName, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={[cartStyles.price, { color: colors.mutedText }]}>
                ${item.totalPrice.toFixed(2)}
              </Text>
            </View>
            <View style={cartStyles.controls}>
              <Pressable
                onPress={() => removeFromCart(item)}
                style={({ pressed }) => [
                  cartStyles.controlButton,
                  { borderColor: colors.border, opacity: pressed ? 0.6 : 1 },
                ]}
              >
                <Text style={[cartStyles.controlText, { color: colors.text }]}>
                  -
                </Text>
              </Pressable>
              <Text style={[cartStyles.quantity, { color: colors.text }]}>
                {item.quantity}
              </Text>
              <Pressable
                onPress={() => addToCart(item)}
                style={({ pressed }) => [
                  cartStyles.controlButton,
                  { borderColor: colors.border, opacity: pressed ? 0.6 : 1 },
                ]}
              >
                <Text style={[cartStyles.controlText, { color: colors.text }]}>
                  +
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <View
        style={[
          cartStyles.summary,
          { borderColor: colors.border, backgroundColor: colors.surface },
        ]}
      >
        <Text style={[cartStyles.summaryText, { color: colors.text }]}>
          Total: ${cartTotal.toFixed(2)}
        </Text>
        <Pressable
          onPress={() => router.push("/checkout")}
          style={({ pressed }) => [
            cartStyles.checkoutButton,
            {
              backgroundColor: colors.primary,
              opacity: pressed || !cartItems.length ? 0.7 : 1,
            },
          ]}
          disabled={!cartItems.length}
        >
          <Text
            style={[
              cartStyles.checkoutText,
              { color: mode === "dark" ? "#111111" : "#FFFFFF" },
            ]}
          >
            Go to Checkout
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
