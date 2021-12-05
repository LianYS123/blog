import React from "react";
import { useFetchList } from "hooks";
import { Article } from "./Article";
import { ARTICLE_LIST } from "services/article";
import { SkeletonList } from "components/skeleton";

const ArticleList = () => {
  const {
    list = [],
    loadingFirstPage,
    loadingMore
  } = useFetchList({
    service: ARTICLE_LIST
  });
  return (
    <div className="pb-8 md:pb-16 container">
      <div className="space-y-3 mb-4">
        <SkeletonList loading={loadingFirstPage} />
        {list.map(it => (
          <Article key={it.id} {...it} />
        ))}
        <SkeletonList loading={loadingMore} />
      </div>
    </div>
  );
};
export default ArticleList;
