import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-background":
          "radial-gradient(circle, rgba(21, 21, 22, 0.9%) 0, hsl(0, 0%, 8.5%) 100%)",
      },
      colors: {
        primary: "hsl(var(--primary))",
        background: "hsl(var(--background))",
      },
    },
  },
  plugins: [],
};
export default config;
