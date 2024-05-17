/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens:{
        's' : '480px',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        // Colores personalizados para el modo claro
        'L-B-P': {
          light: 'fdfff6',
          DEFAULT: '#e9eae2',
          dark: '#b6b6b0',
        },
        'L-B-S': {
          light: '#505f77',
          DEFAULT: '#374151',
          dark: '#14181d',
        },
        'L-D-P': {
          light: '#17f99e',
          DEFAULT: '#14d386',
          dark: '#0fa065',
          hover: '#14d38722',
        },
        'L-T-P': {
          light: '#1c1e26',
          DEFAULT: '#030304',
          dark: '000000',
        },
        'L-T-S': {
          light: '#ffffff',
          DEFAULT: '#e4e4e4',
          dark: '#b1b1b1',
        },

        // Colores personalizados para el modo oscuro
        'D-B-P': {
          light: '#003345',
          DEFAULT: '#00171f',
          dark: '#000000',
        },
        'D-B-S': {
          light: '#00654b',
          DEFAULT: '#003f2f',
          dark: '#000c08',
        },
        'D-D-P': {
          light: '#17f99e',
          DEFAULT: '#14d386',
          dark: '#0fa065',
        },
        'D-T-P': {
          light: '#fffbfe',
          DEFAULT: '#f9f6f9',
          dark: '#c5c3c5',
        },
        'D-T-S': {
          light: '#85ffb2',
          DEFAULT: '#84fca8',
          dark: '#69c986',
        },
      },
    },
  },
  plugins: [],
}
