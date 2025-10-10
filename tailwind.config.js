/** @type {import('tailwindcss').Config} */
import tailwindAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", 
        input: "var(--color-input)", 
        ring: "var(--color-ring)", 
        background: "var(--color-background)", 
        foreground: "var(--color-foreground)", 
        primary: {
          DEFAULT: "var(--color-primary)", 
          foreground: "var(--color-primary-foreground)", 
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", 
          foreground: "var(--color-secondary-foreground)", 
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", 
          foreground: "var(--color-destructive-foreground)", 
        },
        muted: {
          DEFAULT: "var(--color-muted)", 
          foreground: "var(--color-muted-foreground)", 
        },
        accent: {
          DEFAULT: "var(--color-accent)", 
          foreground: "var(--color-accent-foreground)", 
        },
        popover: {
          DEFAULT: "var(--color-popover)", 
          foreground: "var(--color-popover-foreground)", 
        },
        card: {
          DEFAULT: "var(--color-card)", 
          foreground: "var(--color-card-foreground)", 
        },
        success: {
          DEFAULT: "var(--color-success)", 
          foreground: "var(--color-success-foreground)", 
        },
        warning: {
          DEFAULT: "var(--color-warning)", 
          foreground: "var(--color-warning-foreground)", 
        },
        error: {
          DEFAULT: "var(--color-error)", 
          foreground: "var(--color-error-foreground)", 
        },
        brand: {
          primary: "var(--color-brand-primary)", 
          secondary: "var(--color-brand-secondary)", 
        },
        conversion: {
          accent: "var(--color-conversion-accent)", 
        },
        trust: {
          builder: "var(--color-trust-builder)", 
        },
        text: {
          primary: "var(--color-text-primary)", 
          secondary: "var(--color-text-secondary)", 
        },
        surface: "var(--color-surface)", 
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "heartbeat": "heartbeat 1.5s ease-in-out infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "heartbeat": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      boxShadow: {
        'healthcare': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'healthcare-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      transitionTimingFunction: {
        'healthcare': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [tailwindAnimate],
};
