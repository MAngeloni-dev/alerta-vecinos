/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        safety: {
          blue: {
            DEFAULT: '#2563EB',
            hover: '#1D4ED8',
            subtle: 'rgb(var(--blue-subtle) / <alpha-value>)',
            dark: 'rgb(var(--blue-dark) / <alpha-value>)',
          },
          green: {
            DEFAULT: '#10B981',
            hover: '#059669',
            subtle: 'rgb(var(--green-subtle) / <alpha-value>)',
            dark: 'rgb(var(--green-dark) / <alpha-value>)',
          },
          amber: {
            DEFAULT: '#F59E0B',
            hover: '#D97706',
            subtle: 'rgb(var(--amber-subtle) / <alpha-value>)',
            dark: 'rgb(var(--amber-dark) / <alpha-value>)',
          },
          red: {
            DEFAULT: '#EF4444',
            hover: '#DC2626',
            subtle: 'rgb(var(--red-subtle) / <alpha-value>)',
            dark: 'rgb(var(--red-dark) / <alpha-value>)',
          },
        },
        surface: {
          canvas: 'rgb(var(--surface-canvas) / <alpha-value>)',
          card: 'rgb(var(--surface-card) / <alpha-value>)',
          border: 'rgb(var(--surface-border) / <alpha-value>)',
          'border-focus': 'rgb(var(--surface-border-focus) / <alpha-value>)',
        },
        content: {
          title: 'rgb(var(--content-title) / <alpha-value>)',
          body: 'rgb(var(--content-body) / <alpha-value>)',
          muted: 'rgb(var(--content-muted) / <alpha-value>)',
          placeholder: 'rgb(var(--content-placeholder) / <alpha-value>)',
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'level-1': '0px 2px 6px -1px rgba(15, 23, 42, 0.05), 0px 1px 3px -1px rgba(15, 23, 42, 0.03)',
        'level-2': '0px 8px 16px -2px rgba(15, 23, 42, 0.08)',
        'level-3': '0px 12px 24px -4px rgba(239, 68, 68, 0.25)',
        'focus-ring': '0 0 0 3px rgba(37, 99, 235, 0.25)',
      },
      maxWidth: {
        'mobile': '430px',
      }
    },
  },
  plugins: [],
}
