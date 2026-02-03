import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useCartContext } from "../contexts/CartContext";
import { useThemeContext } from "../contexts/ThemeContext";
import { checkoutStyles } from "../styles/checkoutStyles";

export default function CheckoutScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { cartItems, removeItems } = useCartContext();
  const { colors, mode } = useThemeContext();
  const [selectedIds, setSelectedIds] = useState<string[]>(
    cartItems.map((item) => item.id)
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const selectionColor = "#16A34A";
  const [checkoutQuantities, setCheckoutQuantities] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    setSelectedIds((current) => {
      const availableIds = cartItems.map((item) => item.id);
      const next = current.filter((id) => availableIds.includes(id));
      return next.length ? next : availableIds;
    });
    setCheckoutQuantities((current) => {
      const next: Record<string, number> = { ...current };
      cartItems.forEach((item) => {
        if (!next[item.id] || next[item.id] > item.quantity) {
          next[item.id] = item.quantity;
        }
      });
      Object.keys(next).forEach((id) => {
        if (!cartItems.find((item) => item.id === id)) {
          delete next[id];
        }
      });
      return next;
    });
  }, [cartItems]);

  const selectedItems = useMemo(
    () =>
      cartItems.filter((item) => selectedIds.includes(item.id)).map((item) => ({
        ...item,
        checkoutQuantity: checkoutQuantities[item.id] ?? item.quantity,
      })),
    [cartItems, selectedIds, checkoutQuantities]
  );

  const selectedTotal = useMemo(() => {
    return selectedItems.reduce(
      (sum, item) => sum + item.price * item.checkoutQuantity,
      0
    );
  }, [selectedItems]);

  const toggleSelection = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    );
  };

  const adjustCheckoutQty = (id: string, maxQty: number, delta: number) => {
    setCheckoutQuantities((current) => {
      const base = current[id] ?? maxQty;
      const nextQty = Math.max(1, base + delta);
      return { ...current, [id]: nextQty };
    });
  };

  const increaseCheckoutQty = (id: string, maxQty: number) => {
    setCheckoutQuantities((current) => {
      const base = current[id] ?? maxQty;
      return { ...current, [id]: base + 1 };
    });
  };

  const allSelected = selectedIds.length === cartItems.length && cartItems.length > 0;

  const handleCheckout = () => {
    if (!selectedItems.length) {
      return;
    }
    setShowSuccess(true);
  };

  return (
    <View style={[checkoutStyles.container, { backgroundColor: colors.background }]}>
      {cartItems.length ? (
        <Pressable
          onPress={() =>
            setSelectedIds(allSelected ? [] : cartItems.map((item) => item.id))
          }
          style={[
            checkoutStyles.selectAllRow,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View
            style={[
              checkoutStyles.selectButton,
              {
                borderColor: allSelected ? selectionColor : colors.border,
                backgroundColor: allSelected ? selectionColor : "transparent",
              },
            ]}
          />
          <Text style={[checkoutStyles.selectAllText, { color: colors.text }]}>
            {allSelected ? "All selected" : "Select all"}
          </Text>
        </Pressable>
      ) : null}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={checkoutStyles.list}
        ListEmptyComponent={
          <View style={checkoutStyles.emptyState}>
            <Text style={[checkoutStyles.emptyTitle, { color: colors.text }]}>
              Nothing to checkout
            </Text>
            <Text
              style={[checkoutStyles.emptySubtitle, { color: colors.mutedText }]}
            >
              Add items on Home before checking out.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              checkoutStyles.row,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Pressable
              onPress={() => toggleSelection(item.id)}
              style={[
                checkoutStyles.selectButton,
                {
                  borderColor: selectedIds.includes(item.id)
                    ? selectionColor
                    : colors.border,
                  backgroundColor: selectedIds.includes(item.id)
                    ? selectionColor
                    : "transparent",
                },
              ]}
            >
              {selectedIds.includes(item.id) ? (
                <Text style={checkoutStyles.checkMark}>✓</Text>
              ) : null}
            </Pressable>
            <Image source={{ uri: item.image }} style={checkoutStyles.thumbnail} />
            <View style={checkoutStyles.rowBody}>
              <Text style={[checkoutStyles.productName, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={[checkoutStyles.quantity, { color: colors.mutedText }]}>
                In cart: {item.quantity}
              </Text>
            </View>
            <View style={checkoutStyles.checkoutControls}>
              <Pressable
                onPress={() => adjustCheckoutQty(item.id, item.quantity, -1)}
                style={({ pressed }) => [
                  checkoutStyles.controlButton,
                  { borderColor: colors.border, opacity: pressed ? 0.6 : 1 },
                ]}
              >
                <Text style={[checkoutStyles.controlText, { color: colors.text }]}>
                  -
                </Text>
              </Pressable>
              <Text style={[checkoutStyles.checkoutQty, { color: colors.text }]}>
                {checkoutQuantities[item.id] ?? item.quantity}
              </Text>
              <Pressable
                onPress={() => increaseCheckoutQty(item.id, item.quantity)}
                style={({ pressed }) => [
                  checkoutStyles.controlButton,
                  { borderColor: colors.border, opacity: pressed ? 0.6 : 1 },
                ]}
              >
                <Text style={[checkoutStyles.controlText, { color: colors.text }]}>
                  +
                </Text>
              </Pressable>
              <Text style={[checkoutStyles.price, { color: colors.text }]}>
                $
                {(
                  item.price *
                  (checkoutQuantities[item.id] ?? item.quantity)
                ).toFixed(2)}
              </Text>
            </View>
            {(checkoutQuantities[item.id] ?? item.quantity) > item.quantity ? (
              <Text style={[checkoutStyles.overQtyHint, { color: colors.mutedText }]}>
                Above added qty
              </Text>
            ) : null}
          </View>
        )}
      />

      <View
        style={[
          checkoutStyles.summary,
          { borderColor: colors.border, backgroundColor: colors.surface },
        ]}
      >
        <Text style={[checkoutStyles.summaryText, { color: colors.text }]}>
          Selected: ${selectedTotal.toFixed(2)}
        </Text>
        <Pressable
          onPress={handleCheckout}
          style={({ pressed }) => [
            checkoutStyles.checkoutButton,
            {
              backgroundColor: colors.primary,
              opacity: pressed || !selectedItems.length ? 0.7 : 1,
            },
          ]}
          disabled={!selectedItems.length}
        >
          <Text
            style={[
              checkoutStyles.checkoutText,
              { color: mode === "dark" ? "#111111" : "#FFFFFF" },
            ]}
          >
            Checkout
          </Text>
        </Pressable>
      </View>

      <Modal transparent visible={showSuccess} animationType="fade">
        <View style={checkoutStyles.modalBackdrop}>
          <View
            style={[
              checkoutStyles.modalCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[checkoutStyles.modalTitle, { color: colors.text }]}>
              Checkout successful
            </Text>
            <Pressable
              onPress={() => {
                setShowSuccess(false);
                removeItems(selectedIds);
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "index" as never }],
                  })
                );
              }}
              style={[
                checkoutStyles.modalButton,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text
                style={[
                  checkoutStyles.modalButtonText,
                  { color: mode === "dark" ? "#111111" : "#FFFFFF" },
                ]}
              >
                OK
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
