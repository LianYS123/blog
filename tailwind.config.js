module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
        padding: ".5rem"
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
