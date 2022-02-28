module.exports = {
  parserOptions: {
    ecmaVersion: 10,
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    "import/resolver": "webpack"
  },
  parser: "@babel/eslint-parser",
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {
    "react/jsx-uses-react": 2,
    "react/react-in-jsx-scope": 0,
    "react/jsx-uses-vars": 2,
    "react/jsx-no-undef": 2,
    "react-hooks/rules-of-hooks": 0, // Checks rules of Hooks
    "react-hooks/exhaustive-deps": 0, // Checks effect dependencies
    "linebreak-style": "off",
    "no-console": "warn",
    "no-unused-vars": "off"
  },
  plugins: ["react", "react-hooks", "formatjs"]
};
