export const colors = {
  black: "#111111",
  dark: "#1f1f1f",
  charcoal: "#2c2e35",
  orange: "#ff5405",
  orangeDark: "#cc4000",
  orangeLight: "#fff7ed",
  muted: "#666666",
  subtle: "#8a8a8a",
  border: "#e5e7eb",
  borderDark: "#d4d4d4",
  borderInput: "#c9c9c9",
  surface: "#eeeeee",
  white: "#ffffff",
} as const;

export type ColorToken = keyof typeof colors;

