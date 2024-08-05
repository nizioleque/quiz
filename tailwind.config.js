import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        stone: {
          150: "#f2f1f0",
        },
      },
      keyframes: {
        slideInLeft: {
          "0%": { opacity: 0, transform: "translateX(100%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideOutLeft: {
          "0%": { opacity: 1, transform: "translateX(0)" },
          "100%": { opacity: 0, transform: "translateX(-100%)" },
        },
      },
      animation: {
        slideInLeft: "slideInLeft 500ms ease-out",
        slideOutLeft: "slideOutLeft 500ms ease-out forwards",
      },
    },
  },
  plugins: [],
};
