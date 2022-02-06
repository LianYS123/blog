import { Modal } from "@douyinfe/semi-ui";
import { ENCRYPT_PUBLICKEY } from "constants";
import dayjs from "dayjs";
import fileSize from "filesize";

export const delay = (t = 500) =>
  new Promise(resolve => setTimeout(resolve, t));

export const secretPhone = phone => {
  if (!phone) return "";
  return phone.replace(/(\d{1,4})\w{4}(\d{1,3})/, "$1****$2");
};

export const renderDateTime = time =>
  time ? dayjs(time * 1000).format("YYYY-MM-DD HH:mm:ss") : null;

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

export const getFileInfo = (file, defaultValues = {}) => {
  if (!file) return {};
  const {
    fileInstance = {},
    response: { data: src = defaultValues.src } = {},
    url: blobUrl,
    size: showSize
  } = file;
  const {
    name = defaultValues.name,
    size = defaultValues.size,
    type = defaultValues.type
  } = fileInstance;
  return { src, blobUrl, size, showSize, type, name };
};

export const getDefaultFileObj = ({ src, size = 0, showSize, name }) => {
  const file = {
    uid: src || name,
    name,
    status: "success",
    size: showSize || fileSize(size),
    preview: true,
    url: src,
    response: {
      data: src,
      code: "0000"
    }
  };
  return file;
};

export const deleteConfirmModalAction = ({ method, id, onFinish }) => {
  Modal.warning({
    title: "确认删除？",
    content: "删除后不可恢复，请谨慎操作。",
    okButtonProps: { type: "danger" },
    onOk: async () => {
      const result = await method({ id });
      if (onFinish) {
        onFinish(result);
      }
    }
  });
};

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
