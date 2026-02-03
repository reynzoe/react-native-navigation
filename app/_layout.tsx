import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider, useThemeContext } from "../contexts/ThemeContext";
import { CartProvider } from "../contexts/CartContext";
import { ThemeToggle } from "../components/ThemeToggle";

function AppStack() {
  const { colors } = useThemeContext();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: "700" },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="cart" options={{ title: "Cart" }} />
      <Stack.Screen name="checkout" options={{ title: "Checkout" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppStack />
      </CartProvider>
    </ThemeProvider>
  );
}
