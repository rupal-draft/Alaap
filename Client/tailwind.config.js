module.exports = {
  mode: "jit",

  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#222831",
        shadow: "#31363F",
        highlight: "#76ABAE",
        primary_text: "#EEEEEE",
        gray: {
          100: "#f7f7f7",
          500: "#8f92a1",
          800: "#4b4c4d",
          900: "#1e1f20",
          "500_33": "#8f92a133",
          "500_66": "#8f92a166",
          "900_66": "#1e1f2066",
          "900_33": "#1e1f2033",
        },
        white: { A700: "#ffffff", A700_33: "#ffffff33", A700_99: "#ffffff99" },
        indigo: { 600: "#39579b", A200: "#666aec", A200_33: "#666aec33" },
        light_blue: { 200: "#79d0f1" },
        green: { 400: "#53d769" },
      },
      boxShadow: {},
      fontFamily: { inter: "Inter", sfprodisplay: "SF Pro Display" },
      backgroundImage: {
        gradient: "linear-gradient(180deg, #1e1f2000,#1e1f20cc)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
