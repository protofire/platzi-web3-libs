/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#131F3E",
        primaryDark: "#0C152C",
        secondary: "#f54703",
        secondaryLight: "#f89202",
      },
      fontFamily: {
        SpartanLeague: ["League Spartan", "sans-serif"],
      },
    },
  },
  plugins: [],
};
