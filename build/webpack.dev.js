//可以正常编译的优化版本
const baseConfig = require("./webpack.config");
const { merge } = require("webpack-merge");
const fs = require("fs");
const { join } = require("path");

const proxyjs = join(__dirname, "../proxy.js");
const proxyconfigjs = join(__dirname, "../proxy.js");
const proxyFile = fs.existsSync(proxyjs) ? proxyjs : proxyconfigjs;

const getProxy = () => {
  const proxy = fs.existsSync(proxyjs)
    ? require("../proxy.js")
    : require("../proxy.config.js");
  // eslint-disable-next-line no-console
  console.log(proxy);
  return proxy;
};

const devPort = 3080;

module.exports = merge(baseConfig, {
  mode: "development",

  devServer: {
    host: "0.0.0.0",
    port: devPort,
    historyApiFallback: true,
    // static: {
    //   publicPath: "/pages"
    // },
    watchFiles: [proxyFile],
    proxy: getProxy()
  }
});
