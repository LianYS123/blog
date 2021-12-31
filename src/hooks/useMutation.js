import { Notification } from "@douyinfe/semi-ui";
import { useMessageUtils } from "hooks";
import { noop } from "lodash";
import { useState } from "react";
import { useHistory } from "react-router";
import { getAPIMethod } from "utils/apiUtils";
import xFetch from "utils/fetch";

// 处理服务器返回错误消息
const useRequestErrorHandler = () => {
  const { showError, showSuccess } = useMessageUtils();
  const history = useHistory();

  const handler = res => {
    const { message } = res;
    const showErrorMessage = () => {
      if (message) {
        Notification.error({ title: message });
      } else {
        showError({ id: "SERVICE_API_ERR" });
      }
    };
    showErrorMessage();
  };
  return handler;
};

/**
 * @description: 异步方法的简单封装，处理请求的loading状态
 * @param {function} service 异步方法
 * @return {array} 异步方法和状态信息
 */
export const useMutation = (service, initialData = {}, config = {}) => {
  const {
    autoHandleError = true,
    showActionMessage = false,
    successMessageId,
    successMessage,
    onSuccess = noop,
    onError = noop,
    onFinish = noop
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
      const { success } = res;

      // 处理操作成功和失败的提示
      if (success) {
        const method = getAPIMethod(service) || config.method;
        const actionMessageMap = {
          POST: "OPERATE_SUCCESS",
          PUT: "OPERATE_SUCCESS",
          DELETE: "OPERATE_SUCCESS"
        };
        if (successMessage) {
          Notification.success({ title: successMessage });
        } else if (successMessageId) {
          showSuccess({ id: successMessageId });
        } else if (showActionMessage && actionMessageMap[method]) {
          showSuccess({ id: actionMessageMap[method] });
        }
      } else if (autoHandleError) {
        handler(res);
      }
      // 报错数据
      if (success) {
        setData(res.data || {});
        onSuccess(res.data, data);
      }

      setLoading(false);
      return res;
    } catch (e) {
      onError(e);
      setLoading(false);
      setError(e);
      // if (autoHandleError) {
      //   showError({ id: "SERVICE_API_ERR" });
      // }
      // eslint-disable-next-line no-console
      console.error(e);
    }
    onFinish();
  };

  return [loadData, { loading, error, data }];
};
