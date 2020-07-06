const { join } = require('path');
const { smart } = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const MinCssExtractPlugin = require('mini-css-extract-plugin');
const root = join(__dirname, '../');
module.exports = smart({
  entry: {
    index: './app/index.js'
  },
  output: {
    path: join(root, 'dist'),
    filename: 'bundle.js',
    publicPath: '' // 资源请求路径
  },
  context: root, //webpack的主目录，相对于此目录解析

  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
    alias: {
      components: join(root,'app/components'),
      pages: join(root,'app/pages'),
      service: join(root,'app/service'),
      utils: join(root,'app/utils'),
    }
  },
  module: {
    rules: [
      {
        use: [MinCssExtractPlugin.loader,'css-loader'],
        test: /\.css$/
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'happypack/loader?id=js'
      },
      {
        test: /\.(png|jpg|gif)$/i,
        exclude: /(node_modules|bower_components)/,
        loader: 'happypack/loader?id=img'
      }
    ]
  },
  optimization: {
    splitChunks:{
      chunks: 'all' //对所有chunks进行提取（async：只提取一步chunk，initial：只对入口chunk生效）
    }
  },
  target: "web",
  stats: {
    // Add asset Information
    assets: true,
    // Sort assets by a field
    assetsSort: "field",
    // Add information about cached (not built) modules
    cached: true,
    // Show cached assets (setting this to `false` only shows emitted files)
    cachedAssets: true,
    // Add children information
    children: true,
    // Add chunk information (setting this to `false` allows for a less verbose output)
    chunks: false,
    // Add built modules information to chunk information
    chunkModules: false,
    // Add the origins of chunks and chunk merging info
    chunkOrigins: true,
    // Sort the chunks by a field
    chunksSort: "field",
    // Context directory for request shortening
    // context: "../src/",
    // `webpack --colors` equivalent
    colors: true,
    // Display the distance from the entry point for each module
    depth: false,
    // Display the entry points with the corresponding bundles
    entrypoints: false,
    // Add errors
    errors: true,
    // Add details to errors (like resolving log)
    errorDetails: true,
    // Exclude modules which match one of the given strings or regular expressions
    exclude: [],
    // Add the hash of the compilation
    hash: true,
    // Set the maximum number of modules to be shown
    maxModules: 10000,
    // Add built modules information
    modules: false,
    // Sort the modules by a field
    modulesSort: "field",
    // Show performance hint when file size exceeds `performance.maxAssetSize`
    performance: true,
    // Show the exports of the modules
    providedExports: false,
    // Add public path information
    publicPath: true,
    // Add information about the reasons why modules are included
    reasons: true,
    // Add the source code of modules
    source: true,
    // Add timing information
    timings: true,
    // Show which exports of a module are used
    usedExports: false,
    // Add webpack version information
    version: true,
    // Add warnings
    warnings: false
    // Filter warnings to be shown (since webpack 2.4.0),
    // can be a String, Regexp, a function getting the warning and returning a boolean
    // or an Array of a combination of the above. First match wins.
  },
  // externals: {
  //   antd: 'antd',
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  //   'react-redux': 'ReactRedux',
  //   'react-router-dom': 'ReactRouter'
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html',
      favicon: './app/assets/favicon.ico'
    }),
    new HappyPack({
      id: 'js',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              [
                '@babel/preset-react', //处理react的jsx语法
                {
                  modules: false
                }
              ]
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      ]
    }),
    new HappyPack({
      id: 'img',
      loaders: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      ]
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),

    //将文件复制到dist目录下方便script引用
    new CopyWebpackPlugin({
      patterns: [
        {
          from: join(root, 'dll'),
          to: 'dll'
        }
      ]
    }),

    //bundle.js打包大小： 加了这个插件打包大小384k，不加这个插件1.29M
    new webpack.DllReferencePlugin({
      manifest: require(join(root, 'dll/manifest.json')) //将提取的vendor.js插入html中
    }),
    new ProgressBarPlugin(),
    new MinCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
});
