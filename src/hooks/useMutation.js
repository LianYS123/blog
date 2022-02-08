import { LOGIN_STATUS } from "constants/index";
import { noop } from "lodash";
import { appSlice } from "models/app";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import routers from "routers";
import { getAPIMethod } from "utils/apiUtils";
import xFetch from "utils/fetch";

/**
 * @description: 异步方法的简单封装，处理请求的loading状态
 * @param {function} service 异步方法
 * @return {array} 异步方法和状态信息
 */
export const useMutation = (service, initialData = {}, config = {}) => {
  const {
    autoHandleError = false, // 请求出错弹出错误提示
    showActionMessage = false, // POST请求成功弹出提示信息
    successMessage,
    onSuccess = noop,
    onError = noop,
    onFinish = noop
  } = config;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState(initialData);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();

  const loadData = async (params, config) => {
    try {
      setLoading(true);
      const request =
        typeof service === "function" ? service : xFetch.bind(null, service);
      const res = await request(params, config);
      const { success, code, message } = res;

      // 处理操作成功和失败的提示
      if (success) {
        const method = getAPIMethod(service) || config.method;
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
      } else if (autoHandleError) {
        if (message) {
          enqueueSnackbar(message, { variant: "error" });
        } else {
          enqueueSnackbar("未知错误，请刷新重试", { variant: "error" });
        }
      }

      // 请求结果处理
      if (success) {
        onSuccess(res.data, data, res); // 新数据、老数据、请求结果
        setData(res.data || {});
      } else if (code === 1011008) {
        // 登录已过期
        dispatch(appSlice.actions.clearToken()); // 清除token
        dispatch(appSlice.actions.setLoginStatus(LOGIN_STATUS.LOGIN_EXPIRED)); // 修改登录状态，(弹出登录提示框)
      } else if (code === 1011006) {
        // 请求token错误
        dispatch(appSlice.actions.clearToken()); // 清除token
        history.push(routers.LOGIN);
      }

      setLoading(false);
      return res;
    } catch (e) {
      onError(e);
      setLoading(false);
      setError(e);
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      onFinish();
    }
  };

  return [loadData, { loading, error, data }];
};
