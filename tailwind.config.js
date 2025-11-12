// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'mobile': '620px', // Custom breakpoint for the header
      'md': '768px',
      'tablet': '850px', // Custom breakpoint for stacking
      'lg-plus': '867px', // Custom breakpoint for h1 font size
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'text-light': '#ECECEC', 'text-dark': '#262626', 'text-secondary': '#656565',
        'primary-button': '#FF5659', 'accent': '#FFC739', 'dark-background': '#262626',
        'light-background': '#FFFFFF', 'med-background': '#EEEEEE',
      },
      fontFamily: {
        'heading': ['Neutra', 'Montserrat', 'sans-serif'],
        'body': ['Montserrat', 'sans-serif'],
        'nav': ['Raleway', 'sans-serif'],
      },
      fontSize: {
        fontSize: {
        'h1-huge': '200px', 'h1': '64px', 'h2': '48px', 'h3': '36px', 'h4': '32px', 'h5': '28px', 'h6': '24px',
      },
        'h1': '64px',
        'h2': '48px',
        'h3': '36px',
        'h4': '32px',
        'h5': '28px', // <-- ADD THIS LINE
        'h6': '24px',
      },
      borderRadius: { 'card': '15px' },
      maxWidth: { 'container': '1440px' }
    },
  },
  plugins: [],
}