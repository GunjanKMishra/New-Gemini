/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        main: "#131314",
        sec: "#1E1E21",
        hov: "#333537"
      }
    },
  },
  plugins: [],
}

