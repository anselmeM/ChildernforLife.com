/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cause: ['Cause', 'sans-serif'],
        lora: ['Lora', 'serif'],
      },
      colors: {
        brandBlue: {
          50: '#f0f7fa',
          100: '#e0eff5',
          200: '#b8d8e6',
          300: '#7ab8d4',
          400: '#3695c0',
          500: '#005c7a', // Deep corporate/friendly teal
          600: '#004a63',
          700: '#003a4c',
          800: '#002a37',
          900: '#001a24',
        },
        brandGreen: {
          50: '#f3faf0',
          100: '#e3f3db',
          200: '#cae7ba',
          300: '#a7d78e',
          400: '#81c360',
          500: '#5ca938', // Leaf green
          600: '#468628',
          700: '#36681d',
        },
        brandOrange: {
          50: '#fef7f2',
          100: '#fdeee5',
          200: '#fbdbcb',
          300: '#f8bfa2',
          400: '#f4996a',
          500: '#ed6c25', // Warm orange
          600: '#d15313',
          700: '#ad3f0c',
        },
        brandYellow: {
          50: '#fffdf2',
          100: '#fffbe6',
          200: '#fff5bd',
          300: '#ffeb8a',
          400: '#ffdf57',
          500: '#f5c225', // Golden yellow
          600: '#cfa014',
          700: '#a37c0b',
        }
      }
    },
  },
  plugins: [],
}
