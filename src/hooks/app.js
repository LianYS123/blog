import { useMutation } from "hooks";
import { appSlice } from "models/app";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GET_LOGIN_USER } from "services/auth";
import { noop } from "lodash";
import { useRequest } from "./useRequest";
import { useLoginDialog } from "providers/LoginDialogProvider";

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
  onSuccess = noop,
  getData = res => res?.data
}) => {
  const dispatch = useDispatch();
  const [load, { data }] = useMutation(service);
  const request = async () => {
    if (ready) {
      const res = await load();
      if (res.success) {
        dispatch(action(getData(res)));
        onSuccess(res);
      }
    }
  };
  useEffect(() => {
    request();
  }, [ready, ...deps]);
  return data;
};

// 数据初始化
export const useInitApp = () => {
  const { token } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const { switchTo, theme } = useTheme();

  // 初始化主题
  useEffect(() => {
    switchTo(theme);
  }, []);

  useEffect(() => {
    if (!token) {
      dispatch(appSlice.actions.setIsAppLoaded(true));
    }
  }, [token]);

  // token变化时请求用户信息并存储到全局
  useRequest({
    service: GET_LOGIN_USER,
    ready: !!token,
    deps: [token],
    onSuccess: data => {
      // 设置登录数据，修改登录状态为已登录
      dispatch(appSlice.actions.setUserInfo(data));
      dispatch(appSlice.actions.setLogged(true));
    },
    onFinish: () => {
      dispatch(appSlice.actions.setIsAppLoaded(true));
    }
  });
};

/**
 * 登录断言
 * @returns {{assertLogged: Function, logged: boolean}}
 */
export const useAssertLogged = () => {
  const { logged } = useSelector(state => state.app);
  const { open: openLoginDialog } = useLoginDialog();
  const assertLogged = () => {
    if (!logged) {
      openLoginDialog({ tip: "请先登录" });
      throw new Error("用户未登录");
    }
  };
  return { assertLogged, logged };
};
