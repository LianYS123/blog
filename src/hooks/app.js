import { useMutation } from "hooks";
import { appSlice } from "models/app";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { USER_INFO } from "services/app";

// 主题操作
export const useTheme = () => {
  const { theme } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const switchTo = mode => {
    dispatch(appSlice.actions.setTheme(mode));
  };
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
  return { theme, isDark, switchToDark, switchToLight, toggleTheme, switchTo };
};

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
      if (res?.success) {
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
  const { switchTo, theme } = useTheme();

  // 初始化主题
  useEffect(() => {
    switchTo(theme);
  }, []);

  // 请求数据字典
  // useRemoteData({
  //   action: appSlice.actions.setDict,
  //   service: GET_ALL_DICT,
  //   ready: !!token
  // });

  // 请求初始化配置信息
  // useRemoteData({
  //   action: appSlice.actions.setConfig,
  //   service: CONFIG_APP
  // });

  // token变化时请求用户信息并存储到全局
  useRemoteData({
    service: USER_INFO,
    action: appSlice.actions.setUserInfo,
    ready: !!token,
    deps: [token]
  });
};
