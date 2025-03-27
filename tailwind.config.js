import { hairlineWidth } from 'nativewind/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'notoKufiArabic-light': ['NotoKufiArabic-Light', 'sans-serif'],
        notoKufiArabic: ['NotoKufiArabic-Regular', 'sans-serif'],
        'notoKufiArabic-semiBold': ['NotoKufiArabic-SemiBold', 'sans-serif'],
        'notoKufiArabic-bold': ['NotoKufiArabic-Bold', 'sans-serif'],
        'notoKufiArabic-extraBold': ['NotoKufiArabic-ExtraBold', 'sans-serif'],
      },
      colors: {
        border: 'oklch(var(--border))',
        input: 'oklch(var(--input))',
        ring: 'oklch(var(--ring))',
        background: 'oklch(var(--background))',
        foreground: 'oklch(var(--foreground))',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive))',
          foreground: 'oklch(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'oklch(var(--muted))',
          foreground: 'oklch(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent))',
          foreground: 'oklch(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'oklch(var(--card))',
          foreground: 'oklch(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'oklch(var(--sidebar))',
          foreground: 'oklch(var(--sidebar-foreground))',
        },
        'sidebar-primary': {
          DEFAULT: 'oklch(var(--sidebar-primary))',
          foreground: 'oklch(var(--sidebar-primary-foreground))',
        },
        'sidebar-accent': {
          DEFAULT: 'oklch(var(--sidebar-accent))',
          foreground: 'oklch(var(--sidebar-accent-foreground))',
        },
        'sidebar-border': 'oklch(var(--sidebar-border))',
        'sidebar-ring': 'oklch(var(--sidebar-ring))',
        'chart-1': 'oklch(var(--chart-1))',
        'chart-2': 'oklch(var(--chart-2))',
        'chart-3': 'oklch(var(--chart-3))',
        'chart-4': 'oklch(var(--chart-4))',
        'chart-5': 'oklch(var(--chart-5))',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
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
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backdropBlur: {
        md: '12px',
      },
    },
  },
  plugins: [],
}
