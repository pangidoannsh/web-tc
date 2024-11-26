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
        ternary: "#EEF2F6"
      },
      backgroundImage: {
        'background-gradient': 'linear-gradient(to right, #43AAF5 0%, #3A9EE7 5%, #3A9EE7 27%, #1B80C7 80%)',
      },
      fontSize: {
        "2xs": "10px"
      }
    },
  },
  plugins: [],
}