/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "#222831",
        // background2: "#2a3545",
        // shadow: "#31363F",
        // hover_accent: "#76ABAE",
        // accent: "#537e80",
        // primary_text: "#EEEEEE",
        // secondary_text: "#b3b3b3",

        background: "#101214",
        background2: "#161A1D",
        shadow: "#1D2125",
        hover_accent: "#454F59",
        accent: "#738496",
        primary_text: "#DEE4EA",
        secondary_text: "#B6C2CF",
      },
      fontFamily: {
        open_sans: ["Open Sans", "sans-serif"], // normal text
        roboto: ["Roboto", "sans-serif"],
        lato: ["Lato", "sans-serif"], // secondary heading
        montserrat: ["Montserrat", "sans-serif"], // primary heading
        ubuntu: ["Ubuntu", "sans-serif"], // buttons
        logo_text: ["Macondo", "cursive"],
      },
    },
  },
  plugins: [],
};
