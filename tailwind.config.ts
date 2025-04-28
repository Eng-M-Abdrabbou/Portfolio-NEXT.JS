// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0a192f', // Dark blue background
        'light-navy': '#112240', // Lighter blue for cards/accents
        'lightest-navy': '#233554',
        slate: '#8892b0', // Normal text
        'light-slate': '#a8b2d1', // Lighter text
        'lightest-slate': '#ccd6f6', // Headings/Titles
        'neon-green': '#64ffda', // Accent color
        'dark-slate': '#495670',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Clean sans-serif font
        mono: ['Fira Code', 'monospace'], // For code-like elements if needed
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'shake': 'shake 0.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shake: {
          '0%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-3px, -2px) rotate(-2deg)' },
          '20%': { transform: 'translate(2px, -3px) rotate(3deg)' },
          '30%': { transform: 'translate(-1px, 2px) rotate(-2deg)' },
          '40%': { transform: 'translate(3px, -1px) rotate(1deg)' },
          '50%': { transform: 'translate(-2px, 3px) rotate(-3deg)' },
          '60%': { transform: 'translate(1px, -2px) rotate(2deg)' },
          '70%': { transform: 'translate(-3px, 1px) rotate(-1deg)' },
          '80%': { transform: 'translate(2px, 2px) rotate(3deg)' },
          '90%': { transform: 'translate(-1px, -3px) rotate(-2deg)' },
          '100%': { transform: 'translate(0, 0)' },
        },
      },
      backdropBlur: {
          xs: '2px',
      },
      backgroundImage: {
          'hero-gradient': 'linear-gradient(to right, #0a192f, #112240)',
          'new-gradient': 'linear-gradient(to right, #0a192f, #112240, #64ffda)',
      }
    },
  },
  plugins: [],
  safelist: [
    'shake',
  ],
};
export default config;