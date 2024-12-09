/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/app/components/**/*.{ts,tsx}", "src/app/widgets/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  darkMode: ["class"],
  plugins: [require("tailwindcss-animate")],
  theme: {
    colors: {
      accent: "rgb(255, 225, 156)",
      "bg-1": "#fff",
      "bg-2": "#f1f1f1",

      "bg-cover": "rgb(0,0,0,0.7)",
      black: "#000",
      error: "#D00000",

      "gray-1": "#DCE1E7",
      "gray-2": "#E9ECEF",
      "gray-3": "#F8F9FA",
      info: "#4361ee",

      onHover: "rgba(	251, 219, 101,0.8)",
      primary: "rgb(251, 219, 101)",
      success: "#208B3A",

      "text-1": "#21201f",
      "text-2": "#404040",

      "text-3": "#7D7C83",
      "text-4": "#888",
      warning: "#F8961E",
      white: "#fff",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            code: {
              "&::after": {
                content: "none !important",
              },
              "&::before": {
                content: "none !important",
              },
            },
          },
        },
      },
    },
    screens: {
      "2xl": { max: "1400px" },
      xl: { max: "1080px" },
      lg: { max: "820px" },
      md: { max: "720px" },
      sm: { max: "500px" },
    },
  },
};
