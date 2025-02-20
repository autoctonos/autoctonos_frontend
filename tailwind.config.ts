import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    light: {
      colors: {
        primary: "#34D399", // Verde esmeralda para el modo claro
        background: "#FFFFFF",
        text: "#1F2937",
      },
    },
    dark: {
      colors: {
        primary: "#10B981", // Verde más oscuro para el modo oscuro
        background: "#111827",
        text: "#F9FAFB",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};