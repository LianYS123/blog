export const localMap = {
  zh_CN: "zh",
  en_US: "en"
};

export const BREAKPOINT = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)"
};

// 密码加密公钥
export const ENCRYPT_PUBLICKEY =
  "04298364ec840088475eae92a591e01284d1abefcda348b47eb324bb521bb03b0b2a5bc393f6b71dabb8f15c99a0050818b56b23f31743b93df9cf8948f15ddb54";

// 所有文章标签

export const TAGS_MAP = {
  常用: ["想法", "技术", "项目", "前端", "后端"],

  技术: ["React", "Linux", "Javascript", "Java", "Css"],

  学习: ["学习", "知识", "读书", "概念", "写作"],

  其他: ["生活", "游戏", "工作", "兴趣", "故事", "记录", "资源", "记忆", "梦"]
};

export const ALL_TAGS = Object.values(TAGS_MAP).flat();

export const COLLECTION_TYPES = {
  ARTICLE: 0,
  RESOURCE: 1,
  BOOK: 2
};

/**
 * 主页模块类型
 */
export const HOME_SECTION_TYPES = {
  /**
   * 文章
   */
  ARTICLE: 0,
  /**
   * 资源
   */
  RESOURCE: 1,
  /**
   * 图书
   */
  BOOK: 2,
  /**
   * 文章合集
   */
  ARTICLE_COLLECTION: 3,
  /**
   * 资源合集
   */
  RESOURCE_COLLECTION: 4,
  /**
   * 图书合集
   */
  BOOK_COLLECTION: 5,

  /**
   * 文章合集展开
   */
  ARTICLE_COLLECTION_EXPAND: 6,
  /**
   * 资源合集展开
   */
  RESOURCE_COLLECTION_EXPAND: 7,
  /**
   * 图书合集展开
   */
  BOOK_COLLECTION_EXPAND: 8
};
