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
  background: "#F6F7FB",
  surface: "#FFFFFF",
  text: "#0F172A",
  mutedText: "#475569",
  primary: "#2563EB",
  border: "#E2E8F0",
};

const darkColors: ThemeColors = {
  background: "#0B1020",
  surface: "#121A33",
  text: "#E2E8F0",
  mutedText: "#94A3B8",
  primary: "#38BDF8",
  border: "#1E293B",
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
