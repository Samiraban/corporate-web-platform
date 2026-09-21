/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',

  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },

        brass: {
          300: '#facc4b',
          400: '#f6b81f',
          500: '#d89b16',
          600: '#b57f12',
          700: '#8d6210',
          800: '#744f13',
          900: '#634315',
        },

        canvas: '#ffffff',

        cream: '#fffaf2',

        'cream-50': '#fffdf8',

        ash: {
          100: '#f8fafc',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
        },

        'os-soft': '#f8fafc',

        'os-cyan': {
          300: '#67e8f9',
          500: '#06b6d4',
        },

        'os-card': '#ffffff',
      },
    },
  },

  plugins: [],
};