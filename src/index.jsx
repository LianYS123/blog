import React from "react";
import ReactDOM from "react-dom";

// 字体
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// markdown
import "bytemd/dist/index.min.css";
import "./github-markdown.less";
import "./highlight.less"; // 代码高亮
import "./highlight-dark.less"; // 代码高亮

import App from "./app";

ReactDOM.render(<App />, document.getElementById("root"));
