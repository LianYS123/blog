import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    token: localStorage.getItem("acc"),
    sidebar: [],
    menuList: [],
    userInfo: {},
    loadingApp: false,
    local: localStorage.getItem("lang") || "zh_CN",
    config: {},
    dictMap: {},
    theme: localStorage.getItem("theme") || "light", // 默认暗色主题
    isAppLoaded: false, // 应用初始化完成，可以加载子页面
    logged: false // 是否已登录
  },
  reducers: {
    // 将token保存在全局
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("acc", action.payload);
    },
    // 清除token
    clearToken: state => {
      state.token = null;
      localStorage.removeItem("acc");
    },
    setMenu: (state, action) => {
      state.menuList = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setConfig: (state, action) => {
      state.config = action.payload;
    },
    setDict: (state, action) => {
      state.dictMap = (action.payload || []).reduce(
        (res, cur) => ({ ...res, [cur.key]: cur.value }),
        {}
      );
    },
    setLocal: (state, action) => {
      state.local = action.payload;
    },
    setTheme: (state, action) => {
      const body = document.body;
      const isDark = action.payload === "dark";
      localStorage.setItem("theme", action.payload);
      state.theme = action.payload;
      if (isDark) {
        body.setAttribute("theme-mode", "dark");
        body.classList.add("dark");
        body.classList.remove("light");
        document.documentElement.style.colorScheme = "dark";
      } else {
        body.removeAttribute("theme-mode");
        body.classList.remove("dark");
        body.classList.add("light");
        document.documentElement.style.colorScheme = "light";
      }
    },
    setIsAppLoaded: (state, action) => {
      state.isAppLoaded = action.payload;
    },
    setLogged: (state, action) => {
      state.logged = action.payload;
    }
  }
});

export default appSlice.reducer;
