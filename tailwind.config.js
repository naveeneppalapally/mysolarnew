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
          // All mapped to CSS variables — auto-swap on theme
          'bg':           'var(--solar-bg)',
          'bg-light':     'var(--solar-bg-light)',
          'card':         'var(--solar-card)',
          'border':       'var(--solar-border)',
          'text':         'var(--solar-text)',
          'text-muted':   'var(--solar-text-muted)',
          'text-dim':     'var(--solar-text-dim)',
          'gold':         'var(--solar-gold)',
          'gold-bright':  'var(--solar-gold-bright)',
          'gold-dark':    'var(--solar-gold)',
          'emerald':      'var(--solar-emerald)',
        },
      },
      fontFamily: {
        'heading': ['"Syne"', 'sans-serif'],
        'body':    ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'shimmer':        'shimmer 2.5s ease-in-out infinite',
        'float':          'float 6s ease-in-out infinite',
        'marquee':        'marquee 35s linear infinite',
        'marquee-reverse':'marquee-reverse 35s linear infinite',
        'pulse-ring':     'pulse-ring 1.5s ease-out infinite',
        'fade-in-up':     'fadeInUp 0.6s ease-out forwards',
        'spin-slow':      'spin 8s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { left: '-100%' },
          '100%': { left: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-16px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'card':     'var(--shadow-card)',
        'card-lg':  'var(--shadow-card-lg)',
        'gold':     '0 0 30px rgba(245,166,35,0.25)',
      },
    },
  },
  plugins: [],
}
