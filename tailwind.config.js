module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  purge: ["./src/**/*.js", "./src/**/*.jsx"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem"
      }
    }
  },
  variants: {
    extend: {
      scale: ["active", "group-hover"]
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"]
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=black]"]
        }
      }
    ]
  }
};
