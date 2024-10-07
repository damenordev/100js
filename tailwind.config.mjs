/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors({ colors }) {
        return {
          'pinia-300': 'rgb(253 224 71)',
          'pinia-400': 'rgb(250 204 21)',
        }
      },
      animation: {
        'fade-in': 'fade-in 1s forwards',
        'fade-in-up': 'fade-in-up 1s forwards',
        'move-left': 'move-left 30s linear infinite',
        'move-right': 'move-right 30s linear infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'move-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'move-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(50%)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
