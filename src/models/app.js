import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    token: localStorage.getItem("acc"),
    sidebar: [],
    menuList: [],
    userInfo: {},
    loadingApp: false,
    local: localStorage.getItem("lang") || "en_US",
    config: {},
    dictMap: {}
  },
  reducers: {
    // 将token保存在全局
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("acc", action.payload);
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
    }
  }
});

export default appSlice.reducer;
