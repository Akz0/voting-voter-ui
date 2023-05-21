/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#6c5ce7",
        "light-purple": "#a59afc",
        grey: "#f2f4ff",
        blue: "#2f1ac4",
        pink: "#fb2e86",
        error: "#ff1515",
        success: "#6efd74",
        black: "#000000",
        white: "#ffffff",
        yellow: "",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        josan: ["Josefin Sans", "sans-serif"],
        rye: ["Rye", "cursive"],
      },
      screens: {
        md: "778px",
        xs: "450px",
      },
      gridTemplateRows: {
        12: "repeat(12, minmax(0, 1fr))",
        6: "repeat(6,minxmax(0,10rem))",
      },
      gridRowEnd: {
        12: "12",
      },
    },
  },
  plugins: [],
};
