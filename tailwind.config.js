/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        solar: {
          'bg': 'var(--solar-bg)',
          'bg-secondary': 'var(--solar-bg-secondary)',
          'bg-tertiary': 'var(--solar-bg-tertiary)',
          'card': 'var(--solar-card)',
          'card-solid': 'var(--solar-card-solid)',
          'border': 'var(--solar-border)',
          'text': 'var(--solar-text)',
          'text-muted': 'var(--solar-text-muted)',
          'text-dim': 'var(--solar-text-dim)',
          'gold': 'var(--solar-gold)',
          'gold-bright': 'var(--solar-gold-bright)',
          'gold-dark': 'var(--solar-gold-dark)',
          'orange': 'var(--solar-orange)',
          'cyan': 'var(--solar-cyan)',
          'cyan-bright': 'var(--solar-cyan-bright)',
          'emerald': 'var(--solar-emerald)',
          'purple': 'var(--solar-purple)',
          'indigo': 'var(--solar-indigo)',
        },
      },
      fontFamily: {
        'heading': ['"Syne"', 'sans-serif'],
        'body': ['"DM Sans"', 'sans-serif'],
        'telugu': ['"Noto Sans Telugu"', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer-sweep 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        'pulse-ring': 'pulse-ring 1.8s ease-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        'shimmer-sweep': {
          '0%': { left: '-100%' },
          '100%': { left: '150%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '30%': { transform: 'translate(3%, -15%)' },
          '50%': { transform: 'translate(12%, 9%)' },
          '70%': { transform: 'translate(9%, 4%)' },
          '90%': { transform: 'translate(-1%, 7%)' },
        },
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'card-lg': 'var(--shadow-card-lg)',
        'glow-gold': 'var(--shadow-glow-gold)',
        'glow-cyan': 'var(--shadow-glow-cyan)',
        'glow-purple': 'var(--shadow-glow-purple)',
      },
      backgroundImage: {
        'gradient-gold': 'var(--gradient-gold)',
        'gradient-cyan': 'var(--gradient-cyan)',
        'gradient-trifold': 'var(--gradient-cyan)',
        'gradient-hero': 'var(--gradient-hero)',
      },
    },
  },
  plugins: [],
}
