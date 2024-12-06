import tailwindcssAnimate from "tailwindcss-animate";
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        montSerrat: ["Montserrat", "sans-serif"],
      },
      animation: {},
      keyframes: {},
    },
  },
  plugins: [tailwindcssAnimate, daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#060c2d",

          secondary: "#060c2d",

          accent: "#060c2d",

          neutral: "#6b7280",

          "base-100": "white",
          "base-200": "#f5f5f5",
          "base-300": "#ebebeb",

          info: "#2563eb",

          success: "#22c55e",

          warning: "#eaa400",

          error: "#dc2626",
        },
      },
    ],
  },
};
