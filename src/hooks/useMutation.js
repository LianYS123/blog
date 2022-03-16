import { useMutation } from "react-query";
import { useFetch } from "./useFetch";

/**
 * @description: 异步方法的简单封装，处理请求的loading状态
 * @param {function} service 异步方法
 * @return {array} 异步方法和状态信息
 */
export const useCustomMutation = (service, config = {}) => {
  const load = useFetch(service, config);
  const { mutateAsync, ...rest } = useMutation(load, config);

  return [mutateAsync, { ...rest, loading: rest.isLoading }];
};
