/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        li: { blue: "#0a66c2", dark: "#004182", bg: "#f3f2ef", green: "#057642" },
      },
    },
  },
  plugins: [],
};
