const { smart } = require('webpack-merge');
const { join } = require('path');
const webpack = require('webpack');
const dllAssetPath = join(__dirname, '../', 'dll');
const dllLibraryName = 'vendor';
const mode = process.env.NODE_ENV;
module.exports = smart({
  mode,
  entry: ['react', 'react-dom', 'react-router-dom', 'react-redux', 'antd'],
  output: {
    path: dllAssetPath,
    filename: 'vendor.js',
    library: dllLibraryName
  },
  plugins: [
    new webpack.DllPlugin({
      name: dllLibraryName, //与output的library对应
      path: join(dllAssetPath, 'manifest.json') //生成清单的路径
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
});
