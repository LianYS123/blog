module.exports = {
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
  plugins: []
};
