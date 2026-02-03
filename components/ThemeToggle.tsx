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
      <View
        style={[
          styles.indicator,
          { backgroundColor: isDark ? colors.primary : colors.border },
        ]}
      />
      <Text style={[styles.label, { color: colors.text }]}>
        {isDark ? "Dark" : "Light"}
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
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
