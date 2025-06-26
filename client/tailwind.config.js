/** @type {import('tailwindcss').Config} */
export default {
  // Use 'export default' for ES module syntax often used in Vite/modern setups
  content: [
    // These paths tell Tailwind where to look for your utility classes
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lobster: ["Lobster", "cursive"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
