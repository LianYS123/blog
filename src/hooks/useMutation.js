import { notification } from "antd";
import { useMessageUtils } from "hooks";
import { useState } from "react";
import { useHistory } from "react-router";
import { getAPIMethod } from "utils/apiUtils";
import xFetch from "utils/fetch";

// 处理服务器返回错误消息
const useRequestErrorHandler = () => {
  const { showError, showSuccess } = useMessageUtils();
  const history = useHistory();

  const handler = res => {
    const { code = "", message } = res;
    const showErrorMessage = () => {
      if (message) {
        notification.error({ message });
      } else {
        showError({ id: "SERVICE_API_ERR" });
      }
    };
    if (code === "LGN4001000") {
      showErrorMessage();
      history.push("/login");
    } else {
      showErrorMessage();
    }
  };
  return handler;
};

/**
 * @description: 异步方法的简单封装，处理请求的loading状态
 * @param {function} service 异步方法
 * @return {array} 异步方法和状态信息
 */
export const useMutation = (service, initialData, config = {}) => {
  const {
    autoHandleError = true,
    showActionMessage = true,
    successMessageId,
    successMessage
  } = config;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState(initialData);
  const { showError, showSuccess } = useMessageUtils();
  const handler = useRequestErrorHandler();

  const loadData = async (params, config) => {
    try {
      setLoading(true);
      const request =
        typeof service === "function" ? service : xFetch.bind(null, service);
      const res = await request(params, config);
      const { code = "", message } = res;

      // 处理操作成功和失败的提示
      if (code === "0000") {
        const method = getAPIMethod(service) || config.method;
        const actionMessageMap = {
          POST: "OPERATE_SUCCESS",
          PUT: "OPERATE_SUCCESS",
          DELETE: "OPERATE_SUCCESS"
        };
        if (successMessage) {
          notification.success({ message: successMessage });
        } else if (successMessageId) {
          showSuccess({ id: successMessageId });
        } else if (showActionMessage && actionMessageMap[method]) {
          showSuccess({ id: actionMessageMap[method] });
        }
      } else if (autoHandleError) {
        handler(res);
      }

      setLoading(false);
      setData(res);
      return res;
    } catch (e) {
      setLoading(false);
      setError(e);
      // if (autoHandleError) {
      //   showError({ id: "SERVICE_API_ERR" });
      // }
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return [loadData, { loading, error, data }];
};
