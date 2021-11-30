const path = require("path");
const ZipPlugin = require("zip-webpack-plugin");
const baseConfig = require("./webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const { merge } = require("webpack-merge");

module.exports = merge(baseConfig, {
  mode: "production",

  plugins: [
    new MiniCssExtractPlugin({
      ignoreOrder: true,
      // publicPath: "/pages/",
      filename: `styles.[chunkhash].css`
    }),
    new ZipPlugin({
      filename: `blog.zip`
    })
  ],
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()]
  }
});
