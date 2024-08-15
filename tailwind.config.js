/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: "#1D91CC",
        white: "#FFFFFF",
        tint: {
          1: "#E8F4FA",
          2: "#D2E9F5",
          3: "#BBDEF0",
          4: "#A5D3EB",
          5: "#77BDE0",
        },
        shade: {
          1: "#1774A3",
          2: "#11577A",
          3: "#0C3A52",
          4: "#092B3D",
          5: "#061D29",
        },
        gray: {
          1: "#F9F9F9",
          2: "#EDEDED",
          3: "#DFDFDF",
          4: "#CBCBCB",
          5: "#ADADAD",
          6: "#868686",
          7: "#606060",
          8: "#404040",
          9: "#202020",
        },
        error: "#C30000",
        E: {
          light1: "#ED2E2E",
          light2: "#FFF2F2",
        },
        success: "#00966D",
        S: {
          light1: "#00BA88",
          light2: "#F3FDFA",
        },
        warning: "#A9791C",
        W: {
          light1: "#F4B740",
          light2: "#FFF8E1",
        },
        link: "#0077DB",
      },
    },
  },

  plugins: [],
};
