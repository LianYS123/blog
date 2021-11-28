import { useMutation } from "hooks";
import { appSlice } from "models/app";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GET_ALL_DICT } from "services/dict";
import { CONFIG_APP } from "services/app";
import { USER_INFO } from "services/user";

// 请求数据并存储到redux
export const useRemoteData = ({
  service,
  action,
  ready = true,
  deps = [],
  getData = res => res?.data
}) => {
  const dispatch = useDispatch();
  const [load] = useMutation(service);
  const request = async () => {
    if (ready) {
      const res = await load();
      if (res?.code === "0000") {
        dispatch(action(getData(res)));
      }
    }
  };
  useEffect(() => {
    request();
  }, [ready, ...deps]);
};

// 数据初始化
export const useInitApp = () => {
  const { token } = useSelector(state => state.app);

  useRemoteData({
    action: appSlice.actions.setDict,
    service: GET_ALL_DICT,
    ready: !!token
  });

  // 请求初始化配置信息
  useRemoteData({
    action: appSlice.actions.setConfig,
    service: CONFIG_APP
  });

  // token变化时请求用户信息并存储到全局
  useRemoteData({
    service: USER_INFO,
    action: appSlice.actions.setUserInfo,
    ready: !!token,
    deps: [token]
  });
};

// 主题操作
export const useTheme = () => {
  const { theme } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const switchTo = mode => {
    dispatch(appSlice.actions.setTheme(mode));
  };
  const body = document.body;
  const switchToLight = () => {
    switchTo("light");
  };
  const switchToDark = () => {
    switchTo("dark");
  };
  const toggleTheme = () => {
    if (theme === "dark") {
      switchToLight();
    } else {
      switchToDark();
    }
  };
  const isDark = theme === "dark";

  useEffect(() => {
    if (theme === "light") {
      body.removeAttribute("theme-mode");
      body.classList.remove("dark");
    }
    if (theme === "dark") {
      body.setAttribute("theme-mode", "dark");
      body.classList.add("dark");
    }
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
  return { theme, isDark, switchToDark, switchToLight, toggleTheme };
};
