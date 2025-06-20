import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    './modules/***/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        'custom-red': '#BC4749',
        'custom-light-green': '#A7C957',
        'custom-medium-green': '#6A994E',
        'custom-dark-green': '#386641',
        'custom-cream': '#F2E8CF',
        'custom-black': '#111111',
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}