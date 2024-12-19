/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#D2F7FE",
          200: "#A6EAFE",
          300: "#7AD8FC",
          400: "#59C3FA",
          500: "#23A3F8",
          600: "#197FD5",
          700: "#115FB2",
          800: "#0B438F",
          900: "#062F77",
          main: "#1065AA",
        },
        ternary: "#EEF2F6",
        warning: "#FFC802",
        success: "#1FBC2C"
      },
      backgroundImage: {
        'background-gradient': 'linear-gradient(to right, #46AAF2 0%, #44A8F0 5%, #3A9EE7 27%, #197FD5 80%)',
      },
      fontSize: {
        "2xs": "10px"
      },
      screens: {
        "3xl": "1900px"
      }
    },
  },
  plugins: [],
}