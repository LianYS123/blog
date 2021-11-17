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

export const HOME_PANEL_CATEGORY = {
  SINGLE_ITEM: "单项展示",
  PANEL_LIST: "水平列表",
  PANEL_WALL: "照片墙"
};

export const BREAKPOINT = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)"
};
