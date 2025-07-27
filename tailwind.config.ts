import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      perspective: {
        "1000": "1000px",
      },
      borderImage: {
        "gradient-custom":
          "linear-gradient(to right, #ff4e50, #f9d423, #ff6e7f) 1",
      },
    },
  },
  plugins: [],
};

export default config;
