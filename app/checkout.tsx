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
import { useCartContext } from "../contexts/CartContext";
import { useThemeContext } from "../contexts/ThemeContext";
import { checkoutStyles } from "../styles/checkoutStyles";

export default function CheckoutScreen() {
  const router = useRouter();
  const { cartItems, clearCart, removeItems } = useCartContext();
  const { colors } = useThemeContext();
  const [selectedIds, setSelectedIds] = useState<string[]>(
    cartItems.map((item) => item.id)
  );
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setSelectedIds((current) => {
      const availableIds = cartItems.map((item) => item.id);
      const next = current.filter((id) => availableIds.includes(id));
      return next.length ? next : availableIds;
    });
  }, [cartItems]);

  const selectedItems = useMemo(
    () => cartItems.filter((item) => selectedIds.includes(item.id)),
    [cartItems, selectedIds]
  );

  const selectedTotal = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [selectedItems]);

  const toggleSelection = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    );
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
                borderColor: allSelected ? colors.primary : colors.border,
                backgroundColor: allSelected ? colors.primary : "transparent",
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
                    ? colors.primary
                    : colors.border,
                  backgroundColor: selectedIds.includes(item.id)
                    ? colors.primary
                    : "transparent",
                },
              ]}
            />
            <Image source={{ uri: item.image }} style={checkoutStyles.thumbnail} />
            <View style={checkoutStyles.rowBody}>
              <Text style={[checkoutStyles.productName, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={[checkoutStyles.quantity, { color: colors.mutedText }]}>
                Qty {item.quantity}
              </Text>
            </View>
            <Text style={[checkoutStyles.price, { color: colors.text }]}>
              ${item.totalPrice.toFixed(2)}
            </Text>
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
          <Text style={checkoutStyles.checkoutText}>Checkout</Text>
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
                router.replace("/");
              }}
              style={[
                checkoutStyles.modalButton,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text style={checkoutStyles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
