import { appSlice } from "models/app";
import { useSnackbar } from "notistack";
import { useLoginDialog } from "providers/LoginDialogProvider";
import { useDispatch } from "react-redux";
import { getAPIMethod } from "utils/apiUtils";
import xFetch from "utils/fetch";

/**
 * @description: 异步方法的简单封装，处理请求的loading状态
 * @param {function} service 异步方法
 * @return {array} 异步方法和状态信息
 */
export const useFetch = (service, config = {}) => {
  const {
    autoHandleError = true, // 请求出错弹出错误提示
    showActionMessage = false, // POST请求成功弹出提示信息
    successMessage
  } = config;

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { open: openLoginDialog } = useLoginDialog();

  const load = async (params, config) => {
    const request =
      typeof service === "function" ? service : xFetch.bind(null, service);
    const res = await request(params, config);
    const { success, code, message } = res;
    const method = getAPIMethod(service) || config.method;

    if (success) {
      // 请求结果处理

      // 处理操作成功和失败的提示
      const actionMessageMap = {
        POST: "操作成功",
        PUT: "修改成功",
        DELETE: "删除成功"
      };

      if (successMessage) {
        enqueueSnackbar(successMessage);
      } else if (showActionMessage && actionMessageMap[method]) {
        enqueueSnackbar(actionMessageMap[method]);
      }
    } else if (code === 1011008 || code === 1011006) {
      // 登录已过期
      dispatch(appSlice.actions.setUserInfo({})); // 清空用户信息
      dispatch(appSlice.actions.clearToken()); // 清除token
      dispatch(appSlice.actions.setLogged(false)); // 修改登录状态
      openLoginDialog({
        tip:
          code === 1011008
            ? "登录已过期, 请重新登录"
            : "登录认证异常, 请重新登录"
      });
    } else {
      if (autoHandleError) {
        if (message) {
          enqueueSnackbar(message, { variant: "error" });
        } else {
          enqueueSnackbar("未知错误，请刷新重试", { variant: "error" });
        }
      }
      throw new Error(message || "服务器异常");
    }

    return res;
  };

  return load;
};
