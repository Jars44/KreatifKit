/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // No custom color tokens — we use builtin Tailwind palette names (e.g., sky-400, blue-700)
    },
  },
  plugins: [],
};
