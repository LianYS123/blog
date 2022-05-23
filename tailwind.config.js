module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
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
}
