/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        retro: ['VT323', 'monospace'],
      },
      keyframes: {
        gameoverSpin: {
          '0%': { transform: 'rotate(0deg) scale(0.8)', opacity: '0' },
          '100%': {
            transform: 'rotate(720deg) scale(1)',
            textShadow: '0 0 15px #FF00FF',
          },
        },
      },
      animation: {
        'gameover-spin': 'gameoverSpin 1.9s cubic-bezier(.3,1.6,.6,1)forwards',
      },
    },
  },
  plugins: [],
}

