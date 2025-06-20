import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Premium Brand Colors (Atoll + Tessarakt)
        black: {
          DEFAULT: "#0A0A0A",
          50: "#1a1a1a",
          100: "#141414",
          500: "#0A0A0A",
          600: "#080808",
          700: "#060606",
          800: "#040404",
          900: "#020202",
        },
        navy: {
          DEFAULT: "#0D1117",
          50: "#1d2127",
          100: "#171b21",
          500: "#0D1117",
          600: "#0b0f15",
          700: "#090d13",
          800: "#070b11",
          900: "#05090f",
        },
        mint: {
          DEFAULT: "#38F9D7",
          50: "#e6fefb",
          100: "#ccfdf7",
          200: "#99fbef",
          300: "#66f9e7",
          400: "#33f9df",
          500: "#38F9D7",
          600: "#32e0c2",
          700: "#2cc7ad",
          800: "#26ae98",
          900: "#209583",
        },
        violet: {
          DEFAULT: "#6B7EFF",
          50: "#f0f1ff",
          100: "#e1e4ff",
          200: "#c3c9ff",
          300: "#a5aeff",
          400: "#8693ff",
          500: "#6B7EFF",
          600: "#5f72e6",
          700: "#5365cc",
          800: "#4758b3",
          900: "#3b4b99",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 5px #00FFB2, 0 0 10px #00FFB2, 0 0 15px #00FFB2",
          },
          "50%": {
            boxShadow: "0 0 10px #00FFB2, 0 0 20px #00FFB2, 0 0 30px #00FFB2",
          },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mint-glow": "linear-gradient(135deg, #00FFB2, #00e6a0)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
