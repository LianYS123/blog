export const AUTH_LOGIN = "POST /api/auth/login"; // 登录
export const CONFIG_APP = "GET /api/setting"; // 配置
export const USER_INFO = "GET /api/user"; // 用户信息

// 文章
export const ARTICLE_LIST = "GET /api/article/list"; // 文章列表
export const GET_ARTICLE_DETAIL = "GET /api/article/detail/{id}"; // 文章详情
export const ADD_ARTICLE = "POST /api/article"; // 添加文章
export const EDIT_ARTICLE = "PUT /api/article"; // 编辑文章
export const DELETE_ARTICLE = "DELETE /api/article"; // 删除文章

export const IMAGE_UPLOAD = "/api/upload";

// 数据字典
export const GET_DICT_LIST = "GET /api/setting/dict/list";
export const ADD_DICT = "POST /api/setting/dict";
export const EDIT_DICT = "PUT /api/setting/dict";
export const DELETE_DICT = "DELETE /api/setting/dict/{id}";
