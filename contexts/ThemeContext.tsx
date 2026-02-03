import React, { createContext, useContext, useMemo, useState } from "react";

type ThemeMode = "light" | "dark";

type ThemeColors = {
  background: string;
  surface: string;
  text: string;
  mutedText: string;
  primary: string;
  border: string;
};

type ThemeContextValue = {
  mode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const lightColors: ThemeColors = {
  background: "#F7F7F7",
  surface: "#FFFFFF",
  text: "#111111",
  mutedText: "#5B5B5B",
  primary: "#111111",
  border: "#E6E6E6",
};

const darkColors: ThemeColors = {
  background: "#0B0B0B",
  surface: "#141414",
  text: "#F2F2F2",
  mutedText: "#9A9A9A",
  primary: "#F2F2F2",
  border: "#262626",
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");

  const value = useMemo<ThemeContextValue>(() => {
    const colors = mode === "light" ? lightColors : darkColors;
    return {
      mode,
      colors,
      toggleTheme: () =>
        setMode((current) => (current === "light" ? "dark" : "light")),
    };
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
}
