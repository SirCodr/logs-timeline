/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#f6f3ff',
          '100': '#efe8ff',
          '200': '#dbcdff',
          '300': '#cbb3ff',
          '400': '#b288fd',
          '500': '#9b58fa',
          '600': '#8f36f1',
          '700': '#7f24dd',
          '800': '#6a1dba',
          '900': '#581a98',
          '950': '#360e67'
        },
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