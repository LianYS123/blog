// 收藏夹资源
export const PAGE_COLLECTION_RESOURCES =
  "/client/collection/pageResources/{collectionId}"; // 分页查询收藏夹下的资源

export const COLLECTION_RESOURCE_LIST =
  "/client/collection/resource/{resourceId}"; // 当前用户的收藏列表，带有是否收藏当前资源的信息

export const ADD_RESOURCE_TO_COLLECTION =
  "POST /client/collection/addResource/{resourceId}/{collectionId}"; // 添加资源到收藏夹

export const REMOVE_RESOURCE_FROM_COLLECTION =
  "POST /client/collection/removeResource/{resourceId}/{collectionId}"; // 从收藏夹移除资源
