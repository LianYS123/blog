import legacyPlugin from "@vitejs/plugin-legacy";
import * as path from "path";
import reactRefresh from "@vitejs/plugin-react-refresh";
import fs from "fs";
// @see https://cn.vitejs.dev/config/

const src = path.join(__dirname, "./src");
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

export default ({ command, mode }) => {
  const proxy = {
    "/api": {
      target: "http://localhost:8090",
      changeOrigin: true
    }
  };

  return {
    base: "./", // index.html文件所在位置
    root: "./", // js导入的资源路径，src
    resolve: {
      alias: getAligns()
    },
    define: {
      // "process.env.APP_IS_LOCAL": '"true"'
    },
    server: {
      // 代理
      proxy
    },
    build: {
      target: "es2015",
      minify: "terser", // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
      manifest: false, // 是否产出maifest.json
      sourcemap: false, // 是否产出soucemap.json
      outDir: "output", // 产出目录
      rollupOptions: {}
    },
    esbuild: {},
    optimizeDeps: {},
    plugins: [
      legacyPlugin({
        targets: [
          "Android > 39",
          "Chrome >= 60",
          "Safari >= 10.1",
          "iOS >= 10.3",
          "Firefox >= 54",
          "Edge >= 15"
        ]
      }),
      reactRefresh()
    ]
    // css: {
    //   preprocessorOptions: {
    //     less: {
    //       // 支持内联 JavaScript
    //       javascriptEnabled: true
    //     }
    //   }
    // }
  };
};
