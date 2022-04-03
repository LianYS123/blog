import { appSlice } from "models/app";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { GET_LOGIN_USER } from "services/auth";
import { useRequest } from "./useRequest";
import { useLoginDialog } from "providers/LoginDialogProvider";
import { APP_ROUTES } from "routers/AppRoutes";
import { useRouteMatch } from "react-router-dom";
import { useTitle } from "react-use";

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
  // 切换主题
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
    onSettled: () => {
      dispatch(appSlice.actions.setIsAppLoaded(true));
    }
  });
};

/**
 * 登录断言
 * @returns {{assertLogged: Function, logged: boolean, assertLoggedWithoutError: Function}}
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
  const assertLoggedWithoutError = () => {
    if (!logged) {
      openLoginDialog({ tip: "请先登录" });
    }
    return logged;
  };
  return { assertLogged, logged, assertLoggedWithoutError };
};

/**
 * 页面标题
 */
export const useAppTitle = () => {
  // 路由地址和标题的映射
  const getRoutesTitleMap = (routes = []) => {
    const map = {};
    const stack = [...routes];
    while (stack.length) {
      const { title, path, children } = stack.pop();
      if (children && children.length) {
        stack.push(...children);
      }
      if (title && path) {
        map[path] = title;
      }
    }
    return map;
  };
  const routesTitleMap = useMemo(() => getRoutesTitleMap(APP_ROUTES), []);
  const { path } = useRouteMatch();
  const title = routesTitleMap[path] || "Blog";
  useTitle(title);
};
