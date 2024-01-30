/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "book-blue": {
          50: "#f8fafc",
          100: "#edf2f8",
          200: "#d0dfeb",
          300: "#a5c2d9",
          400: "#73a0c4",
          500: "#4c80ae",
          600: "#3a6592",
          700: "#305178",
          800: "#2b4564",
          900: "#293b57",
          950: "#172030",//theme color
        },
        "book-paper": {
          50: "#f7f6f3",//theme color
          100: "#efede6",
          200: "#ddd8cb",
          300: "#c7bda8",
          400: "#b19e86",
          500: "#a0886e",
          600: "#937762",
          700: "#796153",
          800: "#655148",
          900: "#54433b",
          950: "#2e231f",
        },
        "clay-ash": {
          50: "#f6f8f5",
          100: "#eaefe9",
          200: "#d5dfd3",
          300: "#c0cebd",//Theme color
          400: "#8ba286",
          500: "#6a8364",
          600: "#546a4f",
          700: "#435540",
          800: "#384536",
          900: "#2f3a2d",
          950: "#171d16",
        },
        "primary-blue": {
          500: "#172030",//theme color
        },
        "book-paper-white": {
          500: "#f7f6f3", //theme color
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
