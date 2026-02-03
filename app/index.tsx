import React, { useRef, useState } from "react";
import {
  Animated,
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

export default function HomeScreen() {
  const router = useRouter();
  const { products, addToCart, cartItems } = useCartContext();
  const { colors } = useThemeContext();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastTranslate = useRef(new Animated.Value(12)).current;

  const showToast = (message: string) => {
    setToastMessage(message);
    toastOpacity.setValue(0);
    toastTranslate.setValue(12);
    Animated.parallel([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(toastTranslate, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        Animated.timing(toastOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => setToastMessage(null));
      }, 900);
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.text }]}>
          Popular Gear
        </Text>
        <Pressable
          onPress={() => router.push("/cart")}
          style={({ pressed }) => [
            styles.cta,
            { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
          ]}
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
            <Image source={{ uri: item.image }} style={styles.thumbnail} />
            <View style={styles.cardBody}>
              <Text style={[styles.productName, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.price, { color: colors.mutedText }]}>
                ${item.price.toFixed(2)}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                addToCart(item);
                showToast(`${item.name} added`);
              }}
              style={({ pressed }) => [
                styles.addButton,
                {
                  borderColor: colors.primary,
                  backgroundColor: pressed ? colors.primary : "transparent",
                },
              ]}
            >
              {({ pressed }) => (
                <Text
                  style={[
                    styles.addButtonText,
                    { color: pressed ? "#FFFFFF" : colors.primary },
                  ]}
                >
                  Add to Cart
                </Text>
              )}
            </Pressable>
          </View>
        )}
      />

      {toastMessage ? (
        <Animated.View
          style={[
            styles.toast,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              opacity: toastOpacity,
              transform: [{ translateY: toastTranslate }],
            },
          ]}
        >
          <Text style={[styles.toastText, { color: colors.text }]}>
            {toastMessage}
          </Text>
        </Animated.View>
      ) : null}
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
    alignItems: "center",
    gap: 12,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 14,
  },
  cardBody: {
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
  toast: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 2,
  },
  toastText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
