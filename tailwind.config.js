/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'arcade-black': '#000000',
        'arcade-pink': '#FF2D9B',
        'arcade-cyan': '#00E5FF',
        'arcade-yellow': '#FFE600',
        'arcade-green': '#39FF14',
        'arcade-red': '#FF3A20',
        'arcade-orange': '#FF8C00',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [],
}
