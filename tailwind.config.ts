import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // Amazon-style colors
        primary: {
          50: '#fef3e2',
          100: '#fde4c4',
          200: '#fcd5a5',
          300: '#fbc687',
          400: '#fab768',
          500: '#FF9900', // Amazon Orange
          600: '#e68a00',
          700: '#cc7a00',
          800: '#b36b00',
          900: '#995c00',
          950: '#804d00',
        },
        secondary: {
          50: '#e8eaed',
          100: '#d1d5db',
          200: '#b9c0c9',
          300: '#a2abb7',
          400: '#8a96a5',
          500: '#37475A', // Amazon Secondary
          600: '#313f51',
          700: '#2b3748',
          800: '#252f3f',
          900: '#232F3E', // Amazon Dark Navy
          950: '#131A22', // Amazon Footer Dark
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#FEBD69', // Amazon Yellow Button
          500: '#F3A847', // Amazon Yellow Hover
          600: '#e09422',
          700: '#b97716',
          800: '#925a0f',
          900: '#6b4209',
          950: '#442a05',
        },
        amazon: {
          navy: '#232F3E',
          navyLight: '#37475A',
          orange: '#FF9900',
          orangeHover: '#e68a00',
          yellow: '#FEBD69',
          yellowHover: '#F3A847',
          footer: '#131A22',
          link: '#007185',
          linkHover: '#c7511f',
          star: '#FFA41C',
          deal: '#CC0C39',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
      },
      borderColor: {
        DEFAULT: 'hsl(var(--border))',
      },
      fontFamily: {
        sans: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-tajawal)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
