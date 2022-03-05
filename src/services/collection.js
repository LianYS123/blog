// 收藏夹
export const COLLECTION_LIST = "GET /open/client/collection/user/{userId}"; // 用户公开的收藏夹列表
export const GET_COLLECTION_DETAIL = "GET /client/collection/detail"; // 收藏夹详情
export const ADD_COLLECTION = "POST /client/collection/add"; // 添加收藏夹
export const EDIT_COLLECTION = "POST /client/collection/edit"; // 编辑收藏夹
export const DELETE_COLLECTION =
  "POST /client/collection/delete/{collectionId}"; // 删除收藏夹

// 收藏夹文章
export const PAGE_COLLECTION_ARTICLES =
  "/client/collection/pageArticles/{collectionId}"; // 分页查询收藏夹下的文章
export const COLLECTION_ARTICLE_LIST = "/client/collection/article/{articleId}"; // 当前用户的收藏列表，带有是否收藏当前文章的信息
export const ADD_ARTICLE_TO_COLLECTION =
  "/client/collection/addArticle/{articleId}/{collectionId}"; // 添加文章到收藏夹
export const REMOVE_FROM_COLLECTION =
  "/client/collection/removeArticle/{articleId}/{collectionId}"; // 从收藏夹移除文章
