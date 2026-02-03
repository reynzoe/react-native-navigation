import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
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
  const [pendingRemove, setPendingRemove] = useState<
    | {
        id: string;
        name: string;
      }
    | null
  >(null);

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
                onPress={() => {
                  if (item.quantity <= 1) {
                    setPendingRemove({ id: item.id, name: item.name });
                    return;
                  }
                  removeFromCart(item);
                }}
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

      <Modal transparent visible={!!pendingRemove} animationType="fade">
        <View style={cartStyles.modalBackdrop}>
          <View
            style={[
              cartStyles.modalCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[cartStyles.modalTitle, { color: colors.text }]}>
              {pendingRemove
                ? `${pendingRemove.name} will be removed from your cart.`
                : ""}
            </Text>
            <View style={cartStyles.modalActions}>
              <Pressable
                onPress={() => setPendingRemove(null)}
                style={[
                  cartStyles.modalGhostButton,
                  { borderColor: colors.border },
                ]}
              >
                <Text style={[cartStyles.modalGhostText, { color: colors.text }]}>
                  Go Back
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  if (pendingRemove) {
                    const item = cartItems.find((cartItem) => cartItem.id === pendingRemove.id);
                    if (item) {
                      removeFromCart(item);
                    }
                  }
                  setPendingRemove(null);
                }}
                style={[
                  cartStyles.modalButton,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text
                  style={[
                    cartStyles.modalButtonText,
                    { color: mode === "dark" ? "#111111" : "#FFFFFF" },
                  ]}
                >
                  Proceed
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
