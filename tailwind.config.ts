import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      theme: {
        colors: {
          transparent: "transparent",
          current: "currentColor",
          grey: "#64748b",
          lighgrey: "#94a3b8",
          bluebg: "#22d3ee",
        },
      },
    },
  },
  plugins: [],
};

module.exports = {
  //...
  plugins: [require("daisyui")],
};
export default config;
