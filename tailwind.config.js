/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        matrix: {
          50: '#e6fff0',
          100: '#b3ffcc',
          200: '#80ffb3',
          300: '#4dff99',
          400: '#1aff80',
          500: '#00ff66',
          600: '#00cc52',
          700: '#00993d',
          800: '#006629',
          900: '#003314',
          950: '#001a0a',
        },
        cyber: {
          black: '#000000',
          ink: '#020806',
          panel: '#06140d',
          border: '#0a3b22',
        },
      },
      fontFamily: {
        mono: ['"Chakra Petch"', '"JetBrains Mono"', 'monospace'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glitch-skew': 'glitch-skew 2s infinite linear alternate-reverse',
        'glitch-1': 'glitch-1 2s infinite linear alternate-reverse',
        'glitch-2': 'glitch-2 3s infinite linear alternate-reverse',
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 4s infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        'glitch-skew': {
          '0%': { transform: 'skewX(0deg)' },
          '10%': { transform: 'skewX(-1deg)' },
          '20%': { transform: 'skewX(0deg)' },
          '30%': { transform: 'skewX(2deg)' },
          '40%': { transform: 'skewX(0deg)' },
          '50%': { transform: 'skewX(-3deg)' },
          '60%': { transform: 'skewX(0deg)' },
          '70%': { transform: 'skewX(1deg)' },
          '80%': { transform: 'skewX(0deg)' },
          '90%': { transform: 'skewX(-2deg)' },
          '100%': { transform: 'skewX(0deg)' },
        },
        'glitch-1': {
          '0%, 100%': { clipPath: 'inset(20% 0 60% 0)', transform: 'translate(-2px, 0)' },
          '20%': { clipPath: 'inset(80% 0 5% 0)', transform: 'translate(2px, 0)' },
          '40%': { clipPath: 'inset(40% 0 40% 0)', transform: 'translate(-1px, 0)' },
          '60%': { clipPath: 'inset(10% 0 75% 0)', transform: 'translate(1px, 0)' },
          '80%': { clipPath: 'inset(60% 0 20% 0)', transform: 'translate(-2px, 0)' },
        },
        'glitch-2': {
          '0%, 100%': { clipPath: 'inset(70% 0 10% 0)', transform: 'translate(2px, 0)' },
          '20%': { clipPath: 'inset(15% 0 70% 0)', transform: 'translate(-2px, 0)' },
          '40%': { clipPath: 'inset(55% 0 30% 0)', transform: 'translate(1px, 0)' },
          '60%': { clipPath: 'inset(85% 0 5% 0)', transform: 'translate(-1px, 0)' },
          '80%': { clipPath: 'inset(30% 0 55% 0)', transform: 'translate(2px, 0)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '41.99%': { opacity: '1' },
          '42%': { opacity: '0.4' },
          '43%': { opacity: '1' },
          '45%': { opacity: '0.3' },
          '45.99%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotateX(0) rotateY(0)' },
          '50%': { transform: 'translateY(-20px) rotateX(15deg) rotateY(15deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,255,102,0.3), inset 0 0 20px rgba(0,255,102,0.05)' },
          '50%': { boxShadow: '0 0 40px rgba(0,255,102,0.5), inset 0 0 30px rgba(0,255,102,0.1)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'grid-faint': "linear-gradient(rgba(0,255,102,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,102,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
