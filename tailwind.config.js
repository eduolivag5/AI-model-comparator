/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#010100",
        foreground: "#0a0a0a",
        primary: "#4c24cd",
        secondary: "#1a1a1a",
      }
    },
  },
  darkMode: "class",
  plugins: [heroui({
    defaultTheme: "dark",
  })]
}

