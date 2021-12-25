### vite + react + antd + redux + css module/less/tailwind + eslint 项目基本框架

react 项目快速开发脚手架
实现了基本的登录功能和请求后端配置数据并存储到全局

### 一些实践方案：

#### 数据请求

- 数据请求方式：
  业务请求 -> useRequest/useMutation -> xFetch

在 xFetch 中对 api 的处理进行了处理，现在可以通过更加方便的方式识别请求方式和路由参数:

```js
xFetch("GET /api/user/{id}", { id: 1, account: "abc" }) -> fetch("/api/user/1?account=abc")
```

所有的请求尽量都走 hooks,因为在 useMutation 自动处理了错误提示和 post/delete 等请求成功提示, 以及添加与全局状态相关的参数

#### css

同时支持 tailwind css 和 less 以及 css module  
[tailwindcss](https://tailwindcss.com/)

#### 状态管理

使用 redux 管理全局状态，除了必要数据，其他状态不推荐存储在全局

参考:

[redux](http://cn.redux.js.org/introduction/getting-started)
[redux-toolkit](https://redux-toolkit.js.org/introduction/getting-started)

#### 国际化

使用 react-intl, 所有的国际化通过其提供的`useIntl`hooks 进行  
[formmate.js](https://formatjs.io/docs/getting-started/installation)

#### 布局

相关文件放在 layout 文件夹，包括侧边栏相关内容，若需要将相关功能提取出来，可以提取为 hooks

#### 代码规范

eslint 会在 commit 之前自动执行并尝试格式化代码，不符合规范的代码提交会失败
使用 prettier 和 eslint:recommended 规范
