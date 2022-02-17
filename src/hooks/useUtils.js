// eslint-disable-next-line no-unused-vars
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  EffectCallback
} from "react";
import isEqual from "fast-deep-equal";

import { usePrevious, useWindowScroll, useWindowSize } from "react-use";
import { getDocHeight } from "utils";

/**
 * @description: 自定义useEffect的更新逻辑
 * @param {EffectCallback} effect 作用
 * @param {Array} deps 依赖
 * @param {Function} shouldUpdate 是否执行作用，返回true执行effect
 */
export const useShouldUpdateEffect = (effect, deps, shouldUpdate) => {
  const depsRef = useRef(deps);
  if (shouldUpdate(depsRef.current, deps)) {
    depsRef.current = deps;
  }
  useEffect(effect, depsRef.current);
};

/**
 * @description: 自定义useEffect的依赖比较逻辑
 * @param {EffectCallback} effect 作用
 * @param {Array} deps 依赖
 * @param {Function} compare 自定义比较函数
 */
export const useCustomCompareEffect = (effect, deps, compare) =>
  useShouldUpdateEffect(effect, deps, (...args) => !compare(...args));

/**
 * @description: 使用深比较的useEffect
 * @param {EffectCallback} effect 作用
 * @param {Array} deps 依赖
 */
export const useDeepCompareEffect = (effect, deps = []) => {
  return useCustomCompareEffect(effect, deps, isEqual);
};

/**
 * @description 真假值状态封装
 * @param {*} initialFlag 初始状态
 * @return {{ flag: Boolean, setTrue: Function, setFalse: Function, toggle: Function }}
 */
export const useFlag = initialFlag => {
  const [flag, setFlag] = useState(initialFlag);
  const setTrue = useCallback(() => setFlag(true), []);
  const setFalse = useCallback(() => setFlag(false), []);
  const toggle = useCallback(() => setFlag(f => !f), []);
  return {
    flag,
    setTrue,
    setFalse,
    toggle
  };
};

/**
 * @description 弹出框状态封装
 * @param {Object} [initialProps] modal属性初始值
 * @return {{ open: Function, close: Function, visible: Boolean }}
 */
export const useModalAction = initialProps => {
  const { flag, setFalse, setTrue } = useFlag(false);
  const [props, setProps] = useState(initialProps || {});
  const open = useCallback(props => {
    setTrue();
    setProps(props);
  }, []);
  const close = useCallback(() => {
    setFalse();
    setProps(initialProps);
  }, []);
  return {
    open,
    close,
    visible: flag,
    ...props
  };
};

/**
 * @description: 自动递减计时器
 * @param {Object} config
 * @param {Object} config.countFrom
 * @param {Object} config.countTo
 * @param {Object} config.interval
 * @param {Object} config.autoStart
 * @return {*}
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
