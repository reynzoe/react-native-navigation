import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useThemeContext } from "../contexts/ThemeContext";

export function ThemeToggle() {
  const { mode, toggleTheme, colors } = useThemeContext();
  const isDark = mode === "dark";

  return (
    <Pressable
      onPress={toggleTheme}
      style={[
        styles.button,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <Text
        style={[
          styles.icon,
          { color: isDark ? colors.primary : colors.text },
        ]}
      >
        {isDark ? "☾" : "☀"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    gap: 6,
  },
  icon: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
});
