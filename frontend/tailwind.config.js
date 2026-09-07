/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // "ink" carries the crimson identity of the Nepal flag's red field.
        // Class names across the app (bg-ink-900, text-ink-700, etc.) are
        // unchanged — only the underlying hex values shift.
        ink: {
          50: '#FDF1F2',
          100: '#FBDFE2',
          200: '#F4B3BA',
          300: '#E9808C',
          400: '#DE4D5E',
          500: '#DC143C', // authentic Nepal flag crimson
          600: '#B10F30',
          700: '#870B24',
          800: '#5C0719',
          900: '#3A040F', // deep crimson-black — headers, nav, dark sections
          950: '#220209',
        },
        // "brass" now carries the Nepal flag's blue (from its border and the
        // moon/sun devices), in place of the earlier yellow accent. 300/400
        // are a brighter royal blue for use on dark (ink-900) backgrounds —
        // where the authentic flag blue (#003893) would be too close in
        // darkness to read clearly against dark crimson. 500 is the
        // authentic flag blue itself, used for text/icons/links on white
        // and for solid button fills (paired with white text).
        brass: {
          50: '#EEF3FB',
          100: '#D8E3F6',
          200: '#AFC7ED',
          300: '#7FA5E1',
          400: '#5B8DEF', // vivid — dark-bg accents (eyebrows, footer icons)
          500: '#003893', // authentic Nepal flag blue — text/icons on white, buttons
          600: '#002C73',
          700: '#001F52',
          800: '#001636',
          900: '#000F24',
        },
        canvas: '#FFFFFF',
        ash: '#6B7280',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};