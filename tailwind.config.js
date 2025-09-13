/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#CBA135",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
module.exports = { content: ['./pages/**/*.{js,jsx,ts,tsx}','./components/**/*.{js,jsx,ts,tsx}'], theme: { extend: { colors: { gold: '#CBA135' } } }, plugins: [] };
