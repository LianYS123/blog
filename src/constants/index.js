// 项目通用常量存放位置
export const languageList = [
  {
    label: "English",
    value: "en-US"
  },
  {
    label: "中文",
    value: "zh-CN"
  },
  {
    label: "日本語",
    value: "ja-JP"
  },
  {
    label: "한국어",
    value: "ko-KR"
  }
];

export const languageListMap = languageList.reduce(
  (res, cur) => ({ ...res, [cur.value]: [cur.label] }),
  {}
);

export const languageCodeMap = {
  zh_CN: "CN",
  en_US: "EN"
};

export const localMap = {
  zh_CN: "zh",
  en_US: "en"
};

export const COMMON_FORM_ITEM_LAYOUT = {
  labelCol: {
    span: 6
  },
  wrapper: {
    span: 6
  },
  labelAlign: "right",
  labelPosition: "left"
};
