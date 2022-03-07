// eslint-disable-next-line no-unused-vars
import { useEffect, useState, useRef, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { usePrevious, useWindowScroll, useWindowSize } from "react-use";
import routers from "routers";
import { getDocHeight } from "utils";

/**
 * @description 弹出框状态封装
 * @param {Object} [initialProps] modal属性初始值
 * @return {{ open: Function, close: Function, visible: Boolean }}
 */
export const useModalAction = initialProps => {
  const [visible, setVisible] = useState(false);
  const [props, setProps] = useState(initialProps || {});
  const open = useCallback(props => {
    setVisible(true);
    setProps(props);
  }, []);
  const close = useCallback(() => {
    setVisible(false);
    setProps(initialProps);
  }, []);
  return {
    open,
    close,
    visible,
    ...props
  };
};

/**
 * @description: 自动递减计时器，常用于发送验证码的倒计时
 * @param {Object} config
 * @param {number} config.countFrom
 * @param {number} config.countTo
 * @param {number} config.interval
 * @param {boolean} config.autoStart
 */
export const useCountDown = ({
  countFrom = 60,
  countTo = 0,
  interval = 1000,
  autoStart = false
} = {}) => {
  const [count, setCount] = useState(countFrom);
  const [isPaused, setPaused] = useState(!autoStart);
  const timerRef = useRef(null);
  const decreaseRef = useRef();

  const start = () => {
    setPaused(false);
  };
  const pause = () => {
    setPaused(true);
  };
  const reset = () => {
    clearInterval(timerRef.current);
    setPaused(true);
    setCount(countFrom);
  };

  decreaseRef.current = () => {
    if (count > countTo) {
      setCount(c => c - 1);
    } else {
      reset();
    }
  };
  useEffect(() => {
    if (isPaused) {
      clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(() => {
        decreaseRef.current(); // 定时器内部使用ref防止闭包
      }, interval);
    }
    return () => clearInterval(timerRef.current); // 清除定时器
  }, [isPaused]);
  return { count, start, pause, isPaused, reset };
};

/**
 * @param {number} dis 距离底部的距离
 * @returns 是否已经到达底部
 */
export const useIsBottom = (dis = 0) => {
  const { y } = useWindowScroll();
  const { height } = useWindowSize();
  return y + height + dis >= getDocHeight();
};

/**
 * 监听屏幕指定方向的滚动距离（方向改变时重置为0）
 * 尚未完成，不要使用
 */
export const useScrollDistance = () => {
  const { y } = useWindowScroll();
  const startUpPos = useRef(y); // 向上滚动开始位置
  const startDownPos = useRef(y); // 向下滚动开始位置
  const preY = usePrevious(y);
  const upDis = startUpPos.current - y; // 向上滚动了多远
  const downDis = y - startDownPos.current; // 向下滚动了多远

  const realIsUp = y < preY; // 实时的是否向上滚动
  if (realIsUp) {
    // 正在向上滚动，实时更新向下滚动的开始位置
    startDownPos.current = y;
  } else {
    startUpPos.current = y;
  }

  // 以上是实时数据
  // 根据实时数据计算延迟数据
  const DISTANCE = 50; // 触发方向改变的距离
  const startUpPosDelay = useRef(y);
  const startDownPosDelay = useRef(y);

  if (upDis > DISTANCE) {
    // 向上滚动了一定距离后
    startUpPosDelay.current = startUpPos.current;
  }

  if (downDis > DISTANCE) {
    startDownPosDelay.current = startDownPos.current;
  }

  const upDisDelay = startUpPosDelay.current - y; // 向上滚动了多远
  const downDisDelay = y - startDownPosDelay.current; // 向下滚动了多远
  // console.log(downDisDelay);

  return {
    upDis: upDisDelay,
    downDis: downDisDelay
  };
};

/**
 * React Router 刷新当前页
 * @param {*} redirectPath 临时跳转路由
 */
export const useRefresh = (redirectPath = routers.TMP_REDIRECT) => {
  const history = useHistory();
  const { pathname } = history.location;
  let handler;
  const refresh = () => {
    history.replace(redirectPath);
    handler = setTimeout(() => {
      history.replace(pathname); // 使用闭包的特性，返回旧路由
    }, 10);
  };
  useEffect(() => {
    return () => handler && clearTimeout(handler);
  }, [handler]);
  return refresh;
};

/**
 * 延迟loading, 参考: https://github.com/smeijer/spin-delay
 */
export function useSpinDelay(loading, options) {
  options = Object.assign(
    {
      delay: 500,
      minDuration: 200
    },
    options
  );

  const [state, setState] = useState("IDLE");
  const timeout = useRef(null);

  useEffect(() => {
    if (loading && state === "IDLE") {
      clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        if (!loading) {
          return setState("IDLE");
        }

        timeout.current = setTimeout(() => {
          setState("EXPIRE");
        }, options.minDuration);

        setState("DISPLAY");
      }, options.delay);

      setState("DELAY");
    }

    if (!loading && state !== "DISPLAY") {
      clearTimeout(timeout.current);
      setState("IDLE");
    }
  }, [loading, state, options.delay, options.minDuration]);

  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);

  return state === "DISPLAY" || state === "EXPIRE";
}

/**
 * 修改历史记录状态
 */
export const useHistoryState = () => {
  const history = useHistory();

  const { state = {}, pathname } = useLocation();

  // 修改 history 状态
  const setState = (newState = {}) => {
    history.replace(pathname, { ...state, ...newState });
  };

  return { state, setState, history };
};
