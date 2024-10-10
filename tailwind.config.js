/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mist': 'var(--mist)',
        'charcoal': 'var(--charcoal)',
        'crimson': 'var(--crimson)',
        'tomato': 'var(--tomato)',
        'eggshell': 'var(--eggshell)',
        'onyx': 'var(--onyx)',
        'rose-pink': 'var(--rose-pink)',
        'white-wash': 'var(--white-wash)',
        'blood-red': 'var(--blood-red)',
        "blue-ribbon": 'var(--blue-ribbon)',
        "light-red": 'var(--light-red)',
      },
      screens: {
        'xs': '320px',
        'sm': '480px',
        'md': '640px',
        'lg': '768px',
        'xl': '1025px',
        'xl-1': '1280px',
      }
    },
  },
  plugins: [],
}

