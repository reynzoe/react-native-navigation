import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useCartContext } from "../contexts/CartContext";
import { useThemeContext } from "../contexts/ThemeContext";
import { homeStyles } from "../styles/homeStyles";

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
    <View style={[homeStyles.container, { backgroundColor: colors.background }]}>
      <View style={homeStyles.headerRow}>
        <Text style={[homeStyles.title, { color: colors.text }]}>
          Popular Gear
        </Text>
        <Pressable
          onPress={() => router.push("/cart")}
          style={({ pressed }) => [
            homeStyles.cta,
            { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Text style={homeStyles.ctaText}>
            Go to Cart {cartCount ? `(${cartCount})` : ""}
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={homeStyles.grid}
        numColumns={2}
        columnWrapperStyle={homeStyles.columnWrapper}
        renderItem={({ item }) => (
          <View
            style={[
              homeStyles.card,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Image source={{ uri: item.image }} style={homeStyles.image} />
            <View style={homeStyles.cardBody}>
              <Text style={[homeStyles.productName, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={[homeStyles.price, { color: colors.mutedText }]}>
                ${item.price.toFixed(2)}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                addToCart(item);
                showToast(`${item.name} added`);
              }}
              style={({ pressed }) => [
                homeStyles.addButton,
                {
                  borderColor: colors.primary,
                  backgroundColor: pressed ? colors.primary : "transparent",
                },
              ]}
            >
              {({ pressed }) => (
                <Text
                  style={[
                    homeStyles.addButtonText,
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
            homeStyles.toast,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              opacity: toastOpacity,
              transform: [{ translateY: toastTranslate }],
            },
          ]}
        >
          <Text style={[homeStyles.toastText, { color: colors.text }]}>
            {toastMessage}
          </Text>
        </Animated.View>
      ) : null}
    </View>
  );
}
