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
        // Define your custom font here
        // 'sans' will override the default sans-serif font
        // Replace 'YourCustomFontName' with the actual font name from Google Fonts or your @font-face rule
        sans: ["Ancizar sans", "sans-serif"],
      },
      colors: {
        primary: '#A4243B',          // Amaranth purple
        secondary: '#D8C99B',        // Ecru
        accent: '#D8973C',           // Butterscotch (using 'accent' as a common third color name)
        tertiary: '#BD632F',         // Alloy orange (using 'tertiary' as another common color name)
        neutral: '#273E47',          // Charcoal (using 'neutral' for a darker, often text-related color)
      }
    },
  },
  plugins: [],
};
