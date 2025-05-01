// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			navy: '#0a192f',
  			'light-navy': '#112240',
  			'lightest-navy': '#233554',
  			slate: '#8892b0',
  			'light-slate': '#a8b2d1',
  			'lightest-slate': '#ccd6f6',
  			'neon-green': 'var(--accent-color)',
  			'dark-slate': '#495670',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'sans-serif'
  			],
  			mono: [
  				'Fira Code',
  				'monospace'
  			]
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-out forwards',
  			shake: 'shake 0.5s infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			shake: {
  				'0%': {
  					transform: 'translate(0, 0)'
  				},
  				'10%': {
  					transform: 'translate(-3px, -2px) rotate(-2deg)'
  				},
  				'20%': {
  					transform: 'translate(2px, -3px) rotate(3deg)'
  				},
  				'30%': {
  					transform: 'translate(-1px, 2px) rotate(-2deg)'
  				},
  				'40%': {
  					transform: 'translate(3px, -1px) rotate(1deg)'
  				},
  				'50%': {
  					transform: 'translate(-2px, 3px) rotate(-3deg)'
  				},
  				'60%': {
  					transform: 'translate(1px, -2px) rotate(2deg)'
  				},
  				'70%': {
  					transform: 'translate(-3px, 1px) rotate(-1deg)'
  				},
  				'80%': {
  					transform: 'translate(2px, 2px) rotate(3deg)'
  				},
  				'90%': {
  					transform: 'translate(-1px, -3px) rotate(-2deg)'
  				},
  				'100%': {
  					transform: 'translate(0, 0)'
  				}
  			}
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		backgroundImage: {
  			'hero-gradient': 'linear-gradient(to right, #0a192f, #112240)',
  			'new-gradient': 'linear-gradient(to right, #0a192f, #112240, #64ffda)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
  safelist: [
    'shake',
  ],
};
export default config;