import { ENCRYPT_PUBLICKEY } from "constants";
import dayjs from "dayjs";

export const delay = (t = 500) =>
  new Promise(resolve => setTimeout(resolve, t));

export const renderDateTime = time =>
  time ? dayjs(time).format("YYYY-MM-DD HH:mm:ss") : null;

// 显示内容发表时间
export function timestampFormat(time) {
  // const timestamp = time * 1000;
  const timestamp = Math.floor(dayjs(time).valueOf() / 1000);
  function zeroize(num) {
    return (String(num).length == 1 ? "0" : "") + num;
  }

  const curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
  const timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

  const curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
  const tmDate = new Date(timestamp * 1000); // 参数时间戳转换成的日期对象

  const Y = tmDate.getFullYear(),
    m = tmDate.getMonth() + 1,
    d = tmDate.getDate();
  const H = tmDate.getHours(),
    i = tmDate.getMinutes(),
    s = tmDate.getSeconds();

  if (timestampDiff < 60) {
    // 一分钟以内
    return "刚刚";
  } else if (timestampDiff < 3600) {
    // 一小时前之内
    return Math.floor(timestampDiff / 60) + " 分钟前";
  } else if (
    curDate.getFullYear() == Y &&
    curDate.getMonth() + 1 == m &&
    curDate.getDate() == d
  ) {
    return "今天 " + zeroize(H) + ":" + zeroize(i);
  } else {
    const newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
    if (
      newDate.getFullYear() == Y &&
      newDate.getMonth() + 1 == m &&
      newDate.getDate() == d
    ) {
      return "昨天 " + zeroize(H) + ":" + zeroize(i);
    } else if (curDate.getFullYear() == Y) {
      return (
        zeroize(m) + "/" + zeroize(d) + " " + zeroize(H) + ":" + zeroize(i)
      );
    } else {
      return (
        Y +
        "/" +
        zeroize(m) +
        "/" +
        zeroize(d) +
        " " +
        zeroize(H) +
        ":" +
        zeroize(i)
      );
    }
  }
}

// 密码加密
export const encrypt = password => {
  const sm2 = require("sm-crypto").sm2;
  const encryptData = sm2.doEncrypt(password, ENCRYPT_PUBLICKEY, 1);
  return encryptData;
};

// 计算文档和滚动距离总高度
export function getDocHeight() {
  var D = document;
  return Math.max(
    D.body.scrollHeight,
    D.documentElement.scrollHeight,
    D.body.offsetHeight,
    D.documentElement.offsetHeight,
    D.body.clientHeight,
    D.documentElement.clientHeight
  );
}

// 一个汉字相当于两个英文字符
export const getSummary = (text, count = 200) => {
  let resultStr = "";
  let n = 0;
  for (let i = 0; i < text.length; i++) {
    if (n > count) {
      return resultStr + "...";
    }
    // eslint-disable-next-line no-control-regex
    n += /[^\x00-\xff]/.test(text[i]) ? 2 : 1;
    resultStr += text[i];
  }
  return resultStr;
};

// 获取表单组件通用属性
export const getCommonFieldProps = (name, formik) => {
  return {
    name,
    value: formik.values[name],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    error: formik.touched[name] && !!formik.errors[name],
    helperText: formik.touched[name] && formik.errors[name]
  };
};

// 是否是iOS设配
export const isiosDevice = () => {
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  return iOS;
};

// 获取指定质量的图片
export const getQualityImage = (url, quality = 60) => {
  const isValid =
    url &&
    [".png", ".jpg", ".PNG", ".JPG"].some(suffix => url.endsWith(suffix));
  if (!isValid) {
    return url;
  }
  return `${url}?imageMogr2/quality/${quality}`;
};

// 获取指定相对质量的图片
export const getRQualityImage = (url, quality = 60) => {
  const isValid =
    url &&
    [".png", ".jpg", ".jpeg", ".PNG", ".JPG", ".JPEG"].some(suffix =>
      url.endsWith(suffix)
    );
  if (!isValid) {
    return url;
  }
  return `${url}?imageMogr2/rquality/${quality}`;
};
