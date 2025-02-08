/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
  plugins: [],
}

