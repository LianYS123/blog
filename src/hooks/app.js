import { useMutation } from "hooks";
import { CONFIG_APP, GET_ALL_DICT, USER_INFO } from "services/API";
import { appSlice } from "models/app";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

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
    service: GET_ALL_DICT
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
