import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-coffee-bg', 'bg-coffee-accent',
    'bg-forest-bg', 'bg-forest-accent',
    'bg-ocean-bg', 'bg-ocean-accent',
    'bg-desert-bg', 'bg-desert-accent',
    'bg-urban-bg', 'bg-urban-accent',
    'bg-sakura-bg', 'bg-sakura-accent',
    'bg-polar-bg', 'bg-polar-accent',
    'bg-vintage-bg', 'bg-vintage-accent',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        // Coffee Barista
        "coffee-bg": "#3D2C29",
        "coffee-accent": "#FFD6A5",

        // Forest Woods
        "forest-bg": "#1F2D24",
        "forest-accent": "#D97706",

        // Deep Ocean
        "ocean-bg": "#1E293B",
        "ocean-accent": "#3DB2FF",

        // Sunset Desert
        "desert-bg": "#9C4221",
        "desert-accent": "#EF4444",

        // Urban Nightlife
        "urban-bg": "#111827",
        "urban-accent": "#8B5CF6",

        // Sakura Spring
        "sakura-bg": "#FED7D7",
        "sakura-accent": "#F87171",

        // Polar Ice
        "polar-bg": "#DBEAFE",
        "polar-accent": "#3B82F6",

        // Vintage Paper
        "vintage-bg": "#FEF3C7",
        "vintage-accent": "#FBBF24",
      },
      colors: {
        dark_bg: "#131415",
        light_bg: "#F7F8F3",
        primary: "#7EAA92",
      },
      fontFamily: {
        lyon: "Lyon Regular",
        "roboto-bold": "Roboto Bold",
        "roboto-black": "Roboto Black",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
