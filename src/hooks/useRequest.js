import { useQuery } from "react-query";
import { useFetch } from "./useFetch";

/**
 * @description: 请求方法的简单封装，处理请求的loading状态
 */
export const useRequest = ({
  service,
  params,
  deps = [],
  ready = true,
  ...config
}) => {
  const fetch = useFetch(service, config);
  const queryFn = async () => {
    const { data } = await fetch(params, config);
    return data;
  };
  return useQuery({
    queryFn,
    queryKey: [service, params, ...deps],
    enabled: ready,
    ...config
  });
};
