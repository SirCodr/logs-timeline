/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': {
          'primary': '#4285F4'
        },
        'red': {
          'primary': '#E70D0D'
        }
      }
    },
  },
  plugins: [],
}