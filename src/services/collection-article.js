// 收藏夹文章
export const PAGE_COLLECTION_ARTICLES =
  "/open/client/collection/pageArticles/{collectionId}"; // 分页查询收藏夹下的文章

export const COLLECTION_ARTICLE_LIST = "/client/collection/article/{articleId}"; // 当前用户的收藏列表，带有是否收藏当前文章的信息

export const ADD_ARTICLE_TO_COLLECTION =
  "POST /client/collection/addArticle/{articleId}/{collectionId}"; // 添加文章到收藏夹

export const REMOVE_ARTICLE_FROM_COLLECTION =
  "POST /client/collection/removeArticle/{articleId}/{collectionId}"; // 从收藏夹移除文章
