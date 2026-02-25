import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f5f5f5",
        secondary: "#e8e5e0",
        accent: {
          DEFAULT: "#b8963a",
          light: "#e8d5a8",
        },
        background: "#f8f6f3",
        "text-primary": "#2d2a26",
        "text-secondary": "#6b6560",
        "card-bg": "#ffffff",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-montserrat)", "sans-serif"],
        script: ["var(--font-great-vibes)", "cursive"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease forwards",
        "fade-in": "fadeIn 1s ease forwards",
        "scroll-bounce": "scrollBounce 1.5s ease infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scrollBounce: {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(8px)", opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
