/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        "1/6": "16.666667%",
        "5/6": "83.333333%",
      },
      animation: {
        "slide-down": "slide-down 0.5s forwards",
        "slide-up": "slide-up 0.5s forwards",
        "fade-in": "fade-in 0.5s forwards",
        "slide-in-right": "slide-in-right 0.5s ease-in-out",
        "slide-out-right": "slide-out-right 0.5s ease-in-out",
        "slide-soft-in-right": "slide-soft-in-right 0.5s ease-in-out",
        "slide-soft-in-left": "slide-soft-in-left 0.5s ease-in-out",
        "fade-soft-in": "fade-soft-in 0.5s forwards",
        "slide-in-left": "slide-in-left 0.5s forwards",
        "slow-slide-fade-in-right": "slow-slide-fade-in-right 1.5s ease-in-out",
        "slow-slide-fade-in-left": "slow-slide-fade-in-left 1.5s ease-in-out",
      },
      keyframes: {
        "slide-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "slide-soft-in-right": {
          "0%": { transform: "translateX(20%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-soft-in-left": {
          "0%": { transform: "translateX(-20%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-soft-in": {
          "0%": { opacity: "0.6" },
          "100%": { opacity: "1" },
        },
        "slow-slide-fade-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slow-slide-fade-in-left": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}
