import type { AppProps } from "next/app";
import React from "react";
import { AppProvider } from "providers";

// 样式
import "../styles/globals.css";
import "../styles/app.scss"; // 代码高亮

// markdown
import "bytemd/dist/index.min.css";
import "../styles/github-markdown.scss";
import "../styles/highlight.scss"; // 代码高亮
import "../styles/highlight-dark.scss"; // 代码高亮

// 字体
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
