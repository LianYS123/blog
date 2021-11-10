export const AUTH_LOGIN = "POST /api/auth/login"; // 登录
export const CONFIG_APP = "GET /api/setting"; // 配置
export const USER_INFO = "GET /api/user"; // 用户信息

// 文章
export const ARTICLE_LIST = "GET /api/article/list"; // 文章列表
export const GET_ARTICLE_DETAIL = "GET /api/article/detail/{id}"; // 文章详情
export const ADD_ARTICLE = "POST /api/article"; // 添加文章
export const EDIT_ARTICLE = "PUT /api/article"; // 编辑文章
export const DELETE_ARTICLE = "DELETE /api/article/{id}"; // 删除文章

export const IMAGE_UPLOAD = "/api/upload";

// 数据字典
export const GET_DICT_LIST = "GET /api/dict/list";
export const GET_ALL_DICT = "GET /api/dict";
export const ADD_DICT = "POST /api/dict";
export const EDIT_DICT = "PUT /api/dict";
export const DELETE_DICT = "DELETE /api/dict/{id}";

// 标签
export const GET_TAG_LIST = "GET /api/tag/list";
export const GET_ALL_TAGS = "GET /api/tag";
export const ADD_TAG = "POST /api/tag";
export const EDIT_TAG = "PUT /api/tag/{id}";
export const DELETE_TAG = "DELETE /api/tag/{id}";

// 资源
export const GET_RESOURCE_LIST = "GET /api/resource/list";
export const ADD_RESOURCE = "POST /api/resource";
export const EDIT_RESOURCE = "PUT /api/resource/{id}";
export const DELETE_RESOURCE = "DELETE /api/resource/{id}";

// 主页
export const GET_PANEL_LIST = "GET /api/panel/list";
export const ADD_PANEL = "POST /api/resource";
export const EDIT_PANEL = "PUT /api/resource/{id}";
export const DELETE_PANEL = "DELETE /api/resource/{id}";
