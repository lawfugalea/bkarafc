import type {Config} from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bfc: {
          red: '#D0021B',
          'red-dark': '#b80018',
          gold: '#F5A623',
          green: '#2E7D32',
          base: '#080808',
          surface: '#111111',
          line: '#1a1a1a',
        },
      },
      fontFamily: {
        display: ['var(--font-barlow)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
