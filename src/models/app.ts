import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    token: null,
    sidebar: [],
    menuList: [],
    userInfo: {},
    loadingApp: false,
    config: {},
    dictMap: {},
    theme: "light" as "light" | "dark", // 默认暗色主题
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
    clearToken: (state) => {
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
        document.documentElement.dataset.theme = "dark";
      } else {
        body.removeAttribute("theme-mode");
        body.classList.remove("dark");
        body.classList.add("light");
        document.documentElement.style.colorScheme = "light";
        document.documentElement.dataset.theme = "light";
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
