/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        eco: {
          primary: 'hsl(var(--eco-primary))',
          secondary: 'hsl(var(--eco-secondary))',
          dark: 'hsl(var(--eco-dark))',
          light: 'hsl(var(--eco-light))',
          accent: 'hsl(var(--eco-accent))',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        merriweather: ['Sora', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        green: '0 4px 20px rgba(120, 230, 60, 0.25)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(120, 230, 60, 0.15)',
        glow: '0 0 20px rgba(120, 230, 60, 0.4), 0 0 60px rgba(120, 230, 60, 0.15)',
        'glow-sm': '0 0 12px rgba(120, 230, 60, 0.3)',
        'glow-lg': '0 0 40px rgba(120, 230, 60, 0.5), 0 0 80px rgba(120, 230, 60, 0.2)',
        '3d': '0 20px 60px rgba(0,0,0,0.6), 0 0 25px rgba(120, 230, 60, 0.2)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn: {
          from: { opacity: '0', transform: 'scale(0.88)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(120, 230, 60, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(120, 230, 60, 0.6)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.7s ease-out both',
        slideUp: 'slideUp 0.7s ease-out both',
        zoomIn: 'zoomIn 0.6s ease-out both',
        slideInLeft: 'slideInLeft 0.7s ease-out both',
        slideInRight: 'slideInRight 0.7s ease-out both',
        floatY: 'floatY 3s ease-in-out infinite',
        glowPulse: 'glowPulse 2.5s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
};
