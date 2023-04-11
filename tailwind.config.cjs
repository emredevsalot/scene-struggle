/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fbfde6",
          100: "#f4fac2",
          200: "#edf799",
          300: "#e5f46d",
          400: "#def048",
          DEFAULT: "#d8ed17",
          600: "#cbda0d",
          700: "#bac300",
          800: "#a9ac00",
          900: "#8f8500",
        },
        secondary: {
          50: "#f8f6fe",
          100: "#efedf4",
          200: "#e3e1e8",
          300: "#d1cfd6",
          400: "#acaab1",
          500: "#8b8990",
          600: "#646268",
          700: "#514f55",
          800: "#333137",
          DEFAULT: "#131117",
        },
      },
      fontFamily: {
        primary: ["Prompt", "sans-serif"],
        secondary: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
