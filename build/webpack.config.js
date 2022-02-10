const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isEnvDevelopment = process.env.NODE_ENV === "development";
const isEnvProduction = process.env.NODE_ENV === "production";

const src = path.join(__dirname, "../src");

// webpack别名配置，src下面的的一级目录全部起了别名，可以直接用improt xxx from "目录名" 访问
const getAligns = () => {
  return fs
    .readdirSync(src)
    .filter(filename => fs.statSync(path.join(src, filename)).isDirectory())
    .map(filename => {
      const filepath = path.join(src, filename);
      return { filepath, filename };
    })
    .reduce((res, cur) => ({ ...res, [cur.filename]: cur.filepath }), {});
};

// 所有css/less公用loader
const getExtraLoaders = ({ modules = false } = {}) => {
  return [
    isEnvDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        modules
      }
    },
    "postcss-loader"
  ];
};
// 基础配置
module.exports = {
  entry: path.join(src, "index.jsx"),
  // stats: "errors-only",
  stats: "minimal",
  output: {
    filename: `js/[name].bundle.[chunkhash:7].js`,
    chunkFilename: `js/[name].bundle.[chunkhash:7].js`,
    path: path.resolve(__dirname, "../output")
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        include: [src],
        exclude: /\.module\.css$/,
        use: [...getExtraLoaders()]
      },
      {
        test: /\.module\.css$/,
        include: [src],
        use: [...getExtraLoaders({ modules: true })]
      },
      {
        test: /\.less$/,
        include: [src],
        exclude: /\.module\.less$/,
        use: [
          ...getExtraLoaders(),
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.module\.less$/,
        include: [src],
        use: [...getExtraLoaders({ modules: true }), "less-loader"]
      },
      // 除src文件夹以外的css文件
      {
        test: /\.css$/,
        exclude: [src],
        use: [
          isEnvDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      // js文件，详细配合参考babel.config.json
      {
        test: /\.jsx?$/,
        include: [src],
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      // 图片等静态资源
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        include: [src],
        use: {
          loader: "url-loader",
          options: {
            limit: 20000,
            name: "assets/imgs/[name].[hash:7].[ext]"
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        include: [src],
        use: {
          loader: "url-loader",
          options: {
            limit: 20000,
            name: "assets/fonts/[name].[hash:7].[ext]"
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: "react" // 直接使用React而不用导入
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html"),
      filename: "index.html",
      inject: "body",
      publicPath: "/"
    })
  ].filter(Boolean),

  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: getAligns(),
    symlinks: false
  }
};
