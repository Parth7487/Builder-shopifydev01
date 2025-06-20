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
        // Cinematic Color Palette
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
        charcoal: {
          DEFAULT: "#1B1B1F",
          50: "#2b2b2f",
          100: "#252529",
          500: "#1B1B1F",
          600: "#18181c",
          700: "#151519",
          800: "#121216",
          900: "#0f0f13",
        },
        graphite: {
          DEFAULT: "#2C2C2E",
          50: "#3c3c3e",
          100: "#363638",
          500: "#2C2C2E",
          600: "#292929",
          700: "#262626",
          800: "#232323",
          900: "#202020",
        },
        gold: {
          DEFAULT: "#FFD580",
          50: "#fff9e6",
          100: "#fff3cc",
          200: "#ffe799",
          300: "#ffdb66",
          400: "#ffcf33",
          500: "#FFD580",
          600: "#e6c073",
          700: "#ccab66",
          800: "#b39659",
          900: "#99814c",
        },
        accent: {
          DEFAULT: "#FF5E5B",
          50: "#ffe6e5",
          100: "#ffcccc",
          200: "#ff9999",
          300: "#ff6666",
          400: "#ff3333",
          500: "#FF5E5B",
          600: "#e65552",
          700: "#cc4b49",
          800: "#b34240",
          900: "#993937",
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
