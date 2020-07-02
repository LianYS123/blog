const { smart } = require('webpack-merge');
module.exports = smart(require('./webpack.config.base'), {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    publicPath: '/', //静态资源路径
    port: 8080,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:12345',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
