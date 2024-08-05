import defaultTheme from "tailwindcss/defaultTheme";

const SlideDuration = "500ms";
const EaseOutCubic = "cubic-bezier(0.33, 1, 0.68, 1)";

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
        slideInRight: {
          "0%": { opacity: 0, transform: "translateX(-100%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideOutRight: {
          "0%": { opacity: 1, transform: "translateX(0)" },
          "100%": { opacity: 0, transform: "translateX(100%)" },
        },
      },
      animation: {
        slideInLeft: `slideInLeft ${SlideDuration} ${EaseOutCubic}`,
        slideOutLeft: `slideOutLeft ${SlideDuration} ${EaseOutCubic} forwards`,
        slideInRight: `slideInRight ${SlideDuration} ${EaseOutCubic}`,
        slideOutRight: `slideOutRight ${SlideDuration} ${EaseOutCubic} forwards`,
      },
    },
  },
  plugins: [],
};
