module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#fefcbf", // For lighter primary color
          DEFAULT: "#3579F6", // Normal primary color
          dark: "#1549BB", // Used for hover, active, etc.
        },
      },
    },
  },
  plugins: [require('tailwindcss'),
  require('autoprefixer'),
  require("kutty"),
  require('flowbite/plugin')],
  
}