/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Define columns layout, adjusting fractions as needed
        layout: "1fr 3fr 1fr",
      },
      gridTemplateRows: {
        // Define rows layout, adjusting height as needed
        layout: "[header] auto [content] 1fr",
      },
      fontFamily: {
        playwrite: ["Playfair Display", "serif"],
      },
    },
  },
  darkMode: "class", // Change this to "class"
  plugins: [],
};
